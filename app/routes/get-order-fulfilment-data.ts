import { PRODUCT_SKU } from '~/routes/settings.widget-setup/modules/package-protection-listener.server';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { gcloudStorage } from '~/modules/gcloud-storage.server';
import { getShopifyGQLClient } from '~/modules/shopify.server';
import { queryProxy } from '~/modules/query/query-proxy';
import { getConfig } from '~/modules/get-config.server';
import { sendMail } from '~/modules/send-mail.server';
import { prisma } from '~/modules/prisma.server';
import { json } from '@remix-run/node';

import type {
  PackageProtectionClaimOrder,
  ClaimRequested,
  ClaimIssue,
} from '#prisma-client';

export const loader: LoaderFunction = async ({ request }) => {
  try {
    let url = new URL(request.url);

    let searchParams = url.searchParams;
    const params = Object.fromEntries(searchParams.entries());
    const session = await findOfflineSession(params.url);
    if (!session) {
      throw new Error(`Session not found!`);
    }
    const orderId = `#${params.orderId}`;
    const getPackageProtectionOrder =
      await prisma.packageProtectionOrder.findFirst({
        where: { orderName: orderId, hasPackageProtection: { equals: true } },
        include: { PackageProtectionClaimOrder: true },
      });

    if (!getPackageProtectionOrder) {
      return json({
        error: 'No order found with the email and order Id!',
        status: 404,
      });
    }

    // if (
    //   getPackageProtectionOrder.hasClaimRequest &&
    //   process.env.NODE_ENV === 'production'
    // ) {
    //   return json({
    //     error: 'This order already claimed!',
    //     status: 404,
    //   });
    // }

    if (getPackageProtectionOrder.fulfillmentStatus === 'UNFULFILLED') {
      return json({ error: 'This order is not fulfilled yet!', status: 404 });
    }
    const gql = await getShopifyGQLClient(session);

    // getPackageProtectionOrder.orderId;
    const res = await gql.query<any>({
      data: {
        query: `#graphql
        query{
          order(id:"${getPackageProtectionOrder.orderId}") {

            email
            displayFulfillmentStatus
            customer {
              firstName
              lastName
            }
            totalPriceSet {
              shopMoney {
                amount
              }
            }
            createdAt
            name
            id
            fulfillments(first: 250) {
              id
              name
              status

              # currency
            }
            lineItems(first: 250) {
              nodes {
                id
                title
                quantity
                variant{
                  createdAt
                  updatedAt
                  id

                }
                product{
                  id
                }
                originalUnitPriceSet{
                  shopMoney{
                    amount
                  }

                }
                discountAllocations {
                  allocatedAmountSet {
                    shopMoney {
                      amount
                    }
                  }

                }
                originalUnitPriceSet {
                  shopMoney {
                    amount
                  }
                }

              }
            }
          }
        }

        `,
        // variables: { orderId: orderId },
      },
      tries: 20,
    });

    if (params.email !== res.body.data.order.email) {
      return json({
        error: 'Email does not match with the order!',
        status: 404,
      });
    }

    // ----------------------------------------------------------------

    const response = await gql.query<any>({
      data: {
        query: `#graphql
        query{
          order(id:"${getPackageProtectionOrder.orderId}") {
            name
            email
            displayFulfillmentStatus
            customer {
              firstName
              lastName
            }
            totalPriceSet {
              shopMoney {
                amount
              }
            }
            createdAt
            id
            fulfillments(first: 250) {
              id
              status
              name
              displayStatus
              createdAt
              fulfillmentLineItems(first: 250) {
                nodes {
                  id
                  quantity
                  lineItem {
                    name
                    variant {
                      id
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
                    originalUnitPriceSet{
                      shopMoney{
                        amount
                        currencyCode

                      }
                    }
                    sku
                    title

                    product {
                      tags
                    }
                  }
                }
              }
            }
          }
        }

        `,
      },
      tries: 20,
    });
    const orderData = await response.body.data.order;

    const getClaimData = await prisma.packageProtectionClaimOrder.findMany({
      where: {
        hasClaimRequest: true,
      },
    });
    const excludesProduct =
      await prisma.excludedPackageProtectionProduct.findMany({
        where: { storeId: session.storeId },
        include: { excludedPackageProtectionVariants: true },
      });
    const excludesVariants = excludesProduct
      .map((product) => {
        return product.excludedPackageProtectionVariants.map(
          (variant) => variant
        );
      })
      .flat();

    console.log(excludesVariants);
    const finalResult = {
      createdAt: orderData.createdAt,
      customerName:
        orderData.customer.firstName ?? '' + orderData.customer.lastName ?? '',
      email: orderData.email,
      displayStatus: orderData.displayFulfillmentStatus,
      name: orderData.name,
      totalPrice: orderData.totalPriceSet.shopMoney.amount,
      id: orderData.id,
      claimStatus:
        getPackageProtectionOrder?.PackageProtectionClaimOrder[0]?.claimStatus,
      fulfillments: orderData.fulfillments
        .filter((f) => f.status === 'SUCCESS')
        .map((f) => {
          return {
            id: f.id,
            name: f.name,
            status: f.status,
            displayStatus: f.displayStatus,
            createdAt: f.createdAt,
            fulfillmentLineItems: f.fulfillmentLineItems.nodes
              .filter((item) => item.lineItem.sku !== PRODUCT_SKU)
              .filter((item) =>
                excludesVariants.some((v) => v.id !== item.lineItem.variant.id)
              )
              .map((item) => {
                return {
                  discountPrice:
                    item.lineItem.discountAllocations[0]?.allocatedAmountSet
                      ?.shopMoney?.amount,
                  currencyCode:
                    item.lineItem.discountAllocations[0]?.allocatedAmountSet
                      ?.shopMoney?.currencyCode,
                  compareAtPrice: item?.lineItem?.variant?.compareAtPrice,
                  image: item.lineItem.image?.url,
                  name: item.lineItem.name,
                  originalPrice:
                    item.lineItem.originalUnitPriceSet.shopMoney.amount,
                  sku: item.lineItem.sku,
                  title: item.lineItem.title,
                  quantity: item.quantity,
                  orderId: orderData.id,
                  hasClaim: !!getClaimData.find(
                    (e) => e.fulfillmentLineItemId === item.id
                  ),
                  claimStatus:
                    getClaimData.find(
                      (e) => e.fulfillmentLineItemId === item.id
                    )?.claimStatus ?? null,
                  // getPackageProtectionOrder?.PackageProtectionClaimOrder[0]
                  //   ?.hasClaimRequest || false,
                  lineItemId: item.id,
                  fulfillmentId: f.id,
                };
              }),
          };
        })
        .filter((item) => item.fulfillmentLineItems.length > 0),
    };
    // ----------------------------------------------------------------

    return json({
      message: 'request successful.',
      data: finalResult,
    });
  } catch (err) {
    console.error('error', err);
    return json({
      message: 'request failed!',
      Error: err,
    });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const validImageTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'application/pdf',
  ];
  let url = new URL(request.url);

  let searchParams = url.searchParams;
  const params = Object.fromEntries(searchParams.entries());
  const session = await findOfflineSession(params.url);
  if (!session) {
    throw new Error(`Session not found!`);
  }
  const formData = await request.formData();
  const comment = formData.get('comment') || '';
  const issue = formData.get('selectedIssue') as ClaimIssue;
  const requested = formData.get('selectedRequest') as ClaimRequested;
  const selectedData = formData.get('selectedData') as string;
  const jsonData = JSON.parse(selectedData);
  const files = formData.getAll('files') as Blob[];

  if (!selectedData) {
    return json({
      success: false,
      message: 'No data selected!',
    });
  }

  const images: string[] = [];

  try {
    await prisma.$transaction(
      async (trx) => {
        await Promise.all(
          files.map(async (file) => {
            if (!validImageTypes.includes(file.type)) {
              throw new Error(`Invalid file type: ${file.type}`);
            }
            if (file.size > 20_000_000 /* 20Mb */) {
              throw new Error(`File too large: ${file.size} bytes`);
            }

            const fileInDB = await trx.file.create({
              data: {
                storeId: session.storeId,
                name: (file as any).name,
                size: file.size,
                mimeType: file.type,
              },
            });

            const bucket = gcloudStorage.bucket(
              process.env.GC_STORAGE_BUCKET_NAME!
            );
            await bucket
              .file(fileInDB.id)
              .save(Buffer.from(await file.arrayBuffer()), {
                contentType: fileInDB.mimeType,
              });

            images.push(fileInDB.id);
          })
        );
      },
      { timeout: 20000 }
    );
  } catch (err) {
    console.error(err);
    return json({
      success: false,
      message:
        'Something went wrong, please try again later or contact support.',
    });
  }

  try {
    const payload: PackageProtectionClaimOrder = jsonData?.map((e) => ({
      storeId: session.storeId,
      orderId: e.orderId,
      fulfillmentLineItemId: e.lineItemId,
      claimStatus: 'REQUESTED',
      comments: comment,
      hasClaimRequest: true,
      images: images.toString(),
      issue: issue,
      requestedResulation: requested,
      fulfillmentId: e.fulfillmentId,
    }));

    const result = await queryProxy.packageProtectionClaimOrder.createMany(
      {
        data: payload,
      },
      { session }
    );

    await queryProxy.packageProtectionOrder.updateMany(
      {
        where: { orderId: jsonData[0].orderId, storeId: session.storeId },
        data: {
          claimDate: new Date(),
          hasClaimRequest: true,
          claimStatus: 'REQUESTED',
        },
      },
      { session }
    );

    if ((result as any).length > 0) {
      const data = await prisma.packageProtectionOrder.findFirst({
        where: { orderId: jsonData[0].orderId },
        include: {
          PackageProtectionClaimOrder: {
            select: { comments: true, issue: true, requestedResulation: true },
          },
          Store: { select: { name: true, domain: true, email: true } },
        },
      });
      const packageProtection = await prisma.packageProtection.findFirst({
        where: { storeId: session.storeId },
      });

      if (data) {
        const orderId = data.orderId.replace('gid://shopify/Order/', '');
        const logo = packageProtection?.emailTemplateLogo
          ? `${getConfig()
              .appUrl.toString()
              .replace('dashboard', '')}api/files/${
              packageProtection?.emailTemplateLogo
            }`
          : null;
        const claimPage = `${getConfig().appUrl}settings/claim-request`;
        await sendMail({
          template: 'CLAIM_REQUEST_EMAIL_FOR_ADMIN',
          storeId: data.storeId,
          to: data.Store.email!,
          internal: true,
          variables: {
            go_to_claim: claimPage,
            claim_date: `${data?.claimDate}`,
            order_id: data?.orderName,
            issue: data.PackageProtectionClaimOrder[0].issue!,
            request_regulation:
              data.PackageProtectionClaimOrder[0].requestedResulation!,
            claim_reason: data.PackageProtectionClaimOrder[0].comments!,
            customer_name: `${data?.customerFirstName ?? ''}  ${
              data?.customerLastName
            }`,
            shop_name: data?.Store.name,
            order_url: `https://admin.shopify.com/store/${
              data.Store.domain.split('.')[0]
            }/orders/${orderId}`,
          },
        });

        await sendMail({
          template: 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER',
          storeId: session.storeId!,
          to: data.customerEmail!,
          variables: {
            claim_date: `${data?.claimDate}`,
            claim_reason: data.PackageProtectionClaimOrder[0].comments!,
            order_id: data?.orderName,
            customer_name: `${data?.customerFirstName ?? ''}  ${
              data?.customerLastName
            }`,
            shop_name: data?.Store.name,
            shop_logo: logo,
          },
        });
      }
    }

    return json({
      success: true,
      message: 'claim request successful!',
      data: result,
    });
  } catch (err) {
    console.error(err);
    return json({
      success: false,
      err,
      message:
        'Something went wrong, please try again later or contact support.',
    });
  }
};
