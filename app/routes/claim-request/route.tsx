import { Box, Button, Icon, Layout, Page, Text } from '@shopify/polaris';
import ClaimRequestProcess from './calim-request-process';
import DateRangePicker from '../dashboard/date-range';
import ClaimOrderList from './claim-order-list';
import type { IActiveDates } from '../order/route';
import { default30Days } from '../dashboard/dashboard';
import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { shopify as shopifyRemix } from '../../modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { useLoaderData } from '@remix-run/react';
import { ExportIcon } from '@shopify/polaris-icons';

export const loader: LoaderFunction = async ({ request }) => {
  const ctx = await shopifyRemix.authenticate.admin(request);
  const data = await prisma.packageProtectionOrder.findMany({
    where: { orderId: ctx.session.storeId, hasClaimRequest: true },
    select: {
      id: true,
      orderId: true,
      orderName: true,
      orderAmount: true,
      protectionFee: true,
      claimStatus: true,
    },
  });

  if (!data || !data.length) {
    return json([{ message: 'data not found', shop: ctx.session.shop.replace('.myshopify.com', '') }]);
  }

  return json({
    data,
    shop: ctx.session.shop.replace('.myshopify.com', ''),
  });
};

const FileClaimRequest = () => {
  const loaderData = useLoaderData<typeof loader>();
  const defaultActiveDates = useMemo(() => default30Days(), []);
  const [activeDates, setActiveDates] =
    useState<IActiveDates>(defaultActiveDates);
  const [isProcess, setIsProcess] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  const handleExport = () => {
    console.log('export', loaderData);
    // return;
    const wb = XLSX.utils.book_new();

    // Convert JSON data to a worksheet
    const ws = XLSX.utils.json_to_sheet(loaderData.data);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate and download the Excel file
    XLSX.writeFile(wb, 'data.xlsx');
  };

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
                <div className="flex justify-between">
                  <DateRangePicker setActiveDates={setActiveDates} />
                  <Button
                    variant="primary"
                    tone="success"
                    onClick={handleExport}
                    icon={<Icon source={ExportIcon} />}
                  >
                    Export
                  </Button>
                </div>
              </Box>
              <ClaimOrderList
                setIsProcess={setIsProcess}
                activeDates={activeDates!}
                setOrderId={setOrderId}
                shop={loaderData.shop}
              />
            </div>
          )}
          {/*<br />*/}
          {/*<div className="my-4 ml-4">*/}
          {/*  <Tutorial />*/}
          {/*</div>*/}
        </Layout>
      </Page>
    </div>
  );
};

export default FileClaimRequest;
