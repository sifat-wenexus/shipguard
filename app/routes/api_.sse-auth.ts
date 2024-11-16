import { sseTokenStore } from '~/modules/query/token-store.server';
import type { ActionFunctionArgs } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { json } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopify.authenticate.admin(request);

  return json({
    token: (
      await sseTokenStore.createOrGetToken(ctx.session.shop, ctx.session.id)
    ).value,
    shop: ctx.session.shop,
    sessionId: ctx.session.id,
  });
}
