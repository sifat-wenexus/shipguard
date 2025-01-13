import { json } from '@remix-run/node';
import {  shopify as shopifyRemix } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { queryProxy } from '~/modules/query/query-proxy';


export async function loader({ request }) {
  const ctx = await shopifyRemix.authenticate.admin(request);



  const google = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  console.log({google: google.json()})

  return json({ res: 'helllo from test' ,google});
}
