import polarisViz from '@shopify/polaris-viz/build/esm/styles.css';
import polarisStyles from '@shopify/polaris/build/esm/styles.css';
import { I18nContext, I18nManager } from '@shopify/react-i18n';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { InitStore } from '~/modules/init-store.server';
import { AppProvider } from '~/shopify-app-remix/react';
import { Card, Frame, Spinner } from '@shopify/polaris';
import { Migration } from '~/modules/migration.server';
import { shopify } from '~/modules/shopify.server';
import tailwindStyles from '~/styles/tailwind.css';
import { prisma } from '~/modules/prisma.server';
import type { AppStatus } from '#prisma-client';
import ImgLogo from '~/assets/images/logo.png';
import { useEffect, useMemo } from 'react';
import { json } from '@remix-run/node';
import appCss from '~/styles/app.css';

import {
  isRouteErrorResponse,
  ScrollRestoration,
  useRevalidator,
  useLoaderData,
  useRouteError,
  LiveReload,
  Scripts,
  Outlet,
  Links,
  Meta,
} from '@remix-run/react';
import { MainNav } from './components/main-nav';
import { Nav } from './components/nav';
export const links = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'stylesheet', href: polarisStyles },
  { rel: 'stylesheet', href: appCss },
  { rel: 'stylesheet', href: polarisViz },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  if (url.pathname.startsWith('/auth/login')) {
    return json({
      appStatus: 'READY' as AppStatus,
      apiKey: process.env.SHOPIFY_API_KEY!,
      currencyCode: 'USD',
    });
  }

  if (
    !url.pathname.startsWith('/auth') &&
    !url.pathname.startsWith('/webhooks') &&
    !url.pathname.startsWith('/test') &&
    !url.pathname.startsWith('/gmail-oauth-callback')
  ) {
    const ctx = await shopify.authenticate.admin(request);

    try {
      await Migration.attempt(ctx.session);
    } catch (e) {
      await new InitStore(ctx.session).run();
    }

    const store = await prisma.store.findFirstOrThrow({
      where: {
        domain: ctx.session.shop,
      },
      select: {
        appStatus: true,
        currencyCode: true,
      },
    });

    return json({
      appStatus: store.appStatus,
      apiKey: process.env.SHOPIFY_API_KEY!,
      currencyCode: store.currencyCode,
    });
  }

  return json({
    appStatus: url.pathname.startsWith('/gmail-oauth-callback') ? 'READY' : 'INSTALLED' as AppStatus,
    apiKey: process.env.SHOPIFY_API_KEY!,
    currencyCode: 'USD',
  });
}

export default function Root() {
  const data = useLoaderData<typeof loader>();
  const validator = useRevalidator();

  useEffect(() => {
    if (data.appStatus === 'READY' || validator.state === 'loading') {
      return;
    }

    const interval = setInterval(() => {
      if (data.appStatus === 'READY') {
        return clearInterval(interval);
      }

      validator.revalidate();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [validator, data.appStatus]);

  const i18nManager = useMemo(() => {
    return new I18nManager({
      locale: 'en',
      currency: data.currencyCode,
      onError(error) {
        console.error(error);
      },
    });
  }, [data.currencyCode]);

  return (
    <html>
      <head>
        <title>Package Protection</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider isEmbeddedApp apiKey={data.apiKey!}>
          {/* <PolarisVizProvider> */}
          <I18nContext.Provider value={i18nManager}>
            <Frame
              logo={{
                contextualSaveBarSource: ImgLogo,
                topBarSource: ImgLogo,
                url: ImgLogo,
                width: 48,
              }}
            >
              {data.appStatus === 'READY' ? (
                <>
                  {/* TODO: Remove the top Nav bar from this root file, so it doesn't show on every pages */}
                  <Nav />
                  <MainNav />
                  <Outlet />
                </>
              ) : (
                <div className="flex justify-center items-center w-full h-full">
                  <Card>
                    <Spinner />
                  </Card>
                </div>
              )}
            </Frame>
          </I18nContext.Provider>
          {/* </PolarisVizProvider> */}
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
