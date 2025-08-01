import { Box, Button, Icon, Layout, Page, Text } from '@shopify/polaris';

import type { LoaderFunctionArgs } from '@remix-run/node';
import DateRangePicker from '../dashboard/date-range';
import { default30Days } from '../dashboard/dashboard';
import { PageShell } from '~/components/page-shell';
import { ArrowLeftIcon, ExportIcon } from '@shopify/polaris-icons';
import { shopify } from '~/modules/shopify.server';
import React, { useMemo, useState } from 'react';
import { prisma } from '~/modules/prisma.server';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { json } from '@remix-run/node';
import OrderList from './order-list';
import * as XLSX from 'xlsx';

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
  const data = await prisma.packageProtectionOrder.findMany({
    where: { storeId: session.storeId },
    select: {
      orderName: true,
      customerFirstName: true,
      customerLastName: true,
      customerEmail: true,
      orderAmount: true,
      protectionFee: true,
      refundAmount: true,
      hasClaimRequest: true,
      claimStatus: true,
      fulfillmentStatus: true,
      hasPackageProtection: true,
      createdAt: true,
      claimDate: true,
    },
  });
  if (!data || !data.length) {
    return json({
      data,
      message: 'data not found',
      shop: session.shop.replace('.myshopify.com', ''),
      currencyCode,
    });
  }
  return json({
    shop: session.shop.replace('.myshopify.com', ''),
    currencyCode,
    data,
  });
}

const Order = () => {
  const defaultActiveDates = useMemo(() => default30Days(), []);
  const [activeDates, setActiveDates] =
    useState<IActiveDates>(defaultActiveDates);
  const navigate = useNavigate();
  const { currencyCode, shop, data } = useLoaderData<typeof loader>();

  const xlsxData = useMemo(
    () =>
      data.map((order) => {
        const {
          hasPackageProtection,
          orderName,
          customerFirstName,
          customerLastName,
          customerEmail,
          orderAmount,
          protectionFee,
          refundAmount,
          hasClaimRequest,
          claimStatus,
          fulfillmentStatus,
          createdAt,
          claimDate,
        } = order;
        return {
          orderName,
          customerFirstName,
          customerLastName,
          customerEmail,
          orderAmount,
          protectionFee,
          refundAmount,
          orderStatus: hasPackageProtection ? 'Protected' : 'Non Protected',
          hasClaimRequest,
          fulfillmentStatus,
          claimStatus,
          createdAt,
          claimDate,
        };
      }),
    [data]
  );

  const handleExport = () => {
    // return;
    const wb = XLSX.utils.book_new();

    // Convert JSON data to a worksheet
    const ws = XLSX.utils.json_to_sheet(xlsxData as any);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate and download the Excel file
    XLSX.writeFile(wb, 'orders.xlsx');
  };

  return (
    <PageShell currencyCode={currencyCode}>
      <div className="m-4 sm:m-0 mt-10 sm:mt-4">
        {' '}
        <Page fullWidth>
          <Layout>
            <Layout.Section variant="fullWidth">
              <div className="mb-4 flex items-center gap-4 mt-6">
                <Button
                  icon={ArrowLeftIcon}
                  onClick={() => navigate(-1)}
                ></Button>
                <Text as="h1" variant="headingLg">
                  Order
                </Text>
              </div>
              {/*<div className="w-full ms-4">*/}
              {/*  /!* <MainNav /> *!/*/}
              {/*  /!*<Text as="h1" variant="headingLg" alignment="start">*!/*/}
              {/*  /!*  Order*!/*/}
              {/*  /!*</Text>*!/*/}
              {/*  <br />*/}
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
              <OrderList shop={shop} activeDates={activeDates!} />
              {/*</div>*/}
            </Layout.Section>
          </Layout>
        </Page>
      </div>
    </PageShell>
  );
};

export default Order;
