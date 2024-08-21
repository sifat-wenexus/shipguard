import { ActionFunctionArgs, json, LoaderFunction } from '@remix-run/node';
import {
  getShopifyGQLClient,
  shopify as shopifyRemix,
} from '../modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { ClaimStatus } from '#prisma-client';
import { IClaimType } from './package-protection/components/claim-request/claim-fulfill-modal';

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
                    location{
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
        locationId: f.location.id,
        fulfillmentLineItems: f.fulfillmentLineItems.nodes.map((node) => {
          return {
            lineItemId: node.id,
            quantity: node.quantity,
            itemId: node.lineItem.id,
            name: node.lineItem.name,
            originalPrice: node.lineItem.originalUnitPriceSet.shopMoney.amount,
            discountPrice:
              node.lineItem.discountAllocations[0].allocatedAmountSet.shopMoney
                .amount,
            image: node.lineItem.image.url,
            title: node.lineItem.title,
            sku: node.lineItem.sku,
            taxable: node.lineItem.taxable,
            taxRate: node.lineItem.taxLines[0].rate,
            taxPercentage: node.lineItem.taxLines[0].ratePercentage,
            taxTitle: node.lineItem.taxLines[0].title,
            locationId: f.location.id,
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
    return json({
      message: 'Error fetching order!',
      success: false,
      data: null,
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
    if (action === 'filterOption') {
      const filterOption = JSON.parse(body.get('state') as string);
      const { searchTerm, filterItems, page, pageSize, startDate, endDate } =
        filterOption;
      const ClaimStatus: ClaimStatus[] = [
        'REQUESTED',
        'INPROGRESS',
        'CANCEL',
        'APPROVE',
        'PARTIALLYAPPROVE',
      ];

      const filterOp = filterItems.map((item) => item.value.toUpperCase());
      const filterFields = filterOp.map((field) => {
        if (ClaimStatus.includes(field)) {
          return { claimStatus: { equals: field } };
        }
      });
      const orderList = await prisma.packageProtectionOrder.findMany({
        where: {
          AND: [
            // {
            //   OR: filterFields || [],
            // },
            {
              OR: [{ orderName: { contains: searchTerm } }],
            },
            {
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
            { storeId: { equals: ctx.session.storeId } },
            { hasClaimRequest: { equals: true } },
          ],
        },
        include: {
          PackageProtectionClaimOrder: {
            where: {
              OR: filterFields.length
                ? filterFields
                : [{ claimStatus: { not: 'PARTIALLYAPPROVE' } }],
            },
          },
        },
        orderBy: { createdAt: 'desc' },

        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      const totalOrder = await prisma.packageProtectionOrder.count({
        where: {
          hasClaimRequest: { equals: true },
          AND: [
            // {
            //   OR: filterFields || [],
            // },
            {
              OR: [{ orderName: { contains: searchTerm } }],
            },
            {
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
            { storeId: { equals: ctx.session.storeId } },
          ],
        },
      });

      // -------------------------------------------------------------------------------------
      const filterData = await orderList.filter(
        (order) => order.PackageProtectionClaimOrder.length > 0 && order
      );
      return json({
        message: 'Order fetched Successfully!',
        status: true,
        data: {
          orderList: filterData,
          totalOrder: filterData.length > 0 ? totalOrder : 0,
        },
      });
    } else if (action === 'changeClaimStatus') {
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
          const orderId = data?.orderId;
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
                  currency: 'USD',
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
          });

          console.log('response--:  ', JSON.stringify(response.body.data));
          // if (response.body.data.refundCreate.userErrors?.length > 0) {
          //   throw Error('can not refund this item');
          // }

          // end transaction
        });

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
                  currency: 'USD',
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
          });

          console.log('response--:  ', JSON.stringify(response.body.data));
          if (response.body.data.userErrors.length > 0) {
            throw Error('can not refund this item');
          }
        });
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
    return json({
      message: 'Error fetching order!',
      success: false,
      data: null,
    });
  }
};
