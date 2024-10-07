import { PRODUCT_SKU } from '~/routes/settings.widget-setup/modules/package-protection-listener.server';
import {
  getShopifyGQLClient,
  getShopifyRestClient,
} from '~/modules/shopify.server';
import type { GraphqlClient } from '~/shopify-api/lib/clients/graphql/graphql_client';
import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { queryProxy } from '~/modules/query/query-proxy';
import { emitter } from '~/modules/emitter.server';
import _ from 'lodash';
import { Console } from '~/utils/log';

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
// TODO: uninstall to install old order data recover or restore.
// TODO: if added new column then should fill previous data as per related table
const orderCreateEvent = async ({
  ctx: { shop, payload: _payload, session },
}: WebhookListenerArgs) => {
  if (!_payload) {
    return;
  }

  const gqlClient = getShopifyGQLClient(session!);
  const restClient = getShopifyRestClient(session!);
  const payload = _payload as Record<string, any>;
  Console.file('payload.json', JSON.stringify(payload));
  const products = await restClient.get<any>({
    path: '/products.json',
    query: {
      ids: payload.line_items.map((item) => item.product_id).join(','),
    },
  });

  const productsByIDs = _.keyBy(
    products.body.products.map((p) => ({
      id: p.id,
      tags: p.tags.split(',').map((tag: string) => tag.trim()),
    })),
    'id'
  );

  const existPackageProtection = payload.line_items.find(
    (lineItem) =>
      !(
        lineItem.sku === 'overall-package-protection' ||
        lineItem.sku === 'wenexus-shipping-protection' ||
        productsByIDs[lineItem.product_id].tags.includes('overall-insurance')
      )
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
          orderUpdate(input:{id: "${orderId}",tags:["Wenexus-Shipping-Protection"]}){
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
      });
      // create local db row for order

      const protectionFee =
        await updatedOrder.body.data.orderUpdate.order.lineItems.nodes
          .map((e) => {
            if (
              e.sku === 'overall-package-protection' ||
              e.sku === 'wenexus-shipping-protection' ||
              productsByIDs[
                _.last(e.product.id.split('/')) as string
              ].tags.includes('overall-insurance')
            ) {
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
          customerEmail: payload.customer.email,
          customerFirstName: payload.customer.first_name,
          customerLastName: payload.customer.last_name,
          orderName: payload.name,
          storeId: session?.storeId,
          orderAmount: Number(payload.total_price),
          protectionFee: Number(protectionFee),
          customerAddress: JSON.stringify(payload.shipping_address),
          billingAddress: JSON.stringify(payload.billing_address),
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
    console.error('Error in OrderCreateEvent', err);
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

  try {
    await gqlClient.query<any>({
      data: `#graphql
      mutation{
        orderUpdate(input:{id: "${orderId}",tags:["Overall-Package-Refund","Wenexus-Shipping-Refund"]}){
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
  } catch (err) {
    console.error('Error in orderRefundEvent', err);
  }
};

const orderFulfilledEvent = async ({
  ctx: { shop, payload: _payload, session },
}: WebhookListenerArgs) => {
  console.log('orderFulfilledEvent');
  if (!_payload) {
    return;
  }
};

const orderPartiallyFulfilledEvent = async ({
  ctx: { shop, payload: _payload, session },
}: WebhookListenerArgs) => {
  if (!_payload) {
    return;
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

    const existPackageProtection = payload.line_items.find(
      (line) => line.sku === PRODUCT_SKU
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
                    sku
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
              sku: item.sku,
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
  } catch (error) {
    console.error('Error in orderPartiallyFulfilledEvent', error);
  }
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

  try {
    const existPackageProtection = payload.line_items.find(
      (line) => line.sku === PRODUCT_SKU
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

      console.log(
        'getOrder.body.data.order.displayFulfillmentStatus',
        getOrder.body.data.order.displayFulfillmentStatus
      );
      const updateOrder = await queryProxy.packageProtectionOrder.update({
        data: {
          fulfillmentStatus: 'FULFILLED',
        },
        where: { orderId: orderId },
      });
      console.log(updateOrder);
    }
  } catch (error) {
    console.error('Error on OrderUpdateEvent', error);
  }
};

emitter.on('ORDERS_CREATE', orderCreateEvent);
emitter.on('REFUNDS_CREATE', orderRefundEvent);
emitter.on('ORDERS_FULFILLED', orderFulfilledEvent);
emitter.on('ORDERS_PARTIALLY_FULFILLED', orderPartiallyFulfilledEvent);
emitter.on('ORDERS_UPDATED', orderUpdatedEvent);
