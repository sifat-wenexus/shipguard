import { findOfflineSession } from '~/modules/find-offline-session.server';
import type { ActionFunctionArgs } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { emitter } from '~/modules/emitter.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  let ctx: Awaited<ReturnType<typeof shopify.authenticate.webhook>>;

  if (process.env.NODE_ENV === 'development') {
    const req = request.clone();

    ctx = {
      apiVersion: req.headers.get('x-shopify-api-version')!,
      shop: req.headers.get('x-shopify-shop-domain')!,
      webhookId: req.headers.get('x-shopify-webhook-id')!,
      topic: (req.headers.get('x-shopify-topic') as any).replaceAll('/', '_').toUpperCase(),
      payload: await req.json(),
      session: await findOfflineSession(req.headers.get('x-shopify-shop-domain')!),
    } as any;
  } else {
    ctx = await shopify.authenticate.webhook(request);
  }

  console.log(`Webhook: ${ctx.topic}`);
  console.log(`Shop: ${ctx.session?.shop}`);

  if (ctx.payload !== null && typeof ctx.payload === 'object' && !Array.isArray(ctx.payload)) {
    console.log('Payload:');

    for (const key in ctx.payload) {
      console.log(`  ${key}:`, ctx.payload[key]);
    }
  } else {
    console.log('Payload:', ctx.payload);
  }

  if (emitter.listeners(ctx.topic).length) {
    emitter.emit(ctx.topic, { ctx, request });
  } else {
    throw new Response('Unhandled webhook topic', { status: 404 });
  }

  return new Response('OK', { status: 200 });
};
