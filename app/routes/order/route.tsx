import { Box, Layout, Page, Text } from '@shopify/polaris';
import type { LoaderFunctionArgs } from '@remix-run/node';
import DateRangePicker from '../dashboard/date-range';
import { default30Days } from '../dashboard/dashboard';
import { shopify } from '~/modules/shopify.server';
import React, { useMemo, useState } from 'react';
import { useLoaderData } from '@remix-run/react';
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
  const session = await shopify.authenticate.admin(request);

  return { shop: session.session.shop.replace('.myshopify.com', '') };
}

const Order = () => {
  const defaultActiveDates = useMemo(() => default30Days(), []);
  const [activeDates, setActiveDates] = useState<IActiveDates>(defaultActiveDates);
  const data = useLoaderData<typeof loader>();

  return (
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
  );
};

export default Order;
