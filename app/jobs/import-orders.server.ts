import { performBulkOperation } from '~/modules/perform-bulk-operation.server';
import { orderCreateEvent, orderUpdatedEvent } from '~/listeners/order.server';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import { stitchBulkResult } from '~/modules/stitch-bulk-result';
import { getShopifyRestClient } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { Job } from '~/modules/job/job';
import _ from 'lodash';

interface Result {
  importedOrders: any[] | null;
  updatedOrders: any[] | null;
}

interface Payload {
  since?: string;
}

export class ImportOrders extends Job<Result, Payload> {
  async execute() {
    const store = await prisma.store.findUniqueOrThrow({
      where: { id: this.job.storeId! },
      select: {
        domain: true,
        id: true,
      },
    });
    const session = await findOfflineSession(store.domain);
    const since = this.job.payload?.since ?? new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 2).toISOString();

    await this.updateProgress(10);

    const { data } = await performBulkOperation(
      session,
        `#graphql
      {
        orders(query: "created_at:>${since} OR updated_at:>${since}", sortKey: ORDER_NUMBER) {
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
      `,
    );

    await this.updateProgress(50);

    await this.updatePayload({ since: new Date().toISOString() });

    if (data.length === 0) {
      return {
        importedOrders: null,
        updatedOrders: null,
      };
    }

    const orders = stitchBulkResult(data);

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
    const availableOrderIds = new Set(ordersAvailable.map((order) => order.orderId));

    const orderIdsToImport = _.chunk(
      orders.filter((order) => !availableOrderIds.has(order.id))
        .map((order) => order.id.split('/').pop()!),
      50,
    );

    const orderIdsToUpdate = _.chunk(
      orders.filter((order) => availableOrderIds.has(order.id))
        .map((order) => order.id.split('/').pop()!),
      50,
    );

    const restClient = getShopifyRestClient(session);

    const importedOrders: any[] = [];
    const updatedOrders: any[] = [];

    for (const orderIds of orderIdsToImport) {
      const orders = await restClient.get<{ orders: any[] }>({
        path: '/orders.json',
        query: {
          ids: orderIds.join(','),
        },
      });

      for (const order of orders.body.orders) {
        await orderCreateEvent({
          ctx: {
            shop: store.domain,
            payload: order,
            session,
          },
        } as any);

        importedOrders.push(order);
      }
    }

    for (const orderIds of orderIdsToUpdate) {
      const orders = await restClient.get<{ orders: any[] }>({
        path: '/orders.json',
        query: {
          ids: orderIds.join(','),
        },
      });

      for (const order of orders.body.orders) {
        const fulfillmentStatus = order.fulfillment_status === 'partial'
          ? 'PARTIALLY_FULFILLED' : order.fulfillment_status === 'fulfilled'
            ? 'FULFILLED' : 'UNFULFILLED';
        const orderInDb = ordersAvailable.find((o) => o.orderId === order.id);

        if (orderInDb?.fulfillmentStatus === fulfillmentStatus) {
          continue;
        }

        await orderUpdatedEvent({
          ctx: {
            shop: store.domain,
            payload: order,
            session,
          },
        } as any);

        updatedOrders.push(order);
      }
    }

    return {
      importedOrders,
      updatedOrders,
    };
  }
}
