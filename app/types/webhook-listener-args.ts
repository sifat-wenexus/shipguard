import type { shopify } from '~/modules/shopify.server';

export interface WebhookListenerArgs {
  ctx: Awaited<ReturnType<typeof shopify.authenticate.webhook>>;
  request: Request;
}
