import { Box, Button, Icon, Layout, Page, Text } from '@shopify/polaris';
import { shopify as shopifyRemix } from '../../modules/shopify.server';
import ClaimRequestProcess from './calim-request-process';
import { default30Days } from '../dashboard/dashboard';
import DateRangePicker from '../dashboard/date-range';
import { PageShell } from '~/components/page-shell';
import { ArrowLeftIcon, ExportIcon } from '@shopify/polaris-icons';
import type { IActiveDates } from '../order/route';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { prisma } from '~/modules/prisma.server';
import ClaimOrderList from './claim-order-list';
import { useMemo, useState } from 'react';
import { json } from '@remix-run/node';
import * as XLSX from 'xlsx';

export const loader = async ({ request }) => {
  const ctx = await shopifyRemix.authenticate.admin(request);
  const data = await prisma.packageProtectionOrder.findMany({
    where: { storeId: ctx.session.storeId, hasClaimRequest: { equals: true } },
    select: {
      orderName: true,
      customerFirstName: true,
      customerLastName: true,
      customerEmail: true,
      orderAmount: true,
      protectionFee: true,
      refundAmount: true,
      claimStatus: true,
      fulfillmentStatus: true,
      createdAt: true,
      claimDate: true,
    },
  });
  const store = await prisma.store.findUniqueOrThrow({
    where: { id: ctx.session.storeId },
    select: { currencyCode: true },
  });

  if (!data || !data.length) {
    return json({
      data: {
        data: null,
        currencyCode: store.currencyCode,
      },
      message: 'data not found',
      shop: ctx.session.shop.replace('.myshopify.com', ''),
    });
  }

  return json({
    data: {
      data,
      currencyCode: store.currencyCode,
    },
    message: 'data found',
    shop: ctx.session.shop.replace('.myshopify.com', ''),
  });
};

const FileClaimRequest = () => {
  const {
    data: { data, currencyCode },
    shop,
  } = useLoaderData<typeof loader>();
  const defaultActiveDates = useMemo(() => default30Days(), []);
  const [activeDates, setActiveDates] =
    useState<IActiveDates>(defaultActiveDates);
  const [isProcess, setIsProcess] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const navigate = useNavigate();
  const handleExport = () => {
    // return;
    const wb = XLSX.utils.book_new();

    // Convert JSON data to a worksheet
    const ws = XLSX.utils.json_to_sheet(data as any);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate and download the Excel file
    XLSX.writeFile(wb, 'claim-request.xlsx');
  };

  return (
    <PageShell currencyCode={currencyCode}>
      <div className="m-4 sm:m-0 mt-10 sm:mt-4">
        <Page fullWidth >
          {/*title='Claim Request'  backAction={{ onAction: () => navigate(-1) }}*/}
          <div className="mb-4 flex items-center gap-4 mt-6">
            <Button
              icon={ArrowLeftIcon}
              onClick={() => navigate(-1)}
            ></Button>
            <Text as="h1" variant="headingLg">
              Claim Request
            </Text>
          </div>
          <Layout>
            {isProcess ? (
              <ClaimRequestProcess
                setIsProcess={setIsProcess}
                orderId={orderId}
                shop={shop}
              />
            ) : (
              <div className="w-full ms-4">
                {/*<Text as="h1" variant="headingLg" alignment="start">*/}
                {/*  Claim Request*/}
                {/*</Text>*/}
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
                  shop={shop}
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
    </PageShell>
  );
};

export default FileClaimRequest;
