import { findOfflineSession } from '~/modules/find-offline-session.server';
import { queryProxy } from '~/modules/query/query-proxy';
import { Migration } from '~/modules/migration.server';
import { shopify } from '~/modules/shopify.server';
import type { Session } from '~/shopify-api/lib';
import { prisma } from '~/modules/prisma.server';

async function init() {
  console.log(`[Init] Process started`);

  const start = Date.now();

  const app = await prisma.app.findFirst();
  // jobRunner.run({name: 'send-email',storeId:'gid://shopify/Shop/55079829551',payload:{uninstalled:false}});
  if (app?.url !== process.env.APP_URL) {
    const query = await queryProxy.store.findMany({
      select: { domain: true },
      orderBy: [{ id: 'asc' }],
    });

    query.addListener(async (data) => {
      for (const { domain } of data) {
        try {
          const session = await findOfflineSession(domain);

          await shopify.registerWebhooks({ session });
          await Migration.updateAppUrl(session);
        } catch (e) {
          console.error(e);
        }
      }

      if (query.hasNext) {
        query.next();
      } else {
        await prisma.app.upsert({
          where: { id: 1 },
          create: { id: 1, url: process.env.APP_URL! },
          update: { id: 1, url: process.env.APP_URL },
        });
      }
    });
  }

  try {
    const query = await queryProxy.store.findMany({
      select: { id: true, domain: true },
      where: {
        uninstalledAt: null,
      },
      orderBy: [{ id: 'asc' }],
    });

    query.addListener(async (data) => {
      for (const { domain } of data) {
        let session: Session;

        console.log(`[Init] Processing ${domain}`);

        try {
          session = await findOfflineSession(domain);
        } catch (e) {
          console.log(`[Init] Could not find session for ${domain}`);
          continue;
        }

        try {
          console.log(`[Init] Attempting migration for ${domain}`);
          await Migration.attempt(session);
        } catch (e) {
          console.error(e);
        }

        // try {
        //   const productImage =
        //     'https://cdn.shopify.com/s/files/1/0900/3221/0212/files/Inhouse_Shipping_Protection.png?v=1728361462';
        //   const gqlClient = getShopifyGQLClient(session);
        //
        //   const existingProduct = await gqlClient.query<any>({
        //     data: {
        //       query: `#graphql
        //       query Product {
        //         products(first: 100 ,query:"tag:wenexus-insurance OR sku:wenexus-shipping-protection"){
        //           nodes{
        //             id
        //             title
        //             media(first: 200){
        //               nodes{
        //                 preview{
        //                   image{
        //                     url
        //                   }
        //                 }
        //               }
        //             }
        //           }
        //         }
        //       }
        //       `,
        //     },
        //   });
        //
        //   for (const node of existingProduct.body.data.products.nodes) {
        //     const mediaNodes = node.media?.nodes || [];
        //     const createMedia = () =>
        //       gqlClient.query<any>({
        //         data: {
        //           query: `#graphql
        //         mutation productCreateMedia($media: [CreateMediaInput!]!, $productId: ID!) {
        //           productCreateMedia(media: $media, productId: $productId) {
        //
        //             mediaUserErrors {
        //               field
        //               message
        //             }
        //
        //           }
        //         }`,
        //           variables: {
        //             media: [
        //               {
        //                 alt: 'package-protection',
        //                 mediaContentType: 'IMAGE',
        //                 originalSource: productImage,
        //               },
        //             ],
        //             productId: node.id,
        //           },
        //         },
        //         tries: 20,
        //       });
        //
        //     if (node.media.nodes.length === 0) {
        //       await createMedia();
        //     }
        //
        //     for (const media of mediaNodes) {
        //       if (media.preview?.image?.url) {
        //         console.log('product id----> ', node.id);
        //         console.log('found:', media.preview.image.url);
        //       } else {
        //         console.log('not-found');
        //         await createMedia();
        //       }
        //     }
        //   }
        // } catch (e) {
        //   console.error(e);
        // }
      }

      if (query.hasNext) {
        query.next();
      } else {
        console.log(`[Init] Done in ${(Date.now() - start) / 1000} seconds`);
      }
    });
  } catch (e) {
    console.error(e);
  }
}

init();
