import { Box, Layout, Page, Text } from '@shopify/polaris';
import ClaimRequestProcess from './calim-request-process';
import Tutorial from '../settings.$/components/tutorial';
import DateRangePicker from '../dashboard/date-range';
import ClaimOrderList from './claim-order-list';
import { IActiveDates } from '../order/route';
import { default30Days } from '../dashboard/dashboard';
import { useState } from 'react';

const FileClaimRequest = () => {
  const [activeDates, setActiveDates] = useState<IActiveDates>(default30Days);
  const [isProcess, setIsProcess] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  return (
    <div className="m-4 sm:m-0 mt-10 sm:mt-4">
      <Page>
        <Layout>
          {isProcess ? (
            <ClaimRequestProcess
              setIsProcess={setIsProcess}
              orderId={orderId}
            />
          ) : (
            <div className="w-full ms-4">
              <Text as="h1" variant="headingLg" alignment="start">
                Claim Request
              </Text>
              <br />
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
          <div className="my-4 ml-4">
            <Tutorial />
          </div>
        </Layout>
      </Page>
    </div>
  );
};

export default FileClaimRequest;
