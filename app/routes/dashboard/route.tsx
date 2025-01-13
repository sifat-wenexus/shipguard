import type { LoaderFunctionArgs } from '@remix-run/node';
import { PageShell } from '~/components/page-shell';
import { shopify } from '~/modules/shopify.server';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/modules/prisma.server';
import { Page } from '@shopify/polaris';
import { json } from '@remix-run/node';
import Dashboard from './dashboard';
import OurApps from '~/components/our-apps';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('cookie');
  const ctx = await shopify.authenticate.admin(request);
  const { currencyCode } = await prisma.store.findFirstOrThrow({
    where: { id: ctx.session.storeId },
    select: { currencyCode: true },
  });

  const packageProtection = await prisma.packageProtection.findFirst({
    where: { storeId: ctx.session.storeId },
    select: { enabled: true },
  });

  return json({
    guidelineVisibility: cookieHeader,
    currencyCode,
    storeId: ctx.session.storeId,
    enabled: packageProtection ? packageProtection.enabled : false,
  });
}

const App = () => {
  const { guidelineVisibility, storeId, currencyCode,enabled } =
    useLoaderData<typeof loader>();
  return (
    <PageShell currencyCode={currencyCode}>
      <Page>
        <Dashboard
          guidelineVisibility={guidelineVisibility}
          storeId={storeId}
          enabled={enabled}
        />
        <OurApps/>
      </Page>
    </PageShell>
  );
};

export default App;
