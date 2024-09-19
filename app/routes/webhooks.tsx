import { emitter } from '~/modules/emitter.server';
import type { ActionFunctionArgs } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const ctx = await shopify.authenticate.webhook(request);

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
