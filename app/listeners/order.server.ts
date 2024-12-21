import { PRODUCT_SKU } from '~/routes/settings.widget-setup/modules/package-protection-listener.server';
import type { GraphqlClient } from '~/shopify-api/lib/clients/graphql/graphql_client';
import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { getShopifyGQLClient } from '~/modules/shopify.server';
import type { PackageProtectionOrder } from '#prisma-client';
import { Prisma } from '#prisma-client';
import { queryProxy } from '~/modules/query/query-proxy';
import { emitter } from '~/modules/emitter.server';
import type { Session } from '~/shopify-api/lib';
import Decimal = Prisma.Decimal;

const makePackageProtectionFulfill = async (
  data: Record<string, any>[],
  gqlClient: GraphqlClient
) => {
  const result: { orderId: string; id: string; productTitle: string }[] = [];
  data.forEach((order) => {
    const orderId = order.id;
    order.lineItems.nodes.forEach((item) => {
      const id = item.id;
      const productTitle = item.productTitle;
      const sku = item.sku;
      if (sku === PRODUCT_SKU) {
        result.push({
          orderId: orderId,
          id: id,
          productTitle: productTitle,
        });
      }
    });
  });

  if (result.length) {
    await gqlClient.query({
      data: `#graphql
      mutation {
        fulfillmentCreate(fulfillment: {
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
      tries: 20,
    });
  }

  return result;
};

async function fetchOrderStatus(id: string, session: Session) {
  const gqlClient = getShopifyGQLClient(session);

  const order = await gqlClient.query<any>({
    data: `#graphql
    query {
      order(id: "${id}") {
        id
        displayFulfillmentStatus
      }
    }
    `,
    tries: 20,
  });

  return order.body.data.order.displayFulfillmentStatus;
}

async function fetchOrders(orderId: string, session: Session) {
  const gqlClient = getShopifyGQLClient(session);
  const getOrder = await gqlClient.query<any>({
    data: `#graphql
    query{
      order(id:"${orderId}"){
        displayFulfillmentStatus

        channelInformation {
          channelDefinition {
            channelName
          }
        }
        totalPriceSet{
          shopMoney{
            amount
          }
        }
        fulfillmentOrders(first:250){
          nodes{
            id
            status
            lineItems(first:250){
              nodes{
                id
                productTitle
                sku
              }
            }
          }
        }
        lineItems(first:250){
          nodes{
            sku
            title
            product {
              id
            }
            originalTotalSet{
              shopMoney{
                amount
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
                sku
              }
            }
          }
        }
      }
    }
    `,
    tries: 20,
  });

  return getOrder.body.data.order;
}

export const orderCreateEvent = async ({
  payload: _payload,
  session,
  storeId,
}: WebhookListenerArgs) => {
  if (!_payload || !session) {
    return console.log('OrderCreateEvent: No payload or session');
  }

  const gqlClient = getShopifyGQLClient(session!);
  const payload = _payload as Record<string, any>;

  const existPackageProtection = payload.line_items.find(
    (lineItem) => lineItem.sku === PRODUCT_SKU
  );
  const orderId = payload.admin_graphql_api_id;

  console.log(`OrderCreateEvent: ${payload.name}`);

  try {

    const order = await fetchOrders(orderId, session);
    if (
      order?.channelInformation?.channelDefinition?.channelName !== 'Online Store'
    )
      return;


    if (existPackageProtection) {
      const fulfillmentStatus = await queryProxy.packageProtection.findFirst({
        where: {
          storeId: session?.storeId,
        },
        select: { insuranceFulfillmentStatus: true },
      });

      const updatedOrder = await gqlClient.query<any>({
        data: `#graphql
        mutation {
          orderUpdate(input:{id: "${orderId}",tags:["Wenexus-Shipping-Protection"]}){
            order{
              id
              name
              totalPriceSet{
                shopMoney{
                  amount
                }
              }
              displayFulfillmentStatus
              lineItems(first:250){
                nodes{
                  sku
                  title
                  product {
                    id
                  }
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
                      sku

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
        tries: 20,
      });
      // create local db row for order

      const protectionFee =
        await updatedOrder.body.data.orderUpdate.order.lineItems.nodes
          .map((e) => {
            if (e.sku === PRODUCT_SKU) {
              return e.originalTotalSet.shopMoney.amount;
            } else {
              return 0;
            }
          })
          .join('');

      const data: Partial<PackageProtectionOrder> = {
        storeId,
        hasPackageProtection: true,
        orderId: orderId,
        customerId: payload.customer.id.toString(),
        customerEmail: payload.customer.email,
        customerFirstName: payload.customer.first_name,
        customerLastName: payload.customer.last_name,
        orderName: updatedOrder.body.data.orderUpdate.order.name,
        orderDate: payload.created_at,
        orderAmount: new Decimal(
          updatedOrder.body.data.orderUpdate.order.totalPriceSet.shopMoney.amount
        ),
        protectionFee: new Decimal(protectionFee),
        fulfillmentStatus:
          updatedOrder.body.data.orderUpdate.order.displayFulfillmentStatus,
      };

      await queryProxy.packageProtectionOrder.upsert(
        {
          where: { orderId: orderId },
          create: data,
          update: data,
        },
        { session }
      );

      if (
        fulfillmentStatus?.insuranceFulfillmentStatus ===
        'Mark as fulfilled immediately after purchase'
      ) {
        await makePackageProtectionFulfill(
          updatedOrder.body.data.orderUpdate.order.fulfillmentOrders.nodes,
          gqlClient
        );
      }
    } else {
      const data: Partial<PackageProtectionOrder> = {
        storeId,
        orderId,
        hasPackageProtection: false,
        customerId: payload.customer.id.toString(),
        customerEmail: payload.customer.email,
        customerFirstName: payload.customer.first_name,
        customerLastName: payload.customer.last_name,
        orderName: payload.name,
        orderAmount: new Decimal(payload.total_price),
        orderDate: payload.created_at,
        protectionFee: new Decimal(0),
        fulfillmentStatus: await fetchOrderStatus(orderId, session),
      };

      await queryProxy.packageProtectionOrder.upsert(
        {
          where: { orderId },
          create: data,
          update: data,
        },
        { session }
      );
    }
  } catch (err) {
    console.error('Error in OrderCreateEvent', err);
  }
};

const orderRefundEvent = async ({
  payload: _payload,
  session,
}: WebhookListenerArgs) => {
  if (!_payload || !session) {
    return console.log('OrderRefundEvent: No payload or session');
  }

  const gqlClient = getShopifyGQLClient(session!);

  const payload = _payload as Record<string, any>;

  console.log(`OrderRefundEvent: ${payload.name}`);

  const orderId = 'gid://shopify/Order/' + payload.order_id;

  try {
    await gqlClient.query<any>({
      data: `#graphql
      mutation{
        orderUpdate(input:{id: "${orderId}",tags:["Wenexus-Shipping-Refund"]}){
          order{
            id
          }userErrors{
            message
            field
          }
        }
      }
      `,
      tries: 20,
    });
  } catch (err) {
    console.error('Error in orderRefundEvent', err);
  }
};

const orderFulfilledEvent = async ({
  payload: _payload,
}: WebhookListenerArgs) => {
  if (!_payload) {
    return;
  }

  console.log(`OrderFulfilledEvent: ${(_payload as any).name}`);
};

const orderPartiallyFulfilledEvent = async ({
  payload: _payload,
  session,
}: WebhookListenerArgs) => {
  if (!_payload || !session) {
    return console.log('OrderPartiallyFulfilledEvent: No payload or session');
  }

  try {
    const fulfillmentStatus = await queryProxy.packageProtection.findFirst({
      where: {
        storeId: session?.storeId,
      },
      select: { insuranceFulfillmentStatus: true },
    });

    const gqlClient = getShopifyGQLClient(session!);
    const payload = _payload as Record<string, any>;

    console.log(`OrderPartiallyFulfilledEvent: ${payload.name}`);

    const orderId = payload.admin_graphql_api_id;
    const order = await fetchOrders(orderId, session);

    if (order?.channelInformation?.channelDefinition?.channelName !== 'Online Store') return;
    await queryProxy.packageProtectionOrder.update(
      {
        data: {
          fulfillmentStatus: order.displayFulfillmentStatus,
        },
        where: { orderId: orderId },
      },
      { session }
    );

    if (
      fulfillmentStatus?.insuranceFulfillmentStatus ===
      'Mark as fulfilled when other items fulfilled'
    ) {
      const fulfillmentOrder: Record<string, any>[] = [];

      order.fulfillmentOrders.nodes.forEach((order) => {
        const id = order.id;
        order.lineItems.nodes.forEach((item) => {
          fulfillmentOrder.push({
            fulfillmentOrderId: id,
            productId: item.id,
            status: order.status,
            productTitle: item.productTitle,
            sku: item.sku,
          });
        });
      });

      const fulfillmentLineItems: Record<string, any>[] = [];

      order.fulfillments.forEach((fulfill) => {
        fulfill.fulfillmentLineItems.nodes.forEach((item) => {
          fulfillmentLineItems.push({
            fulfillmentId: fulfill.id,
            productId: item.lineItem.id,
            productTitle: item.lineItem.title,
            sku: item.lineItem.sku,
          });
        });
      });
      const isExistFulfillmentPackageItem = fulfillmentOrder
        .filter((order) => order.status !== 'CLOSED')
        .filter((e) =>
          fulfillmentLineItems.every((i) => i.productTitle !== e.productTitle)
        )
        .filter((item) => item.sku === PRODUCT_SKU);

      if (isExistFulfillmentPackageItem.length) {
        for (const item of isExistFulfillmentPackageItem) {
          await gqlClient.query<any>({
            data: `#graphql
            mutation {
              fulfillmentCreate(fulfillment: {
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
            tries: 20,
          });
        }
      }
    }

    if (
      fulfillmentStatus?.insuranceFulfillmentStatus ===
      'Mark as fulfilled when first item(s) are fulfilled'
    ) {
      await makePackageProtectionFulfill(
        order.fulfillmentOrders.nodes,
        gqlClient
      );
    }
  } catch (error) {
    console.error('Error in orderPartiallyFulfilledEvent', error);
  }
};

export const orderUpdatedEvent = async ({
  payload: _payload,
  session,
}: WebhookListenerArgs) => {
  console.log(
    '-------------------------orderUpdated-----------------------------'
  );
  if (!_payload || !session) {
    return console.log('OrderUpdatedEvent: No payload or session');
  }
  const payload = _payload as Record<string, any>;
  try {
    const orderId = payload.admin_graphql_api_id;
    const order = await fetchOrders(orderId, session);
    console.log('   order?.channelInformation?.channelDefinition?.channelName',   order?.channelInformation?.channelDefinition?.channelName)
    if (
      order?.channelInformation?.channelDefinition?.channelName !== 'Online Store'
    )
      return;

    const protectionFee = order.lineItems.nodes
      .map((e) => {
        if (e.sku === PRODUCT_SKU) {
          return e.originalTotalSet.shopMoney.amount;
        } else {
          return 0;
        }
      })
      .join('');

    console.log(
      'order.displayFulfillmentStatus',
      order.displayFulfillmentStatus,
      order?.channelInformation?.channelDefinition?.channelName
    );

    const updateOrder = await queryProxy.packageProtectionOrder.update(
      {
        data: {
          fulfillmentStatus: order.displayFulfillmentStatus,
          protectionFee: Number(protectionFee),
          orderAmount: Number(order.totalPriceSet.shopMoney.amount),
          orderDate: payload.created_at,
        },
        where: { orderId: orderId },
      },
      { session }
    );
    console.log(updateOrder);

  } catch (error) {
    console.error('Error on OrderUpdateEvent', error);
  }
};

emitter.on('ORDERS_CREATE', orderCreateEvent);
emitter.on('REFUNDS_CREATE', orderRefundEvent);
emitter.on('ORDERS_FULFILLED', orderFulfilledEvent);
emitter.on('ORDERS_PARTIALLY_FULFILLED', orderPartiallyFulfilledEvent);
emitter.on('ORDERS_UPDATED', orderUpdatedEvent);
