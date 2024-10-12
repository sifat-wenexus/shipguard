import { Box, Layout, Page, Text } from '@shopify/polaris';
import type { LoaderFunctionArgs } from '@remix-run/node';
import DateRangePicker from '../dashboard/date-range';
import { default30Days } from '../dashboard/dashboard';
import { PageShell } from '~/components/page-shell';
import { shopify } from '~/modules/shopify.server';
import React, { useMemo, useState } from 'react';
import { prisma } from '~/modules/prisma.server';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import OrderList from './order-list';

export interface IActiveDates {
  title: string;
  alias: string;
  period: {
    since: Date | string;
    until: Date | string;
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await shopify.authenticate.admin(request);
  const { currencyCode } = await prisma.store.findFirstOrThrow({
    where: { id: session.storeId },
    select: { currencyCode: true },
  });

  return json({ shop: session.shop.replace('.myshopify.com', ''), currencyCode });
}

const Order = () => {
  const defaultActiveDates = useMemo(() => default30Days(), []);
  const [activeDates, setActiveDates] = useState<IActiveDates>(defaultActiveDates);
  const data = useLoaderData<typeof loader>();

  return (
    <PageShell currencyCode={data.currencyCode}>
      <div className="m-4 sm:m-0 mt-10 sm:mt-4">
        {' '}
        <Page>
          <Layout>
            <div className="w-full ms-4">
              {/* <MainNav /> */}
              <Text as="h1" variant="headingLg" alignment="start">
                Order
              </Text>
              <br />
              <Box paddingBlockEnd={'400'}>
                <DateRangePicker setActiveDates={setActiveDates} />
              </Box>
              <OrderList shop={data.shop} activeDates={activeDates!} />
            </div>
          </Layout>
        </Page>
      </div>
    </PageShell>
  );
};

export default Order;
