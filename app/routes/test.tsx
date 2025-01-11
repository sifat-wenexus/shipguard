import { json } from '@remix-run/node';
import { shopify as shopifyRemix } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';

export async function loader({ request }) {
  const ctx = await shopifyRemix.authenticate.admin(request);
console.log(ctx.session);

  const store=await prisma.store.findMany({})

  return json({ res: 'helllo from test' ,result:store});
}
