import type { ActionFunctionArgs } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { emitter } from '~/modules/emitter.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const ctx = await shopify.authenticate.webhook(request);

  if (emitter.listeners(ctx.topic).length) {
    emitter.emit(ctx.topic, { ctx, request });
  } else {
    throw new Response('Unhandled webhook topic', { status: 404 });
  }

  return new Response('OK', { status: 200 });
};
