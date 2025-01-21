import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { emitter } from '~/modules/emitter.server';
import { shopify } from '~/modules/shopify.server';
import type { Store, Webhook } from '#prisma-client';
import { prisma } from '~/modules/prisma.server';
import type { JobName } from '~/jobs/index.server';
import type { Session } from '~/shopify-api/lib';
import _ from 'lodash';

import {
  findOfflineSession,
  findOfflineSessionByStoreId,
} from '~/modules/find-offline-session.server';

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
        orderBy: {
          createdAt: 'asc',
        },
      });

      console.log(`Found ${webhooks.length} webhooks to process`);

      const webhooksByStores = _.groupBy(webhooks, 'storeId');
      const storesById = _.keyBy(stores, 'id');

      for (const storeId in webhooksByStores) {
        const store = storesById[storeId];

        if (store.appStatus !== 'READY') {
          this.stores[storeId].pendingWebhooks = new Set(
            webhooksByStores[storeId]
          );
          continue;
        }

        const webhooksByTopics = _.groupBy(webhooksByStores[storeId], 'topic');

        for (const topic in webhooksByTopics) {
          if (this.lazyTopics.hasOwnProperty(topic)) {
            console.log(`Running lazy topic: ${topic}`);
            this.lazyTopics[topic].runJob(webhooksByTopics[topic]);

            await prisma.webhook.updateMany({
              where: {
                id: {
                  in: webhooksByTopics[topic].map((webhook) => webhook.id),
                },
              },
              data: {
                processed: true,
              },
            });

            continue;
          }

          for (const webhook of webhooksByTopics[topic]) {
            await this.handleWebhook(webhook, false, true);
          }
        }

        while (this.stores[storeId].pendingWebhooks.size > 0) {
          const pendingWebhooks = Array.from(
            this.stores[storeId].pendingWebhooks
          );

          pendingWebhooks.sort(
            (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
          );

          this.stores[storeId].pendingWebhooks.clear();

          for (const webhook of pendingWebhooks) {
            await this.handleWebhook(webhook, false, true);
          }
        }
      }

      for (const storeId in this.stores) {
        this.stores[storeId].readyToRun = true;
        console.log(`Store ready to process webhooks: ${storeId}`);
      }
    });

    emitter.on('store.init', (store: Store) => {
      if (!this.stores.hasOwnProperty(store.id)) {
        this.stores[store.id] = {
          lazyReferences: new Set(),
          pendingWebhooks: new Set(),
          readyToRun: false,
        };
      }
    });

    emitter.on('store.delete', (store: Store) => {
      if (this.stores[store.id]) {
        delete this.stores[store.id];
      }
    });

    emitter.on('store.ready', (store: Store) => {
      this.stores[store.id].readyToRun = true;
      console.log(`Store ready to process webhooks: ${store.id}`);

      while (this.stores[store.id].pendingWebhooks.size > 0) {
        const pendingWebhooks = Array.from(
          this.stores[store.id].pendingWebhooks
        );

        this.stores[store.id].pendingWebhooks.clear();

        for (const webhook of pendingWebhooks) {
          this.handleWebhook(webhook, false, true);
        }
      }
    });

    emitter.on('store.updating', (store: Store) => {
      this.stores[store.id].readyToRun = false;
    });
  }

  private lazyTopics: LazyTopics = {

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

    storeInfo.lazyTimeout = setTimeout(
      () => {
        storeInfo.lazyReferences.clear();
        this.stopLazyWebhookProcessing(storeId, reference);
      },
      1000 * 60 * 15
    );
  }

  async handleRequest(request: Request) {
    const ctx = await shopify.authenticate.webhook(request);

    let webhook = await prisma.webhook.findFirst({
      where: {
        id: ctx.webhookId,
      },
    });

    console.log(`New webhook: ${ctx.topic}, ${ctx.webhookId}`);

    if (webhook) {
      console.log(`Webhook already exists: ${ctx.topic}, ${ctx.webhookId}`);

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
      console.log(`Unauthorized: ${ctx.topic}, ${ctx.webhookId}`);
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

    console.log(`Created webhook: ${ctx.topic}, ${ctx.webhookId}`);

    setImmediate(async () => {
      console.log(`Handling webhook: ${ctx.topic}, ${ctx.webhookId}`);
      await this.handleWebhook(webhook, true, true, ctx.session);
    });

    return new Response('OK', { status: 200 });
  }

  private async handleWebhook(
    webhook: Webhook,
    checkReady: boolean,
    update: boolean,
    session?: Session
  ) {
    const storeInfo = this.stores[webhook.storeId];

    if (!storeInfo) {
      console.log(`Store not found: ${webhook.topic}, ${webhook.id}`);
      return;
    }

    if (checkReady && !storeInfo.readyToRun) {
      console.log(`Store not ready to run: ${webhook.topic}, ${webhook.id}`);
      return storeInfo.pendingWebhooks.add(webhook);
    }

    if (
      !this.lazyTopics.hasOwnProperty(webhook.topic) ||
      storeInfo.lazyReferences.size === 0
    ) {
      console.log(`No lazy topic: ${webhook.topic}, ${webhook.id}`);

      if (!session) {
        console.log(`Fetching session: ${webhook.topic}, ${webhook.id}`);

        try {
          session = await findOfflineSessionByStoreId(webhook.storeId);
        } catch (e) {
          console.error(e);
        }
      }

      try {
        console.log(`Emitting webhook: ${webhook.topic}, ${webhook.id}`);
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
        console.log(`Updating webhook: ${webhook.topic}, ${webhook.id}`);

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

    for (const topic in groupedWebhooks) {
      if (this.lazyTopics.hasOwnProperty(topic)) {
        this.lazyTopics[topic].runJob(groupedWebhooks[topic]);
      }
    }
  }
}

export const webhookManager = new WebhookManager();
