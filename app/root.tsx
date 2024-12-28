import ImgLogo from '~/assets/images/logo-shipping-protection.png';
import polarisViz from '@shopify/polaris-viz/build/esm/styles.css';
import polarisStyles from '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from '~/shopify-app-remix/react';
import tailwindStyles from '~/styles/tailwind.css';
import { MainNav } from './components/main-nav';
import { useEffect, useMemo } from 'react';
import { Frame } from '@shopify/polaris';
import { json } from '@remix-run/node';

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
  '/wenexus-deploy',
  '/',
]);

export async function loader() {
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

  return (
    <html>
      <head>
        <title>Shipping Protection</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/*<meta name="shopify-debug" content="web-vitals" />*/}
        {/*<script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" />*/}
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
            {!skipAuth && <MainNav />}
            <Outlet />
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
