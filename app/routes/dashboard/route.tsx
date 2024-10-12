import type { LoaderFunctionArgs } from '@remix-run/node';
import { PageShell } from '~/components/page-shell';
import { shopify } from '~/modules/shopify.server';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/modules/prisma.server';
import { Page } from '@shopify/polaris';
import { json } from '@remix-run/node';
import Dashboard from './dashboard';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('cookie');
  const ctx = await shopify.authenticate.admin(request);
  const { currencyCode } = await prisma.store.findFirstOrThrow({
    where: { id: ctx.session.storeId },
    select: { currencyCode: true },
  });

  return json({
    guidelineVisibility: cookieHeader,
    currencyCode,
  });
}

const App = () => {
  const data = useLoaderData<typeof loader>();

  const { guidelineVisibility } = useLoaderData<typeof loader>();
  return (
    <PageShell currencyCode={data.currencyCode}>
      <Page>
        <Dashboard guidelineVisibility={guidelineVisibility} />
      </Page>
    </PageShell>
  );
};

export default App;
