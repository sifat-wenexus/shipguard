import { findOfflineSession } from '~/modules/find-offline-session.server';
import { jobRunner } from '~/modules/job/job-runner.server';
import type { ActionFunctionArgs } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const ctx = await shopify.authenticate.webhook(request);

  const session = await findOfflineSession(ctx.shop);

  await jobRunner.run({
    name: 'handle-webhook',
    storeId: session?.storeId,
    maxRetries: 5,
    payload: {
      topic: ctx.topic,
      webhookId: ctx.webhookId,
      payload: ctx.payload,
      apiVersion: ctx.apiVersion,
      shop: ctx.shop,
    },
  });

  return new Response('OK', { status: 200 });
};
