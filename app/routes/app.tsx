import { Page, Layout } from '@shopify/polaris';
import { boundary } from '~/shopify-app-remix/server';
import type { HeadersArgs } from '@remix-run/node';
import { useRouteError } from '@remix-run/react';
import Dashboard from './dashboard';

export default function App() {
  // // this for ctrl + s fn
  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     if (event.ctrlKey && event.key === 's') {
  //       event.preventDefault();
  //       save();
  //     }
  //   };
  //   document.body.addEventListener('keydown', handleKeyPress);
  //   return () => {
  //     document.body.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, []);

  return (
    <>
      <Page>
        <Layout>
          <Dashboard />
        </Layout>
      </Page>
    </>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs: HeadersArgs) => {
  return boundary.headers(headersArgs);
};
