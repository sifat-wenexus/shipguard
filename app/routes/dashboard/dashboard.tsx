import { AlertCircleIcon, ChevronRightIcon } from '@shopify/polaris-icons';
import { useDashboardData } from '~/routes/dashboard/use-dashboard-data';
import { useLivePageData } from '~/hooks/use-live-page-data';
import WarningBanner from '~/components/warning-banner';
import DashboardLoading from './dashboard-loading';
import '@shopify/polaris-viz/build/esm/styles.css';
import type { IActiveDates } from '../order/route';
import LineChartForDashboard from './line-chart';
import React, { useMemo, useState } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import { useI18n } from '@shopify/react-i18n';
import DateRangePicker from './date-range';
import GuideLine from './guideline';
import PieChart from './pie-chart';

import {
  Tooltip,
  Divider,
  Button,
  Card,
  Icon,
  Link,
  Text,
  Box,
} from '@shopify/polaris';

export const default30Days = () => {
  const till = new Date();
  const since = new Date();

  since.setDate(till.getDate() - 30);

  return {
    title: 'Last 30 days',
    alias: 'last30days',
    period: {
      since: since.toISOString(),
      until: till.toISOString(),
    },
  };
};

const Dashboard = ({ guidelineVisibility }) => {
  const defaultActiveDates = useMemo(() => default30Days(), []);

  const [activeDates, setActiveDates] =
    useState<IActiveDates>(defaultActiveDates);
  const [i18n] = useI18n();

  const { period } = activeDates || {};
  const startDate = period
    ? new Date(period?.since).toISOString() //.split('T')[0]
    : new Date().toISOString(); //.split('T')[0];
  const endDate = period
    ? new Date(
        new Date(period?.until).setDate(new Date(period.until).getDate() + 1)
      ).toISOString()
    : //.split('T')[0]
      new Date().toISOString(); //.split('T')[0];
  // let startPoint = 0;

  const { storeInfo } = useLivePageData();
  const data = useDashboardData(startDate, endDate, storeInfo?.storeId);

  let renderElement: React.ReactNode = null;

  const conversionRate = useMemo(() => {
    if (data.loading) {
      return 0;
    }

    return (
      ((data.totalPackageProtect || 0) / (data.total?._count.id || 0)) *
      100
    ).toFixed(2);
  }, [data.totalPackageProtect, data.loading, data.total]);
  const roi = useMemo(() => {
    if (data.loading) {
      return 0;
    }
  }, [data.loading]);

  if (data.loading) {
    renderElement = <DashboardLoading />;
  } else {
    const dashboardCartItems: {
      title: string;
      value: number | string;
      tooltip?: string | React.ReactNode;
    }[] = [
      // TODO: get all order filter [channel= online store and sku= wenexus-shipping-protection] to get actual order
      {
        title: 'Total Non-Protected Order',
        value: data.totalNonPackageProtect ?? 0,
      },
      {
        title: 'Total Protected Insurance Order',
        value: data.totalPackageProtect ?? 0,
      },
      {
        title: 'Total Revenue',
        tooltip:
          'Total Revenue = Total Insurance Sale - Insurance Order Refund',
        value: i18n.formatCurrency(
          isNaN(
            +data.total!._sum.orderAmount! - +data.total!._sum.refundAmount!
          )
            ? 0
            : +data.total!._sum.orderAmount! - +data.total!._sum.refundAmount!
        ),
      },
      {
        title: 'Total Insurance Earning',
        value: i18n.formatCurrency(
          isNaN(+data.total!._sum.protectionFee!)
            ? 0
            : +data.total!._sum.protectionFee!
        ),
      },
      {
        title: 'Insurance Order Refund',
        value: i18n.formatCurrency(
          isNaN(+data.total!._sum.refundAmount!)
            ? 0
            : +data.total!._sum.refundAmount!
        ),
      },
      {
        title: 'Conversion Rate',
        value: `${isNaN(+conversionRate) ? 0 : conversionRate}%`,
        tooltip: (
          <p
            dangerouslySetInnerHTML={{
              __html: ` <p class='' >
          <span class='text-xs'> Conversion Rate =</span>
            <math xmlns="" class="text-xl p-2 font-sans ">
              <mfrac>
                <mrow>
                  <mi>Total Protected Order</mi>
                </mrow>
                <mrow>
                  <mi>Total Order</mi>
                </mrow>
              </mfrac>
            </math>
            &cross; <span class='text-xs'>100</span>
            <p><b>Explanation:</b> This indicate how often customers are opting fot package protection out of all orders placed.</p>
          </p> `,
            }}
          ></p>
        ),
      },
    ];

    renderElement = (
      <>
        <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap:4">
            <div className="col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 gap-y-4 ">
                {dashboardCartItems.map((e, i) => (
                  <div className="col-span-1 h-full" key={i}>
                    <div
                      className={`border rounded-lg bg-white shadow-sm p-4 h-full`}
                    >
                      <div className="flex flex-col items-start justify-between h-full">
                        <div className="flex justify-between w-full ">
                          <Text as="span">{e.title}</Text>
                          {e?.tooltip && (
                            <Tooltip content={e.tooltip} width="wide">
                              <Icon source={AlertCircleIcon} tone="info" />
                            </Tooltip>
                          )}
                        </div>
                        <span
                          className={`font-semibold text-2xl  ${
                            i === 1
                              ? 'text-green-600'
                              : i === 0
                              ? 'text-red-300'
                              : 'text-gray-700'
                          }`}
                        >
                          {e.value}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2">
              <div className="bg-white rounded-lg shadow-sm h-full p-4 bg-vector-img">
                <div className=" flex items-center justify-center h-full">
                  <div className="text-center">
                    <span className="font-bold text-6xl text-center">
                      {data.notClaimed ?? 0}
                    </span>{' '}
                    <br />
                    <span className="font-semibold text-2xl text-center leading-5 mb-2">
                      Claim that need resolution
                    </span>
                    <br />
                    <div className="mt-3">
                      <Link url="/claim-request">
                        <Button>View Claim</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
            <Card roundedAbove="sm">
              <Text
                variant="headingLg"
                fontWeight="medium"
                alignment="center"
                as="h4"
              >
                Claim Overview
              </Text>
              <br />
              <Divider></Divider>
              <PieChart pieData={data?.pieData} />
            </Card>
          </Box>

          <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
            <Card roundedAbove="sm">
              <Text
                variant="headingLg"
                fontWeight="medium"
                as="h4"
                alignment="center"
              >
                Revenue Overview
              </Text>
              <LineChartForDashboard lineData={data?.lineData} />
            </Card>
          </Box>
        </div>
      </>
    );
  }
  return (
    <div className="m-2 sm:m-0 dashboard">
      <>
        <Text as="h1" variant="headingXl">
          Hi 👋, Welcome to Overall: Shipping Protection
        </Text>
        <br />
        {<WarningBanner storeInfo={storeInfo} />}

        {
          <GuideLine
            storeInfo={storeInfo}
            guidelineVisibility={guidelineVisibility}
          />
        }
        <br />
        <DateRangePicker setActiveDates={setActiveDates} />

        {renderElement}

        <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
          <Card roundedAbove="sm">
            <div className="flex justify-between">
              <Tooltip content="Frequently asked questions.">
                <Text variant="headingLg" fontWeight="medium" as="h4">
                  FAQ
                </Text>
              </Tooltip>
              <Link target="_blank" url="#" removeUnderline>
                <div className="flex">
                  Learn More
                  {<Icon source={ChevronRightIcon} />}
                </div>
              </Link>
            </div>
            <br />

            <div className="mb-4">
              <h3 className="pb-1">
                <Text fontWeight="medium" as="span">
                  How insurance works?
                </Text>
              </h3>
              <Text as="p">
                Insurance will be fully customized by you, Insurance is a
                digital product, and route premiums to yourself.
              </Text>
            </div>
            <div className="mb-4">
              <h3 className="pb-1">
                <Text fontWeight="medium" as="span">
                  Uninstall app
                </Text>
              </h3>
              <Text as="p">
                App won't add any codes to your store theme, so just remove it
                from your app list, and remove insurance from product list,
                that's all.
              </Text>
            </div>
          </Card>
        </Box>
        {/* <Tutorial /> */}
      </>
    </div>
  );
};

export default Dashboard;
