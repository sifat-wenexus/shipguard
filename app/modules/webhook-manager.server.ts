import type { WebhookContextWithSession } from '~/shopify-app-remix/server/authenticate/webhooks/types';
import { findOfflineSessionByStoreId } from '~/modules/find-offline-session.server';
import { jobRunner } from '~/modules/job/job-runner.server';
import { emitter } from '~/modules/emitter.server';
import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { Prisma, Webhook } from '#prisma-client';
import { JobName } from '~/jobs/index.server';
import { Session } from '~/shopify-api/lib';
import _ from 'lodash';
import WebhookWhereInput = Prisma.WebhookWhereInput;

interface LazyTopics {
  [key: string]: {
    job: JobName;
    runJob: (webhooks: Webhook[]) => void;
  };
}

interface LazyStores {
  [storeId: string]: {
    references: Set<string>;
    timeout?: NodeJS.Timeout;
  };
}

export class WebhookManager {
  constructor() {
    this.getPendingWebhooks().then((webhooks) => {
      const groupedWebhooks = _.groupBy(webhooks, 'storeId');

      for (const storeId in groupedWebhooks) {
        this.runJob(groupedWebhooks[storeId]);
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
  private timeouts: Record<string, NodeJS.Timeout> = {};
  private lazyStores: LazyStores = {};

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

    const data = {
      id: ctx.webhookId,
      storeId: ctx.session!.storeId!,
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

    return new Promise((resolve) => {
      resolve(new Response('OK', { status: 200 }));
      this.handleWebhook(webhook, ctx.session);
    });
  }

  stopLazyWebhookProcessing(storeId: string, reference: string) {
    const lazyStore = this.lazyStores[storeId];

    if (!lazyStore || !lazyStore.references.has(reference)) {
      return;
    }

    lazyStore.references.delete(reference);

    if (!lazyStore.references.size) {
      if (lazyStore.timeout) {
        clearTimeout(lazyStore.timeout);
      }

      delete this.lazyStores[storeId];
    }
  }

  startLazyWebhookProcessing(storeId: string, reference: string) {
    let lazyStore = this.lazyStores[storeId];

    if (!lazyStore) {
      this.lazyStores[storeId] = lazyStore = {
        references: new Set(),
      };
    }

    if (!lazyStore.references.has(reference)) {
      lazyStore.references.add(reference);
    }

    if (lazyStore.timeout) {
      clearTimeout(lazyStore.timeout);
    }

    lazyStore.timeout = setTimeout(
      () => {
        this.stopLazyWebhookProcessing(storeId, reference);
      },
      1000 * 60 * 15
    );
  }

  private async handleWebhook(webhook: Webhook, session?: Session) {
    const lazyStore = this.lazyStores[webhook.storeId];

    if (
      !this.lazyTopics.hasOwnProperty(webhook.topic) ||
      !lazyStore ||
      !lazyStore.references.size
    ) {
      if (!session) {
        session = await findOfflineSessionByStoreId(webhook.storeId);
      }

      emitter.emitAsync(webhook.topic, {
        shop: session.shop,
        webhookId: webhook.id,
        payload: webhook.payload,
        topic: webhook.topic,
        apiVersion: '2024-01',
        session,
      } as WebhookContextWithSession<any, any>);

      return prisma.webhook.update({
        where: {
          id: webhook.id,
        },
        data: {
          processed: true,
        },
      });
    }

    if (this.timeouts[webhook.storeId]) {
      clearTimeout(this.timeouts[webhook.storeId]);
      delete this.timeouts[webhook.storeId];
    }

    const timeSinceWebhook = await this.getTimeSinceWebhook(webhook.storeId);
    const pendingWebhooksCount = await this.getPendingWebhooksCount(
      webhook.storeId
    );

    const runJob = async () => {
      const webhooks = await this.getPendingWebhooks(webhook.storeId);

      if (!webhooks.length) {
        return;
      }

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

      return this.runJob(webhooks);
    };

    if (pendingWebhooksCount < 1000 && timeSinceWebhook < 10) {
      return (this.timeouts[webhook.storeId] = setTimeout(runJob, 1000 * 10));
    }

    return runJob();
  }

  private async getTimeSinceWebhook(storeId: string): Promise<number> {
    const webhook = await prisma.webhook.findFirst({
      where: {
        storeId,
        processed: false,
        nodeId: process.env.NODE_ID || '',
        topic: {
          in: Object.keys(this.lazyTopics),
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!webhook) {
      return 0;
    }

    return Math.floor((Date.now() - webhook.createdAt.getTime()) / 1000);
  }

  private async getPendingWebhooksCount(storeId: string): Promise<number> {
    return prisma.webhook.count({
      where: {
        storeId,
        processed: false,
        nodeId: process.env.NODE_ID || '',
        topic: {
          in: Object.keys(this.lazyTopics),
        },
      },
    });
  }

  private async getPendingWebhooks(storeId?: string): Promise<Webhook[]> {
    const where: WebhookWhereInput = {
      processed: false,
      nodeId: process.env.NODE_ID || '',
      topic: {
        in: Object.keys(this.lazyTopics),
      },
    };

    if (storeId) {
      where.storeId = storeId;
    }

    return prisma.webhook.findMany({ where });
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
