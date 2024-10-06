import { findOfflineSession } from '~/modules/find-offline-session.server';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import type {
  ClaimIssue,
  ClaimRequested,
  PackageProtectionClaimOrder,
} from '#prisma-client';
import { gcloudStorage } from '~/modules/gcloud-storage.server';
import { getShopifyGQLClient } from '~/modules/shopify.server';
import { queryProxy } from '~/modules/query/query-proxy';
import { prisma } from '~/modules/prisma.server';
import { json } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
  console.log('first');
  try {
    let url = new URL(request.url);

    let searchParams = url.searchParams;
    const params = Object.fromEntries(searchParams.entries());
    const session = await findOfflineSession(params.url);
    const orderId = `#${params.orderId}`;
    const getPackageProtectionOrder =
      await prisma.packageProtectionOrder.findFirst({
        where: { orderName: orderId },
        include: { PackageProtectionClaimOrder: true },
      });

    if (!getPackageProtectionOrder) {
      return json({
        error: 'No order found with the email and orderId!',
        status: 404,
      });
    }

    if (
      getPackageProtectionOrder.hasClaimRequest &&
      process.env.NODE_ENV === 'production'
    ) {
      return json({
        error: 'This order already claimed!',
        status: 404,
      });
    }

    if (getPackageProtectionOrder.fulfillmentStatus !== 'FULFILLED') {
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
    });
    const orderData = await response.body.data.order;

    const getClaimData = await prisma.packageProtectionClaimOrder.findMany({
      where: {
        hasClaimRequest: true,
      },
    });

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
              .filter(
                (item) =>
                  !(
                    item.lineItem.sku === 'overall-package-protection' ||
                    item.lineItem.sku === 'wenexus-shipping-protection' ||
                    item.lineItem.product.tags.includes('overall-insurance')
                  )
              )
              .map((item) => {
                return {
                  discountPrice:
                    item.lineItem.discountAllocations[0]?.allocatedAmountSet
                      ?.shopMoney?.amount,
                  currencyCode:
                    item.lineItem.discountAllocations[0]?.allocatedAmountSet
                      ?.shopMoney?.currencyCode,
                  image: item.lineItem.image?.url,
                  name: item.lineItem.name,
                  originalPrice:
                    item.lineItem.originalUnitPriceSet.shopMoney.amount,
                  sku: item.lineItem.sku,
                  title: item.lineItem.title,
                  quantity: item.quantity,
                  orderId: orderData.id,
                  hasClaim: getClaimData.find(
                    (e) => e.fulfillmentLineItemId === item.id
                  )
                    ? true
                    : false,
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
    await prisma.$transaction(async (trx) => {
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
    });
  } catch (err) {
    return json({
      success: false,
      message:
        'Something went wrong, please try again later or contact support.',
    });
  }

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
  await queryProxy.packageProtectionOrder.update(
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

  return json({
    success: true,
    message: 'claim request successful!',
    data: result,
  });
};
