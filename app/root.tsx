import ImgLogo from '~/assets/images/inhouse-shipping-protection.png';
import polarisViz from '@shopify/polaris-viz/build/esm/styles.css';
import polarisStyles from '@shopify/polaris/build/esm/styles.css';
import { queryProxy } from '~/modules/query/query-proxy';
import { AppProvider } from '~/shopify-app-remix/react';
import tailwindStyles from '~/styles/tailwind.css';
import { MainNav } from './components/main-nav';
import { useEffect, useMemo } from 'react';
import { Frame } from '@shopify/polaris';
import { json } from '@remix-run/node';
import { Nav } from './components/nav';
import appCss from '~/styles/app.css';

import rsuite from "rsuite/Accordion/styles/index.css";

import {
  isRouteErrorResponse,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  useLocation,
  LiveReload,
  Scripts,
  Outlet,
  Links,
  Meta,
} from '@remix-run/react';

export const links = () => [
  { rel: 'icon', href: '/favicon.png', type: 'image/png' },
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'stylesheet', href: polarisStyles },
  { rel: 'stylesheet', href: appCss },
  { rel: 'stylesheet', href: polarisViz },
  {rel: 'stylesheet',href: rsuite}
];

const skipAuthPaths = new Set(['/auth/login', '/terms-of-service', '/privacy-policy','/']);

export async function loader() {
  return json({ apiKey: process.env.SHOPIFY_API_KEY });
}

export default function Root() {
  const data = useLoaderData<typeof loader>();
  const location = useLocation();
  const skipAuth = useMemo(() => skipAuthPaths.has(location.pathname), [location.pathname]);

  useEffect(() => {
    if (window !== undefined) {
      (window as any).queryProxy = queryProxy;
    }
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
        {!skipAuth && (
          <>
            <Nav />
            <MainNav />
          </>
        )}
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
