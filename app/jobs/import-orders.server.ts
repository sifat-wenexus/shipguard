import { orderCreateEvent, orderUpdatedEvent } from '~/listeners/order.server';
import { bulkOperationManager } from '~/modules/bulk-operation-manager.server';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import {
  getShopifyGQLClient,
  getShopifyRestClient,
} from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { Job } from '~/modules/job/job';
import _ from 'lodash';

interface Payload {
  since?: string;
}

export class ImportOrders extends Job<Payload> {
  steps = ['validate', 'fetchOrders', 'importOrders'];

  validate() {
    if (!this.job.storeId) {
      return this.cancelExecution({
        imported: 0,
        reason: 'Missing storeId',
      });
    }
  }

  async fetchOrders() {
    // const since = this.job.payload?.since ?? new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 2).toISOString();
    // await this.updatePayload({ since: new Date().toISOString() });

    await this.performShopifyBulkQuery(
      `#graphql
      {
        # orders(query: "created_at:>='' OR updated_at:>=''", sortKey: ORDER_NUMBER)
        orders(sortKey: ORDER_NUMBER) {
          edges {
            node {
              id
              name
              email
              createdAt
              totalPriceSet {
                shopMoney {
                  amount
                }
              }
              displayFulfillmentStatus
              customer {
                id
                email
                firstName
                lastName
              }

              totalPriceSet {
                shopMoney {
                  amount
                }
              }

              lineItems {
                edges {
                  node {
                    id
                    sku
                    title
                    product {
                      id
                    }
                    originalTotalSet {
                      shopMoney{
                        amount
                      }
                    }
                  }
                }
              }
              fulfillments {
                id
                status
              }

              fulfillmentOrders {
                edges {
                  node {
                    id
                    status
                    lineItems {
                      edges {
                        node {
                          id
                          productTitle
                          sku
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      `
    );
    await this.updateProgress(10);

    this.pauseExecution();
  }

  async importOrders() {
    await this.updateProgress(40);

    const data = await this.getResult<Record<string, any>[]>('fetchOrders');

    if (!data?.length) {
      return {
        importedOrders: null,
        updatedOrders: null,
      };
    }

    const store = await prisma.store.findUnique({
      where: {
        id: this.job.storeId!,
      },
    });

    if (!store) {
      return {
        importedOrders: null,
        updatedOrders: null,
      };
    }

    const session = await findOfflineSession(store.domain);

    if (!session) {
      return {
        importedOrders: null,
        updatedOrders: null,
      };
    }

    console.log('dddd')

const organizeOrderPayload=(orders)=>{
return  orders.map(element=>{
    return {
      name:element.name,
      order_id:element.id.split('/').pop(),
      admin_graphql_api_id:element.id,
      line_items:element.lineItems,
      customer:{...element.customer,id:element.customer.id.split('/').pop()},
      total_price:element.totalPriceSet.shopMoney.amount,
      created_at:element.createdAt,
      fulfillment_status:element.displayFulfillmentStatus  ==='PARTIALLY_FULFILLED'?'partial':element.displayFulfillmentStatus==='FULFILLED'?'fulfilled':'unfulfilled',
    }
  })
}
    const orders = bulkOperationManager.stitchResult(data);

    const ordersAvailable = await prisma.packageProtectionOrder.findMany({
      where: {
        storeId: this.job.storeId!,
        orderId: {
          in: orders.map((order) => order.id),
        },
      },
      select: {
        orderId: true,
        fulfillmentStatus: true,
      },
    });
    const availableOrderIds = new Set(
      ordersAvailable.map((order) => order.orderId)
    );

    const ordersToImport = _.chunk(
      orders.filter((order) => !availableOrderIds.has(order.id)),
      // .map((order) => order.id.split('/').pop()),
      50
    );

    const importedOrders: any[] = [];
    for (const order of ordersToImport) {
      console.log('order : => ', order);
      console.log('organize order:', organizeOrderPayload(order))
      await orderCreateEvent({
        shop: store.domain,
        payload: organizeOrderPayload(order),
        session,
      } as any);
      importedOrders.push(order);
    }

    const ordersToUpdate = _.chunk(
      orders
        .filter((order) => availableOrderIds.has(order.id)),
        // .map((order) => order.id.split('/').pop()),
      50
    );

    await this.updateProgress(80);

    const updatedOrders: any[] = [];

    for (const order of ordersToUpdate) {
      await orderUpdatedEvent({
      shop: store.domain,
      payload: organizeOrderPayload(order),
      session,
    } as any);
      updatedOrders.push(order);

      // const orders = await restClient.get<{ orders: any[] }>({
      //   path: '/orders.json',
      //   query: {
      //     ids: orderIds.join(','),
      //   },
      // });
      //
      // for (const order of orders.body.orders) {
      //
      //
      // }
    }

    return {
      ordersAvailable,
      importedOrders,
      updatedOrders,
    };
  }
}
