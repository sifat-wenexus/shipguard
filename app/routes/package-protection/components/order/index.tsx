import { Box } from '@shopify/polaris';
import DateRangePicker from '../dashboard/date-range';
import OrderList from './order-list';
import { useState } from 'react';

export interface IActiveDates {
  title: string;
  alias: string;
  period: {
    since: Date;
    until: Date;
  };
}

const Order = () => {
  const [activeDates, setActiveDates] = useState<IActiveDates>();
  return (
    <div className="w-full ms-4">
      <Box paddingBlockEnd={'400'}>
        <DateRangePicker setActiveDates={setActiveDates} />
      </Box>
      <OrderList activeDates={activeDates!} />
    </div>
  );
};

export default Order;
