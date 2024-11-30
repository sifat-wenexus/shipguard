import { orderCreateEvent, orderUpdatedEvent } from '~/listeners/order.server';
import { bulkOperationManager } from '~/modules/bulk-operation-manager.server';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import { getShopifyRestClient } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { Job } from '~/modules/job/job';
import _ from 'lodash';

interface Payload {
  since?: string;
  orderIds?: string[];
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
    let query = '';

    if (this.job.payload.since) {
      const since = new Date(this.job.payload.since);
      query = `created_at:>='${since.toISOString()}' OR updated_at:>='${since.toISOString()}'`;
    } else if (this.job.payload.orderIds) {
      query = `id:${this.job.payload.orderIds.join(' OR id:')}`;
    }

    await this.performShopifyBulkQuery(
      `#graphql
      {
        orders(query: "${query}", sortKey: ORDER_NUMBER){
          edges {
            node {
              id
              name
              customer {
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

    const restClient = getShopifyRestClient(session);

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

    const orderIdsToImport = _.chunk(
      orders
        .filter((order) => !availableOrderIds.has(order.id))
        .map((order) => order.id.split('/').pop()),
      50
    );

    const importedOrders: any[] = [];

    for (const orderIds of orderIdsToImport) {
      const orders = await restClient.get<{ orders: any[] }>({
        path: '/orders.json',
        query: {
          ids: orderIds.join(','),
        },
      });

      for (const order of orders.body.orders) {
        await orderCreateEvent({
          shop: store.domain,
          payload: order,
          session,
        } as any);

        importedOrders.push(order);
      }
    }

    const orderIdsToUpdate = _.chunk(
      orders
        .filter((order) => availableOrderIds.has(order.id))
        .map((order) => order.id.split('/').pop()),
      50
    );

    await this.updateProgress(80);

    const updatedOrders: any[] = [];

    for (const orderIds of orderIdsToUpdate) {
      const orders = await restClient.get<{ orders: any[] }>({
        path: '/orders.json',
        query: {
          ids: orderIds.join(','),
        },
      });

      for (const order of orders.body.orders) {
        await orderUpdatedEvent({
          shop: store.domain,
          payload: order,
          session,
        } as any);

        updatedOrders.push(order);
      }
    }

    return {
      ordersAvailable,
      importedOrders,
      updatedOrders,
    };
  }
}
