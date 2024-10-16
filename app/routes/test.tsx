import { json, LoaderFunction } from '@remix-run/node';
import { getShopifyGQLClient, shopify } from '~/modules/shopify.server';
export const loader: LoaderFunction = async ({ request }) => {
  const ctx = await shopify.authenticate.admin(request);

  const gql = getShopifyGQLClient(ctx.session);

  const fetchOrders = async (pageSize: number, after: string | null) => {
    const result = await gql.query<any>({
      data: {
        query: `#graphql
        query orders($pageSize: Int, $after: String){
          orders(first:$pageSize, after: $after){
            pageInfo{
              endCursor
              hasNextPage
            }
            edges{
              node{
                id
                name
                customer{
                  firstName
                  lastName
                  email
                }
              }
            }
          }
        }`,
        variables: {
          pageSize: pageSize,
          after: after,
        },
      },
    });
    return result.body.data.orders;
  };
  async function getAllOrders() {
    let allOrders = [];
    let cursor = null;
    let hasNextPage = true;

    while (hasNextPage) {
      const orders = await fetchOrders(5, cursor);
      allOrders = allOrders.concat(orders.edges.map((edge) => edge.node));

      // Check if there's a next page
      hasNextPage = orders.pageInfo.hasNextPage;

      // Set the cursor to the last order's cursor for the next page request
      cursor = orders.pageInfo.endCursor ?? null;
    }

    console.log(allOrders);
    return allOrders;
  }

  const r = await getAllOrders();

  return json({ message: 'Response', r });
};

// import { Tag, Thumbnail, Tooltip } from '@shopify/polaris';

// const Test = () => {
//   return (
//     <div style={{ width: '200px' }}>
//       <Tooltip content="dfae">
//         <Tag onRemove={() => {}}>
//           <div style={{ display: 'flex', gap: '10px', padding: '5px' }}>
//             {' '}
//             <Thumbnail
//               size="small"
//               alt={'file.name'}
//               source={'https://nodemailer.com/nm_logo_200x136.png'}
//             />
//             <div>
//               <p style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                 hello world dfgfg sdfgr sdfgrg sfgrtg
//               </p>
//               <span>129-kb</span>
//             </div>
//           </div>
//         </Tag>
//       </Tooltip>
//     </div>
//   );
// };

// export default Test;
