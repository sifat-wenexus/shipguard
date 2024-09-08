import { Box, Layout, Page, Text } from '@shopify/polaris';
import DateRangePicker from '../dashboard/date-range';
import { default30Days } from '../dashboard';
import OrderList from './order-list';
import { useState } from 'react';

export interface IActiveDates {
  title: string;
  alias: string;
  period: {
    since: Date | string;
    until: Date | string;
  };
}

const Order = () => {
  const [activeDates, setActiveDates] = useState<IActiveDates>(default30Days);
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
            <OrderList activeDates={activeDates!} />
          </div>
        </Layout>
      </Page>
    </div>
  );
};

export default Order;
