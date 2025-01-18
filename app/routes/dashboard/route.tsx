import type { LoaderFunctionArgs } from '@remix-run/node';
import { PageShell } from '~/components/page-shell';
import { shopify } from '~/modules/shopify.server';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/modules/prisma.server';
import { Page } from '@shopify/polaris';
import { json , createCookie } from '@remix-run/node';
import Dashboard from './dashboard';

export async function loader({ request }: LoaderFunctionArgs) {
  const ctx = await shopify.authenticate.admin(request);



  const { currencyCode,domain } = await prisma.store.findFirstOrThrow({
    where: { id: ctx.session.storeId },
    select: { currencyCode: true ,domain:true},
  });

  const guidelineCookie=createCookie(`shipping-insurance-guideline-${domain.split('.')[0]}`)
  const cookieHeader = await guidelineCookie.parse(request.headers.get('Cookie'));

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
      </Page>
    </PageShell>
  );
};

export default App;
