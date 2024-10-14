import type { shopify } from '~/modules/shopify.server';

export type WebhookListenerArgs = Awaited<ReturnType<typeof shopify.authenticate.webhook>>;
