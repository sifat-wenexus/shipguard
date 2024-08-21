import { useState } from 'react';
import { IActiveDates } from '../order';
import { Box, Icon, Layout } from '@shopify/polaris';
import DateRangePicker from '../dashboard/date-range';
import ClaimOrderList from './claim-order-list';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { CaretUpIcon } from '@shopify/polaris-icons';
import ClaimRequestProcess from './calim-request-process';
import Tutorial from '../tutorial';

const FileClaimRequest = () => {
  const [activeDates, setActiveDates] = useState<IActiveDates>();
  const [isProcess, setIsProcess] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  return (
    <>
      {isProcess ? (
        <ClaimRequestProcess setIsProcess={setIsProcess} orderId={orderId} />
      ) : (
        <div className="w-full ms-4">
          <Box paddingBlockEnd={'400'}>
            <DateRangePicker setActiveDates={setActiveDates} />
          </Box>
          <ClaimOrderList
            activeDates={activeDates!}
            setIsProcess={setIsProcess}
            setOrderId={setOrderId}
          />
        </div>
      )}
      <br />
      <div className="ml-4">
        <Tutorial />
      </div>
    </>
  );
};

export default FileClaimRequest;
