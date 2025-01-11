// import { json } from '@remix-run/node';
//
//
//
//   export function action() {
//     const jsCode = `
//     console.log('Hello from the server!');
//   `;
//     return json({ script: jsCode });
//   }

import { json } from '@remix-run/node';
import { shopify as shopifyRemix } from '~/modules/shopify.server';

export async function loader({request}) {
  const ctx = await shopifyRemix.authenticate.admin(request);
 const themes= await ctx.admin.rest.resources.Theme.all({session: ctx.session})
  return  json({themes});

  // const jsCode = `
  // ${themes}
  //   console.log('Hello from the server!');
  // `;
  // return new Response(jsCode, {
  //   headers: { 'Content-Type': 'application/javascript' },
  // });
}
