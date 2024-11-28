import {
  findOfflineSession,
  findOfflineSessionByStoreId,
} from '~/modules/find-offline-session.server';
import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { jobRunner } from '~/modules/job/job-runner.server';
import { emitter } from '~/modules/emitter.server';
import { shopify } from '~/modules/shopify.server';
import type { Store, Webhook } from '#prisma-client';
import { prisma } from '~/modules/prisma.server';
import type { JobName } from '~/jobs/index.server';
import type { Session } from '~/shopify-api/lib';
import _ from 'lodash';

interface LazyTopics {
  [key: string]: {
    job: JobName;
    runJob: (webhooks: Webhook[]) => void;
  };
}

interface StoreInfo {
  [storeId: string]: {
    lazyReferences: Set<string>;
    lazyTimeout?: NodeJS.Timeout;
    jobTimeout?: NodeJS.Timeout;
    pendingWebhooks: Set<Webhook>;
    lastLazyWebhook?: Webhook;
    readyToRun: boolean;
  };
}

export class WebhookManager {
  constructor() {
    prisma.store.findMany().then(async (stores) => {
      for (const store of stores) {
        this.stores[store.id] = {
          lazyReferences: new Set(),
          pendingWebhooks: new Set(),
          readyToRun: false,
        };
      }

      const webhooks = await prisma.webhook.findMany({
        where: {
          processed: false,
          nodeId: process.env.NODE_ID || '',
        },
      });

      console.log(`Found ${webhooks.length} webhooks to process`);

      const webhooksByStores = _.groupBy(webhooks, 'storeId');

      for (const storeId in webhooksByStores) {
        const webhooksByTopics = _.groupBy(webhooksByStores[storeId], 'topic');

        for (const topic in webhooksByTopics) {
          if (this.lazyTopics.hasOwnProperty(topic)) {
            this.lazyTopics[topic].runJob(webhooksByTopics[topic]);
            continue;
          }

          for (const webhook of webhooksByTopics[topic]) {
            await this.handleWebhook(webhook, undefined, false, false);
          }
        }

        await prisma.webhook.updateMany({
          where: {
            id: {
              in: webhooksByStores[storeId].map((webhook) => webhook.id),
            },
          },
          data: {
            processed: true,
          },
        });

        this.stores[storeId].readyToRun = true;

        const pendingWebhooks = Array.from(
          this.stores[storeId].pendingWebhooks
        );
        this.stores[storeId].pendingWebhooks.clear();

        while (pendingWebhooks.length > 0) {
          for (const webhook of pendingWebhooks) {
            await this.handleWebhook(webhook, undefined, false, false);
          }
        }

        await prisma.webhook.updateMany({
          where: {
            id: {
              in: pendingWebhooks.map((webhook) => webhook.id),
            },
          },
          data: {
            processed: true,
          },
        });
      }
    });

    emitter.on('store.create', (store: Store) => {
      this.stores[store.id] = {
        lazyReferences: new Set(),
        pendingWebhooks: new Set(),
        readyToRun: true,
      };
    });

    emitter.on('store.delete', (store: Store) => {
      if (this.stores[store.id]) {
        delete this.stores[store.id];
      }
    });
  }

  private lazyTopics: LazyTopics = {
    COLLECTIONS_UPDATE: {
      job: 'import-products',
      runJob: (webhooks) =>
        jobRunner.run({
          name: 'import-products',
          storeId: webhooks[0].storeId,
          maxRetries: 5,
          payload: {
            collectionIds: webhooks.map((webhook) => webhook.objectId),
          },
        }),
    },
    PRODUCTS_UPDATE: {
      job: 'import-products',
      runJob: (webhooks) =>
        jobRunner.run({
          name: 'import-products',
          storeId: webhooks[0].storeId,
          maxRetries: 5,
          payload: {
            productIds: webhooks.map((webhook) => webhook.objectId),
          },
        }),
    },
  };
  private stores: StoreInfo = {};

  stopLazyWebhookProcessing(storeId: string, reference: string) {
    const storeInfo = this.stores[storeId];

    if (!storeInfo.lazyReferences.has(reference)) {
      return;
    }

    storeInfo.lazyReferences.delete(reference);

    if (storeInfo.lazyReferences.size === 0 && storeInfo.lazyTimeout) {
      clearTimeout(storeInfo.lazyTimeout);
    }
  }

  startLazyWebhookProcessing(storeId: string, reference: string) {
    let storeInfo = this.stores[storeId];

    storeInfo.lazyReferences.add(reference);

    if (storeInfo.lazyTimeout) {
      clearTimeout(storeInfo.lazyTimeout);
    }

    storeInfo.lazyTimeout = setTimeout(() => {
      storeInfo.lazyReferences.clear();
      this.stopLazyWebhookProcessing(storeId, reference);
    }, 1000 * 60 * 15);
  }

  async handleRequest(request: Request) {
    const ctx = await shopify.authenticate.webhook(request);

    let webhook = await prisma.webhook.findFirst({
      where: {
        id: ctx.webhookId,
      },
    });

    if (webhook) {
      return new Response('OK', { status: 200 });
    }

    let storeId = ctx.session?.storeId;

    if (!storeId) {
      try {
        const session = await findOfflineSession(ctx.shop);
        storeId = session?.storeId;
      } catch (e) {
        const store = await prisma.store.findFirst({
          where: {
            domain: ctx.shop,
          },
          select: {
            id: true,
          },
        });

        storeId = store?.id;
      }
    }

    if (!storeId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const data = {
      storeId,
      id: ctx.webhookId,
      nodeId: process.env.NODE_ID || '',
      topic: ctx.topic,
      objectId:
        (ctx.payload as Record<string, any>)?.id?.toString() ||
        (ctx.payload as Record<string, any>)?.admin_graphql_api_id?.toString(),
      payload: ctx.payload || {},
    };

    webhook = await prisma.webhook.upsert({
      where: {
        id: ctx.webhookId,
      },
      create: data,
      update: data,
    });

    setImmediate(async () => {
      await this.handleWebhook(webhook, ctx.session, true, true);
    });

    return new Response('OK', { status: 200 });
  }

  private async handleWebhook(
    webhook: Webhook,
    session?: Session,
    checkReady = true,
    update = true
  ) {
    const storeInfo = this.stores[webhook.storeId];

    if (!storeInfo.readyToRun && checkReady) {
      console.log(`Store ${webhook.storeId} not ready for webhooks`);
      return storeInfo.pendingWebhooks.add(webhook);
    }

    if (
      !this.lazyTopics.hasOwnProperty(webhook.topic) ||
      storeInfo.lazyReferences.size === 0
    ) {
      if (!session) {
        try {
          session = await findOfflineSessionByStoreId(webhook.storeId);
        } catch (e) {
          console.error(e);
        }
      }

      try {
        emitter.emit(webhook.topic, {
          storeId: webhook.storeId,
          shop: session?.shop,
          webhookId: webhook.id,
          payload: webhook.payload,
          topic: webhook.topic,
          apiVersion: '2024-01',
          session,
        } as WebhookListenerArgs);
      } catch (e) {
        console.error(e);
      }

      if (update) {
        await prisma.webhook.update({
          where: {
            id: webhook.id,
          },
          data: {
            processed: true,
          },
        });
      }
    }

    if (storeInfo.jobTimeout) {
      clearTimeout(storeInfo.jobTimeout);
      delete storeInfo.jobTimeout;
    }

    const runJob = async () => {
      const webhooks = Array.from(storeInfo.pendingWebhooks);

      storeInfo.pendingWebhooks.clear();
      delete storeInfo.lastLazyWebhook;

      if (webhooks.length === 0) {
        return;
      }

      this.runJob(webhooks);

      await prisma.webhook.updateMany({
        where: {
          id: {
            in: _.uniq(webhooks.map((webhook) => webhook.id)),
          },
        },
        data: {
          processed: true,
        },
      });
    };

    const secondsSinceLastWebhook = storeInfo.lastLazyWebhook
      ? Math.floor(
          (Date.now() - storeInfo.lastLazyWebhook.createdAt.getTime()) / 1000
        )
      : 0;

    if (storeInfo.pendingWebhooks.size < 1500 && secondsSinceLastWebhook < 30) {
      storeInfo.lastLazyWebhook = webhook;
      storeInfo.pendingWebhooks.add(webhook);

      return (storeInfo.jobTimeout = setTimeout(runJob, 1000 * 30));
    }

    return runJob();
  }

  private runJob(webhooks: Webhook[]) {
    const groupedWebhooks = _.groupBy(webhooks, 'topic');

    const collectionIds = groupedWebhooks.COLLECTIONS_UPDATE
      ? Array.from(
          new Set(
            groupedWebhooks.COLLECTIONS_UPDATE.map(
              (webhook) => webhook.objectId
            )
          )
        )
      : [];

    const productIds = groupedWebhooks.PRODUCTS_UPDATE
      ? Array.from(
          new Set(
            groupedWebhooks.PRODUCTS_UPDATE.map((webhook) => webhook.objectId)
          )
        )
      : [];

    jobRunner.run({
      name: 'import-products',
      storeId: webhooks[0].storeId,
      maxRetries: 5,
      payload: {
        collectionIds,
        productIds,
      },
    });
  }
}

export const webhookManager = new WebhookManager();
