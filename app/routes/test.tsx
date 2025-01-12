import { json } from '@remix-run/node';
import { getShopifyGQLClient, shopify as shopifyRemix } from '~/modules/shopify.server';


export async function loader({ request }) {
  const ctx = await shopifyRemix.authenticate.admin(request);

  const gql = getShopifyGQLClient(ctx.session);

  const asset = await gql.query<Record<string, any>>({
    data: `#graphql
    query {
      shop{
        name
        url
        primaryDomain{
          id
          host
          url
        }
      }
    }
    `,tries:20
  });

  return json({ res: 'helllo from test' ,result:asset});
}
