import { emitter } from '~/modules/emitter.server';
import { queryProxy } from '~/modules/query/query-proxy';
import { getShopifyGQLClient } from '~/modules/shopify.server';
import { GraphqlClient } from '~/shopify-api/lib/clients/graphql/graphql_client';
import { WebhookListenerArgs } from '~/types/webhook-listener-args';

const makePackageProtectionFulfill = async (
  data: Record<string, any>[],
  gqlClient: GraphqlClient
) => {
  const result: { orderId: string; id: string; productTitle: string }[] = [];
  const orders = await data;

  orders.forEach((order) => {
    const orderId = order.id;
    order.lineItems.nodes.forEach((item) => {
      const id = item.id;
      const productTitle = item.productTitle;
      if (productTitle === 'Package Protection') {
        result.push({
          orderId: orderId,
          id: id,
          productTitle: productTitle,
        });
      }
    });
  });

  if (result.length) {
    const fulfillment = await gqlClient.query({
      data: `#graphql
      mutation {
        fulfillmentCreateV2(fulfillment: {
          lineItemsByFulfillmentOrder:{
            fulfillmentOrderId:"${result[0].orderId}",
            fulfillmentOrderLineItems:{id:"${result[0].id}",quantity:1}
          }

        }) {
          fulfillment {
            id
            status
          }
          userErrors {
            field
            message
          }
        }

      }`,
    });
  }

  return result;
};

// async function handleWebhook({
//   ctx: { shop, payload: _payload, session },
// }: WebhookListenerArgs) {
//   if (!_payload) {
//     return;
//   }

//   console.log(session);
//   const gqlClient = getShopifyGQLClient(session!);
//   const payload = _payload as Record<string, any>;

//   const existPackageProtection = payload.line_items.find(
//     (line) =>
//       line.title === 'Package Protection' || line.vendor === 'OverallInsurance'
//   );
//   if (existPackageProtection) {
//     const orderId = payload.admin_graphql_api_id;
//     const result = await gqlClient.query({
//       data: `#graphql
//         mutation{
//                 orderUpdate(input:{id: "${orderId}",tags:["Overall-Package-Protection"]}){
//                   order{
//                     id
//                   }userErrors{
//                     message
//                     field
//                   }
//                 }
//               }
//           `,
//     });

//     console.log('resultresult', JSON.stringify(result.body));
//   }

//   console.log('handleWebhook-->', payload);
//   // console.log('existPackageProtection', existPackageProtection);
// }

const orderCreateEvent = async ({
  ctx: { shop, payload: _payload, session },
}: WebhookListenerArgs) => {
  if (!_payload) {
    return;
  }
  const gqlClient = getShopifyGQLClient(session!);
  const payload = _payload as Record<string, any>;

  // TODO: Use product metafield to check if the product is package protection
  console.log('payload.line_items', JSON.stringify(payload.line_items));
  const existPackageProtection = payload.line_items.find(
    (line) =>
      line.title === 'Package Protection' || line.vendor === 'OverallInsurance'
  );

  try {
    if (existPackageProtection) {
      const orderId = payload.admin_graphql_api_id;

      const fulfillmentStatus = await queryProxy.packageProtection.findFirst({
        where: {
          storeId: session?.storeId,
        },
        select: { insuranceFulfillmentStatus: true },
      });

      const updatedOrder = await gqlClient.query<any>({
        data: `#graphql
        mutation{
          orderUpdate(input:{id: "${orderId}",tags:["Overall-Package-Protection","wenexus-shipping-protection"]}){
            order{
              id
              name
              totalPriceSet{
                shopMoney{
                  amount
                }
              }
              lineItems(first:250){
                nodes{
                  title
                  originalTotalSet{
                    shopMoney{
                      amount
                    }
                  }
                }
              }

              fulfillmentOrders(first:250){
                nodes{
                  id
                  lineItems(first:250){
                    nodes{
                      id
                      productTitle

                    }
                  }
                }
              }
            }userErrors{
              message
              field
            }
          }
        }
        `,
      });
      console.log('updatedOrder', JSON.stringify(updatedOrder));
      // create local db row for order

      const protectionFee =
        await updatedOrder.body.data.orderUpdate.order.lineItems.nodes
          .map((e) => {
            if (e.title === 'Package Protection') {
              return e.originalTotalSet.shopMoney.amount;
            } else {
              return 0;
            }
          })
          .join('');

      await queryProxy.packageProtectionOrder.create({
        data: {
          orderId: orderId,
          customerId: payload.customer.id.toString(),
          orderName: updatedOrder.body.data.orderUpdate.order.name,
          storeId: session?.storeId,
          orderAmount: Number(
            updatedOrder.body.data.orderUpdate.order.totalPriceSet.shopMoney
              .amount
          ),
          protectionFee: Number(protectionFee),
        },
      });

      if (
        fulfillmentStatus?.insuranceFulfillmentStatus ===
        'Mark as fulfilled immediately after purchase'
      ) {
        await makePackageProtectionFulfill(
          updatedOrder.body.data.orderUpdate.order.fulfillmentOrders.nodes,
          gqlClient
        );
      }
    }
  } catch (err) {
    console.log('------------ERROR-------------', err);
  }
};

const orderRefundEvent = async ({
  ctx: { shop, payload: _payload, session },
}: WebhookListenerArgs) => {
  if (!_payload) {
    return;
  }
  const gqlClient = getShopifyGQLClient(session!);

  const payload = _payload as Record<string, any>;

  const orderId = 'gid://shopify/Order/' + payload.order_id;
  const result = await gqlClient.query<any>({
    data: `#graphql
    mutation{
      orderUpdate(input:{id: "${orderId}",tags:["Overall-Package-Refund"]}){
        order{
          id
        }userErrors{
          message
          field
        }
      }
    }
    `,
  });
};

const orderFulfilledEvent = async () => {
  console.log('orderFulfilledEvent');
};

const orderPartiallyFulfilledEvent = async ({
  ctx: { shop, payload: _payload, session },
}: WebhookListenerArgs) => {
  if (!_payload) {
    return;
  }
  console.log('hocce kichu');
  const fulfillmentStatus = await queryProxy.packageProtection.findFirst({
    where: {
      storeId: session?.storeId,
    },
    select: { insuranceFulfillmentStatus: true },
  });

  const gqlClient = getShopifyGQLClient(session!);
  const payload = _payload as Record<string, any>;

  const existPackageProtection = payload.line_items.find(
    (line) =>
      line.title === 'Package Protection' || line.vendor === 'OverallInsurance'
  );
  if (existPackageProtection) {
    const orderId = payload.admin_graphql_api_id;

    const getOrder = await gqlClient.query<any>({
      data: `#graphql
      query{
        order(id:"${orderId}"){
          displayFulfillmentStatus
          fulfillmentOrders(first:250){
            nodes{
              id
              status
              lineItems(first:250){
                nodes{
                  id
                  productTitle
                }
              }
            }
          }
          fulfillments(first:250){
            id
            name
            displayStatus
            fulfillmentLineItems(first:250){
              nodes{
                lineItem{
                  title
                  id
                }
              }
            }
          }
        }
      }
      `,
    });

    await queryProxy.packageProtectionOrder.update({
      data: {
        fulfillmentStatus: getOrder.body.data.order.displayFulfillmentStatus,
      },
      where: { orderId: orderId },
    });

    if (
      fulfillmentStatus?.insuranceFulfillmentStatus ===
      'Mark as fulfilled when other items fulfilled'
    ) {
      const fulfillmentOrder: Record<string, any>[] = [];

      getOrder.body.data.order.fulfillmentOrders.nodes.forEach((order) => {
        const id = order.id;
        order.lineItems.nodes.forEach((item) => {
          fulfillmentOrder.push({
            fulfillmentOrderId: id,
            productId: item.id,
            status: order.status,
            productTitle: item.productTitle,
          });
        });
      });

      const fulfillmentLineItems: Record<string, any>[] = [];

      getOrder.body.data.order.fulfillments.forEach((fulfill) => {
        fulfill.fulfillmentLineItems.nodes.forEach((item) => {
          fulfillmentLineItems.push({
            fulfillmentId: fulfill.id,
            productId: item.lineItem.id,
            productTitle: item.lineItem.title,
          });
        });
      });
      const isExistFulfillmentPackageItem = fulfillmentOrder
        .filter((order) => order.status !== 'CLOSED')
        .filter((e) =>
          fulfillmentLineItems.every((i) => i.productTitle !== e.productTitle)
        )
        .filter((item) => item.productTitle === 'Package Protection');

      console.log(
        'ache reee',
        isExistFulfillmentPackageItem,
        fulfillmentOrder,
        fulfillmentLineItems
      );

      if (isExistFulfillmentPackageItem.length) {
        isExistFulfillmentPackageItem.forEach(async (item) => {
          await gqlClient.query<any>({
            data: `#graphql
            mutation {
              fulfillmentCreateV2(fulfillment: {
                lineItemsByFulfillmentOrder:{
                  fulfillmentOrderId:"${item.fulfillmentOrderId}",
                  fulfillmentOrderLineItems:{id:"${item.productId}",quantity:1}
                }

              }) {
                fulfillment {
                  id
                  status
                }
                userErrors {
                  field
                  message
                }
              }
            }`,
          });
        });
      }
    }

    if (
      fulfillmentStatus?.insuranceFulfillmentStatus ===
      'Mark as fulfilled when first item(s) are fulfilled'
    ) {
      await makePackageProtectionFulfill(
        getOrder.body.data.order.fulfillmentOrders.nodes,
        gqlClient
      );
    }
  }
  // }else if(fulfillmentStatus?.insuranceFulfillmentStatus==='Mark as fulfilled when other items fulfilled'){

  // }
};

const orderUpdatedEvent = async ({
  ctx: { shop, payload: _payload, session },
}: WebhookListenerArgs) => {
  console.log(
    '-------------------------orderUpdated-----------------------------'
  );
  if (!_payload) {
    return;
  }
  const gqlClient = getShopifyGQLClient(session!);
  const payload = _payload as Record<string, any>;

  const existPackageProtection = payload.line_items.find(
    (line) =>
      line.title === 'Package Protection' || line.vendor === 'OverallInsurance'
  );
  if (existPackageProtection) {
    const orderId = payload.admin_graphql_api_id;

    const getOrder = await gqlClient.query<any>({
      data: `#graphql
      query{
        order(id:"${orderId}"){
          displayFulfillmentStatus
          fulfillmentOrders(first:250){
            nodes{
              id
              status
              lineItems(first:250){
                nodes{
                  id
                  productTitle
                }
              }
            }
          }
          fulfillments(first:250){
            id
            name
            displayStatus
            fulfillmentLineItems(first:250){
              nodes{
                lineItem{
                  title
                  id
                }
              }
            }
          }
        }
      }
      `,
    });

    await queryProxy.packageProtectionOrder.update({
      data: {
        fulfillmentStatus: getOrder.body.data.order.displayFulfillmentStatus,
      },
      where: { orderId: orderId },
    });
  }
};

emitter.on('ORDERS_CREATE', orderCreateEvent);
emitter.on('REFUNDS_CREATE', orderRefundEvent);
emitter.on('ORDERS_FULFILLED', orderFulfilledEvent);
emitter.on('ORDERS_PARTIALLY_FULFILLED', orderPartiallyFulfilledEvent);
emitter.on('ORDERS_UPDATED', orderUpdatedEvent);
