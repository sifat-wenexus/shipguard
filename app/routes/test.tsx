import { json } from '@remix-run/node';
import { shopify as shopifyRemix } from '~/modules/shopify.server';
import { getShopInfo } from '~/modules/get-theme-file-content';

export async function loader({ request }) {
  const ctx = await shopifyRemix.authenticate.admin(request);

  const store = await getShopInfo(ctx.session);

  return json({ res: 'helllo from test' ,result:store});
}
