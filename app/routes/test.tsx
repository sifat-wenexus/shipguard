import { json } from '@remix-run/node';
import { getShopifyGQLClient, shopify as shopifyRemix } from '~/modules/shopify.server';



export async function loader({ request }) {
  const ctx = await shopifyRemix.authenticate.admin(request);

const gql =getShopifyGQLClient(ctx.session)
const res=await gql.query<any>({
  data:{
    query: `
        #graphql
        query {
          product(id: "gid://shopify/Product/7879329415215"){
            id
            variants(first: 250){
              nodes {
                id
                sku
                price

              }
            }
          }
        }
    `
  }
})

  function extractVariantData(productData) {
    // Check if the data structure is valid
    if (!productData || !productData.product || !productData.product.variants) {
      throw new Error("Invalid product data structure.");
    }

    // Extract variants
    const variants = productData.product.variants.nodes;

    // Map and return only id and price
    return variants.map(variant => ({
      id: variant.id,
      price: variant.price
    }));
  }

  const filnal=extractVariantData(res.body.data)

  return json({ res: 'helllo from test' ,result:filnal});
}
