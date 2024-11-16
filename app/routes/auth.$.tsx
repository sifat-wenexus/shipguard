import { shopify } from '~/modules/shopify.server';

export async function loader({ request }) {
  const url = new URL(request.url);

  if (!url.pathname.endsWith('/login')) {
    await shopify.authenticate.admin(request);
  }

  return new Response('');
}
