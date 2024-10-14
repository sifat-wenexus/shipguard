import type { WebhookContextWithSession } from '~/shopify-app-remix/server/authenticate/webhooks/types';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import { emitter } from '~/modules/emitter.server';
import { Job } from '~/modules/job/job';

interface Payload {
  topic: string;
  webhookId: string;
  payload: any;
  apiVersion: string;
  shop: string;
}

export class HandleWebhook extends Job<Payload> {
  async execute() {
    const { payload } = this.job;

    if (emitter.listeners(payload.topic).length === 0) {
      throw new Error(`No listeners for topic: ${payload.topic}`);
    }

    emitter.emit(payload.topic, {
      shop: payload.shop,
      webhookId: payload.webhookId,
      payload: payload.payload,
      topic: payload.topic,
      apiVersion: payload.apiVersion,
      session: await findOfflineSession(payload.shop),
    } as WebhookContextWithSession<any, any>);
  }
}
