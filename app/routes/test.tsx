import { json } from '@remix-run/node';
import { getShopInfo } from '~/modules/get-theme-file-content';
import { shopify as shopifyRemix } from '~/modules/shopify.server';

export async function loader({ request }) {
  const ctx = await shopifyRemix.authenticate.admin(request);
console.log(ctx.session);

 const res= await getShopInfo(ctx.session);
  console.log(res);

  return json({ res: 'helllo from test' ,result:res});
}
