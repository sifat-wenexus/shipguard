import ImgLogo from '~/assets/images/logo-shipping-protection.png';
import polarisViz from '@shopify/polaris-viz/build/esm/styles.css';
import polarisStyles from '@shopify/polaris/build/esm/styles.css';
import { queryProxy } from '~/modules/query/query-proxy';
import { AppProvider } from '~/shopify-app-remix/react';
import LogoAnimation from '~/components/page-loader';
import tailwindStyles from '~/styles/tailwind.css';
import { MainNav } from './components/main-nav';
import { useEffect, useMemo, useState } from 'react';
import { Frame } from '@shopify/polaris';
import { json } from '@remix-run/node';
import { Nav } from './components/nav';

import appCss from '~/styles/app.css';
import rsuite from 'rsuite/Accordion/styles/index.css';

import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRouteError,
} from '@remix-run/react';
import { getShopifyGQLClient, shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';

export const links = () => [
  { rel: 'icon', href: '/favicon.png', type: 'image/png' },
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'stylesheet', href: polarisStyles },
  { rel: 'stylesheet', href: appCss },
  { rel: 'stylesheet', href: polarisViz },
  { rel: 'stylesheet', href: rsuite },
];

const skipAuthPaths = new Set([
  '/auth/login',
  '/terms-of-service',
  '/privacy-policy',
  '/',
]);

export async function loader({ request }) {
  const ctx = await shopify.authenticate.admin(request);
const productImage='https://cdn.shopify.com/s/files/1/0900/3221/0212/files/Inhouse_Shipping_Protection.png?v=1728361462'
  const gqlClient = getShopifyGQLClient(ctx.session);

    const existingProduct = await gqlClient.query<any>({
      data: {
        query: `#graphql
      query Product {
        products(first: 100 ,query:"tag:wenexus-insurance OR sku:wenexus-shipping-protection"){
          nodes{
            id
            title
            media(first: 200){
              nodes{
                preview{
                  image{
                    url
                  }
                }
              }
            }
          }
        }
      }
      `,
      }
    });

    console.log('product-image', JSON.stringify(existingProduct.body.data.products));
  for (const node of existingProduct.body.data.products.nodes) {
    const mediaNodes = node.media?.nodes || [];

    console.log('mediaNodes',node.media.nodes.length>0);

    if(node.media.nodes.length===0){
      await gqlClient.query<any>({
        data: {
          query: `#graphql
          mutation productCreateMedia($media: [CreateMediaInput!]!, $productId: ID!) {
            productCreateMedia(media: $media, productId: $productId) {

              mediaUserErrors {
                field
                message
              }

            }
          }`,
          variables: {
            media: [
              {
                alt: 'package-protection',
                mediaContentType: 'IMAGE',
                originalSource: productImage,
              },
            ],
            productId: node.id,
          },
        },
        tries: 20,
      });
    }
    for (const media of mediaNodes) {
      if (media.preview?.image?.url) {
        console.log('product id----> ',node.id)
        console.log("found:", media.preview.image.url);

      } else {
        console.log("not-found");
        // await gqlClient.query<any>({
        //   data: {
        //     query: `#graphql
        //     mutation productCreateMedia($media: [CreateMediaInput!]!, $productId: ID!) {
        //       productCreateMedia(media: $media, productId: $productId) {
        //
        //         mediaUserErrors {
        //           field
        //           message
        //         }
        //
        //       }
        //     }`,
        //     variables: {
        //       media: [
        //         {
        //           alt: 'package-protection',
        //           mediaContentType: 'IMAGE',
        //           originalSource: productImage,
        //         },
        //       ],
        //       productId: node.id,
        //     },
        //   },
        //   tries: 20,
        // });
      }
    }
  }

  return json({ apiKey: process.env.SHOPIFY_API_KEY });
}

export default function Root() {
  const data = useLoaderData<typeof loader>();
  const location = useLocation();
  const skipAuth = useMemo(
    () => skipAuthPaths.has(location.pathname),
    [location.pathname]
  );

  useEffect(() => {
    if (window !== undefined) {
      (window as any).queryProxy = queryProxy;
    }
  }, []);

  useEffect(() => {
    // First Script
    const script1 = document.createElement('script');
    script1.textContent = `
      window.$zoho=window.$zoho || {};
      $zoho.salesiq=$zoho.salesiq || {ready:function(){}};
    `;
    !skipAuth && document.body.appendChild(script1);

    // Second Script
    const script2 = document.createElement('script');
    script2.src =
      'https://salesiq.zohopublic.com/widget?wc=siqb8f0eebf5006b04bfd0062576742303d8e88f31da1c900013900139e299809ae';
    script2.id = 'zsiqscript';
    script2.defer = true;
    if (!skipAuth) document.body.appendChild(script2);
  }, [skipAuth]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Cleanup timeout on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <html>
      <head>
        <title>Shipping Protection</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider isEmbeddedApp apiKey={data.apiKey!}>
          <Frame
            logo={{
              contextualSaveBarSource: ImgLogo,
              topBarSource: ImgLogo,
              url: ImgLogo,
              width: 48,
            }}
          >
            {loading ? (
              <LogoAnimation />
            ) : (
              <>
                {' '}
                {!skipAuth && (
                  <>
                    {/*<Nav />*/}
                    <MainNav />
                  </>
                )}
                <Outlet />
              </>
            )}
          </Frame>
        </AppProvider>

        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
            ? error.message
            : 'Unknown Error'}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}
