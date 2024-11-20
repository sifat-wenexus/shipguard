import type { ActionFunctionArgs, LoaderFunction } from '@remix-run/node';
import type { IClaimType } from './claim-request/claim-fulfill-modal';
import { getConfig } from '~/modules/get-config.server';
import { sendMail } from '~/modules/send-mail.server';
import type { ClaimStatus } from '#prisma-client';
import { prisma } from '~/modules/prisma.server';

import { json } from '@remix-run/node';
import {
  getShopifyGQLClient,
  shopify as shopifyRemix,
} from '../modules/shopify.server';

export const loader: LoaderFunction = async ({ request }) => {
  try {
    let url = new URL(request.url);

    let searchParams = url.searchParams;
    const params = Object.fromEntries(searchParams.entries());
    const orderId = `${params.orderId}`;
    const ctx = await shopifyRemix.authenticate.admin(request);
    const gql = await getShopifyGQLClient(ctx.session);
    const getPackageProtectionData = await prisma.packageProtection.findFirst({
      where: { storeId: ctx.session.storeId },
    });

    const packageProtectionOrder =
      await prisma.packageProtectionOrder.findFirst({
        where: { orderId: orderId },
        include: { PackageProtectionClaimOrder: true },
      });

    const res = await gql.query<any>({
      data: {
        query: `#graphql
        query{
          order(id:"${packageProtectionOrder?.orderId}") {
            email
            createdAt
            name
            id
          }
        }

        `,
        // variables: { orderId: orderId },
      },
      tries: 20,
    });

    const fulfillmentIds =
      (await packageProtectionOrder?.PackageProtectionClaimOrder.map(
        (order) => ({
          id: order.fulfillmentId,
          comments: order.comments,
          images: order.images,
          claimStatus: order.claimStatus,
          fulfillClaim: order.fulfillClaim,
          claimStatusMessage: order.claimStatusMessage,
        })
      )) || [];

    const fulfillmentData: any[] = await Promise.all(
      [...new Map(fulfillmentIds.map((item) => [item.id, item])).values()].map(
        async ({
          id,
          images,
          comments,
          claimStatus,
          fulfillClaim,
          claimStatusMessage,
        }) => {
          const body = await gql.query<any>({
            data: {
              query: `#graphql
              query Fulfillment($id: ID!) {
                fulfillment(id: $id) {
                  id
                  name
                  location {
                    id
                  }
                  fulfillmentLineItems(first: 250) {
                    nodes {
                      id
                      quantity
                      lineItem {
                        id
                        name
                        taxable
                        taxLines{
                          rate
                          ratePercentage
                          title
                        }
                        variant{
                          compareAtPrice
                        }
                        discountAllocations {
                          allocatedAmountSet {
                            shopMoney {
                              amount
                              currencyCode
                            }
                          }
                        }
                        image {
                          url
                        }
                        originalUnitPriceSet {
                          shopMoney {
                            amount
                            currencyCode
                          }
                        }
                        sku
                        title
                      }
                    }
                  }
                }
              }
              `,
              variables: { id },
            },
            tries: 20,
          });

          return {
            ...body.body.data.fulfillment,

            images,
            comments,
            claimStatus,
            fulfillClaim,
            claimStatusMessage,
          };
        }
      )
    );

    const convertedData = fulfillmentData.map((f) => {
      const imageUrls = f.images.split(',').map((id) => {
        return `https://${url.hostname}/api/files/${id}`;
      });

      return {
        name: f.name,
        id: f.id,
        hasClaim:
          packageProtectionOrder?.PackageProtectionClaimOrder[0]
            .hasClaimRequest,
        claimStatus: f.claimStatus,
        comments: f.comments,
        claimStatusMessage: f.claimStatusMessage,
        imageUrls,
        fulfillClaim: f.fulfillClaim,
        locationId: f.location?.id,
        fulfillmentLineItems: f.fulfillmentLineItems.nodes
          .filter((node) =>
            packageProtectionOrder?.PackageProtectionClaimOrder?.some(
              (item) => item.fulfillmentLineItemId === node.id
            )
          )
          .map((node) => {
            return {
              lineItemId: node?.id,
              quantity: node?.quantity,
              itemId: node?.lineItem?.id,
              name: node?.lineItem?.name,
              compareAtPrice: node?.lineItem?.variant?.compareAtPrice,
              originalPrice:
                node?.lineItem?.originalUnitPriceSet?.shopMoney?.amount,
              discountPrice:
                node.lineItem.discountAllocations[0]?.allocatedAmountSet
                  .shopMoney.amount || 0,
              image: node?.lineItem?.image?.url,
              title: node?.lineItem?.title,
              sku: node?.lineItem?.sku,
              taxable: node?.lineItem?.taxable,
              taxRate: node?.lineItem?.taxLines[0]?.rate,
              taxPercentage: node?.lineItem?.taxLines[0]?.ratePercentage,
              taxTitle: node?.lineItem?.taxLines[0]?.title,
              locationId: f?.location?.id,
            };
          }),
      };
    });

    return json({
      message: 'Package Protection data fetched successfully!',
      success: true,
      data: {
        packageProtection: getPackageProtectionData,
        packageProtectionOrder: {
          ...packageProtectionOrder,
          email: res.body.data.order.email,
        },
        convertedData,
      },
    });
  } catch (err) {
    console.error(err);
    return json({
      message: 'Error fetching order!',
      success: false,
      data: null,
      error: err,
    });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const ctx = await shopifyRemix.authenticate.admin(request);
  const gql = await getShopifyGQLClient(ctx.session);

  const body = await request.formData();
  const action = body.get('action') as IClaimType &
    'filterOption' &
    'changeClaimStatus';
  const bodyData = JSON.parse(body.get('state') as string);
  try {
    if (action === 'changeClaimStatus') {
      const {
        cancelText,
        approveText,
        selectedStatus,
        fulfillmentId,
      }: {
        cancelText: string;
        approveText: string;
        selectedStatus: string;
        fulfillmentId: string;
      } = bodyData;

      const message =
        selectedStatus[0] === 'APPROVE' ? approveText : cancelText || '';

      const res = await prisma.packageProtectionClaimOrder.updateMany({
        data: {
          claimStatus: selectedStatus.toString() as ClaimStatus,
          claimStatusMessage: message,
        },
        where: { fulfillmentId: fulfillmentId },
      });
      const orderId = await prisma.packageProtectionClaimOrder.findFirst({
        where: { fulfillmentId: fulfillmentId },
        select: { orderId: true },
      });

      await prisma.packageProtectionOrder.update({
        where: { orderId: orderId?.orderId },
        data: { claimStatus: selectedStatus.toString() as ClaimStatus },
      });
      const data = await prisma.packageProtectionOrder.findFirst({
        where: { orderId: orderId?.orderId },
        include: {
          PackageProtectionClaimOrder: { select: { comments: true } },
          Store: { select: { name: true, domain: true, email: true } },
        },
      });
      const packageProtection = await prisma.packageProtection.findFirst({
        where: { storeId: ctx.session.storeId },
      });
      if (data && selectedStatus[0] === 'CANCEL') {
        const customerName = `${data.customerFirstName ?? ''}  ${
          data.customerLastName
        }`;
        const logo = packageProtection?.emailTemplateLogo
          ? `${getConfig()
              .appUrl.toString()
              .replace('dashboard', '')}api/files/${
              packageProtection?.emailTemplateLogo
            }`
          : null;
        await sendMail({
          template: 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER',
          storeId: ctx.session.storeId!,
          to: data.customerEmail!,
          variables: {
            cancellation_reason: cancelText,
            customer_name: customerName,
            order_id: data.orderName!,
            shop_name: data.Store.name,
            shop_logo: logo,
            status: data.claimStatus!,
          },
        });
      }

      return json({
        message: 'claim status updated successfully',
        cancelText,
        approveText,
        selectedStatus: selectedStatus.toString(),
        fulfillmentId,
        res,
      });
    } else if (action === 'REORDER') {
      const { reorderItems } = bodyData;
      try {
        let orderID: string | null = null;
        await prisma.$transaction(async (trx) => {
          const data = await trx.packageProtectionClaimOrder.findFirst({
            where: {
              fulfillmentLineItemId: reorderItems[0].lineItemId,
            },
            select: { orderId: true },
          });
          if (!data) {
            return json({
              message: 'No claim order found for reorder.',
              success: false,
              data: null,
            });
          }
          const orderId = data.orderId;
          orderID = data.orderId;
          const res = await gql.query<any>({
            data: {
              query: `#graphql
              query{
                order(id:"${orderId}") {
                  id
                  name
                  lineItems(first: 200) {
                    nodes {
                      id
                      variant {
                        id
                        price
                        title
                        sku
                      }
                      quantity
                    }

                  }
                  customer{
                    id
                    email
                  }
                  shippingAddress {
                    firstName
                    lastName
                    address1
                    city
                    province
                    country
                    zip
                  }
                }
              }

              `,
            },
            tries: 20,
          });
          const existingOrder = await res.body.data.order;
          const itemToReorder = reorderItems.map((item) => item.itemId);
          const lineItems = existingOrder.lineItems.nodes.filter((item) =>
            itemToReorder.includes(item.id)
          );

          const lineItemIds = reorderItems.map(
            (lineItem) => lineItem.lineItemId
          );

          // return null;
          await trx.packageProtectionClaimOrder.updateMany({
            where: { fulfillmentLineItemId: { in: lineItemIds } },
            data: { fulfillClaim: true },
          });

          const shippingAddress = {
            first_name: existingOrder.shippingAddress.firstName,
            last_name: existingOrder.shippingAddress.lastName,
            address1: existingOrder.shippingAddress.address1,
            city: existingOrder.shippingAddress.city,
            province: existingOrder.shippingAddress.province,
            country: existingOrder.shippingAddress.country,
            zip: existingOrder.shippingAddress.zip,
          };

          const order = new ctx.admin.rest.resources.Order({
            session: ctx.session,
          });
          order.email = existingOrder.customer.email;
          order.line_items = lineItems.map((item) => ({
            quantity: item.quantity,
            variant_id: +item.variant.id.replace(
              'gid://shopify/ProductVariant/',
              ''
            ),
            //  price: item.variant.price,
          }));
          order.shipping_address = shippingAddress;
          order.name = existingOrder.name + '-R';
          order.note = 'reorder';
          const newOrder = await order.save({
            update: true,
          });
          console.log('newOrder', newOrder, 'order', order);
        });
        if (orderID) {
          const data = await prisma.packageProtectionOrder.findFirst({
            where: { orderId: orderID },
            include: {
              PackageProtectionClaimOrder: {
                select: { comments: true, claimStatusMessage: true },
              },
              Store: { select: { name: true, domain: true, email: true } },
            },
          });
          const packageProtection = await prisma.packageProtection.findFirst({
            where: { storeId: ctx.session.storeId },
          });
          if (data) {
            const logo = packageProtection?.emailTemplateLogo
              ? `${getConfig()
                  .appUrl.toString()
                  .replace('dashboard', '')}api/files/${
                  packageProtection?.emailTemplateLogo
                }`
              : null;
            await sendMail({
              template: 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER',
              storeId: ctx.session.storeId!,
              to: data.customerEmail!,
              variables: {
                order_id: data?.orderName,
                replacement_order_id: `${data?.orderName}-R`,
                shop_name: data.Store.name,
                status: data.claimStatus!,
                status_message:
                  data.PackageProtectionClaimOrder[0].claimStatusMessage!,
                shop_logo: logo,
              },
            });
          }
        }
        return json({
          message: 'Reorder successfully',
          success: true,
        });
      } catch (err) {
        console.log(err);
        return json({
          message: 'something went wrong',
          success: false,
          err: JSON.stringify(err),
        });
      }
    } else if (action === 'REFOUND_BY_AMOUNT') {
      try {
        let orderID: string | null = null;
        await prisma.$transaction(async (trx) => {
          const data = await trx.packageProtectionClaimOrder.findFirst({
            where: {
              fulfillmentLineItemId:
                bodyData.fulfillmentLineItems[0].lineItemId,
            },
            select: { orderId: true },
          });
          if (!data) {
            return json({
              message: 'No claim order found for refund.',
              success: false,
              data: null,
            });
          }
          orderID = data.orderId;
          await trx.packageProtectionOrder.update({
            where: { orderId: data.orderId },
            data: {
              refundAmount: { increment: Number(bodyData.refundAmount) },
            },
          });
          const lineItemIds = bodyData.fulfillmentLineItems.map(
            (lineItem) => lineItem.lineItemId
          );
          await trx.packageProtectionClaimOrder.updateMany({
            where: { fulfillmentLineItemId: { in: lineItemIds } },
            data: { fulfillClaim: true },
          });

          // refund shopify api
          const orderTransaction = await gql.query<any>({
            data: {
              query: `#graphql
              query($orderId: ID!) {
                order(id: $orderId) {
                  transactions{
                    id
                  }
                }
              }
              `,
              variables: { orderId: data.orderId },
            },
            tries: 20,
          });

          const parentId = await orderTransaction.body.data.order
            .transactions[0].id;

          const refundLineItem: any[] = bodyData.fulfillmentLineItems.map(
            (e) => ({
              restockType: 'RETURN',
              lineItemId: e.itemId,
              quantity: e.refundQuantity,
              locationId: e.locationId,
            })
          );

          await gql.query<any>({
            data: {
              query: `#graphql
              mutation M($input: RefundInput!) {
                refundCreate(input: $input) {
                  order {
                    id
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
              `,
              variables: {
                input: {
                  orderId: data.orderId,
                  note: '',
                  notify: true,
                  refundLineItems: refundLineItem,
                  transactions: [
                    {
                      orderId: data.orderId,
                      gateway: 'bogus',
                      amount: Number(bodyData.refundAmount),
                      kind: 'REFUND',
                      parentId: parentId,
                    },
                  ],
                },
              },
            },
            tries: 20,
          });
        });
        if (orderID) {
          const data = await prisma.packageProtectionOrder.findFirst({
            where: { orderId: orderID },
            include: {
              PackageProtectionClaimOrder: {
                select: { comments: true, claimStatusMessage: true },
              },
              Store: {
                select: {
                  name: true,
                  domain: true,
                  email: true,
                  currencyCode: true,
                },
              },
            },
          });
          const packageProtection = await prisma.packageProtection.findFirst({
            where: { storeId: ctx.session.storeId },
          });
          if (data) {
            const logo = packageProtection?.emailTemplateLogo
              ? `${getConfig()
                  .appUrl.toString()
                  .replace('dashboard', '')}api/files/${
                  packageProtection?.emailTemplateLogo
                }`
              : null;
            await sendMail({
              template: 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER',
              storeId: ctx.session.storeId!,
              to: data.customerEmail!,
              variables: {
                date: data.updatedAt.toString(),
                order_id: data?.orderName,
                refund_amount: data.refundAmount.toString(),
                shop_name: data.Store.name,
                currency: data.Store.currencyCode,
                shop_logo: logo,
                status: data.claimStatus!,
                status_message:
                  data.PackageProtectionClaimOrder[0].claimStatusMessage!,
              },
            });
          }
        }

        return json({
          message: 'Refund request sent successfully',
          success: true,
          data: bodyData,
        });
      } catch (err) {
        console.log(err);
        return json({
          message: 'Error sending refund request',
          success: false,
          data: null,
        });
      }
    } else if (action === 'REFOUND_BY_AMOUNT_LINE_ITEM') {
      try {
        let orderID: string | null = null;
        await prisma.$transaction(async (trx) => {
          const data = await trx.packageProtectionClaimOrder.findFirst({
            where: {
              fulfillmentLineItemId: bodyData.refundItems[0].lineItemId,
            },
            select: { orderId: true },
          });
          if (!data) {
            return json({
              message: 'No claim order found for refund.',
              success: false,
              data: null,
            });
          }
          orderID = data.orderId;
          // const re=await trx.packageProtectionOrder
          await trx.packageProtectionOrder.update({
            where: { orderId: data.orderId },
            data: {
              refundAmount: { increment: Number(bodyData.refundAmount) },
            },
          });

          const lineItemIds = bodyData.refundItems.map(
            (lineItem) => lineItem.lineItemId
          );
          await trx.packageProtectionClaimOrder.updateMany({
            where: { fulfillmentLineItemId: { in: lineItemIds } },
            data: { fulfillClaim: true },
          });
          // refund shopify api
          const orderTransaction = await gql.query<any>({
            data: {
              query: `#graphql
              query($orderId: ID!) {
                order(id: $orderId) {
                  transactions{
                    id
                  }
                }
              }
              `,
              variables: { orderId: data.orderId },
            },
            tries: 20,
          });

          const parentId = await orderTransaction.body.data.order
            .transactions[0].id;

          // console.log('orderTransaction', orderTransaction.body.data.order.transactions[0].id);

          const refundLineItem: any[] = bodyData.refundItems.map((e) => ({
            restockType: 'RETURN',
            lineItemId: e.itemId,
            quantity: e.refundQuantity,
            locationId: e.locationId,
          }));

          const response = await gql.query<any>({
            data: {
              query: `#graphql
              mutation M($input: RefundInput!) {
                refundCreate(input: $input) {
                  order {
                    id
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
              `,
              variables: {
                input: {
                  orderId: data.orderId,
                  note: '',
                  notify: true,
                  refundLineItems: refundLineItem,
                  transactions: [
                    {
                      orderId: data.orderId,
                      gateway: 'bogus',
                      amount: Number(bodyData.refundAmount),
                      kind: 'REFUND',
                      parentId: parentId,
                    },
                  ],
                },
              },
            },
            tries: 20,
          });

          console.log('response--:  ', JSON.stringify(response.body.data));
          if (response.body.data.refundCreate.userErrors.length > 0) {
            throw Error('can not refund this item');
          }
        });
        if (orderID) {
          const data = await prisma.packageProtectionOrder.findFirst({
            where: { orderId: orderID },
            include: {
              PackageProtectionClaimOrder: {
                select: { comments: true, claimStatusMessage: true },
              },
              Store: {
                select: {
                  name: true,
                  domain: true,
                  email: true,
                  currencyCode: true,
                },
              },
            },
          });
          const packageProtection = await prisma.packageProtection.findFirst({
            where: { storeId: ctx.session.storeId },
          });
          if (data) {
            const logo = packageProtection?.emailTemplateLogo
              ? `${getConfig()
                  .appUrl.toString()
                  .replace('dashboard', '')}api/files/${
                  packageProtection?.emailTemplateLogo
                }`
              : null;
            await sendMail({
              template: 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER',
              storeId: ctx.session.storeId!,
              to: data.customerEmail!,
              variables: {
                date: data.updatedAt.toString(),
                order_id: data?.orderName,
                refund_amount: data.refundAmount.toString(),
                shop_name: data.Store.name,
                currency: data.Store.currencyCode,
                shop_logo: logo,
                status: data.claimStatus!,
                status_message:
                  data.PackageProtectionClaimOrder[0].claimStatusMessage!,
              },
            });
          }
        }

        return json({
          message: 'Refund request sent successfully',
          success: true,
          data: bodyData,
        });
      } catch (err) {
        console.log('error:', JSON.stringify(err));
        return json({
          message: 'Something went wrong when refund by line items.',
          success: false,
          data: JSON.stringify(err),
        });
      }
    }
  } catch (err) {
    console.error(err);
    return json({
      message: 'Error fetching order!',
      success: false,
      data: null,
    });
  }
};
