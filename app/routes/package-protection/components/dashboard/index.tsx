import {
  AppProvider,
  Banner,
  Box,
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  LegacyCard,
  Link,
  SkeletonBodyText,
  SkeletonDisplayText,
  Text,
  TextContainer,
  Tooltip,
} from '@shopify/polaris';
import {
  AlertCircleIcon,
  AlertDiamondIcon,
  ChevronRightIcon,
  FaviconIcon,
} from '@shopify/polaris-icons';
import DateRangePicker from './date-range';
import '@shopify/polaris/build/esm/styles.css';
import '@shopify/polaris-viz/build/esm/styles.css';
import LineChartForDashboard from './line-chart';
import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '@shopify/react-i18n';
import { IActiveDates } from '../order';
import PieChart from './pie-chart';
import { useQuery } from '~/hooks/use-query';
import { queryProxy } from '~/modules/query/query-proxy';
import Tutorial from '../tutorial';
import DashboardLoading from './dashboard-loading';
import { useQueryPaginated } from '~/hooks/use-query-paginated';

const Dashboard = () => {
  const [i18n] = useI18n();
  const [activeDates, setActiveDates] = useState<IActiveDates>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

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

  const getData = async () => {
    if (startDate === endDate && activeDates?.alias !== 'Today') return;
    setLoading(true);
    // const session=findOfflineSession()
    await fetch(`/get-order-data?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };
  useEffect(() => {
    getData();
  }, [activeDates]);

  const conversionRate = isNaN((data?.claimed / data?.totals.id) * 100)
    ? 0
    : ((data?.claimed / data?.totals?.id) * 100).toFixed(2);

  const roi =
    ((data?.sum.protectionFee - data?.sum.refundAmount) / 12.99) * // need to dynamically calculate 12.99
      100 || 0;

  // const y = useMemo(() => {
  //   if (startDate === endDate && activeDates?.alias !== 'Today') return;
  //   return queryProxy.packageProtectionOrder.subscribeAggregate({
  //     _sum: {
  //       refundAmount: true,
  //       orderAmount: true,
  //       protectionFee: true,
  //     },
  //     _count: { id: true },
  //     where: {
  //       AND: [
  //         {
  //           createdAt: {
  //             gte: startDate,
  //             lte: endDate,
  //           },
  //         },
  //       ],
  //     },
  //   });
  // }, []);

  console.log('---', data);

  console.count('render');

  let renderElement: React.ReactNode = null;
  if (loading) {
    renderElement = <DashboardLoading />;
  } else {
    renderElement = (
      <>
        <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap:4">
            <div className="col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 gap-y-4 ">
                <div className="col-span-1">
                  <Card roundedAbove="sm">
                    <div className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <Text as="span">Total Insurance Order</Text>
                        <Tooltip content="Total Insured orders">
                          <Icon source={AlertCircleIcon} tone="info" />
                        </Tooltip>
                      </div>
                      <span className="font-semibold text-2xl mt-2">
                        {data?.totals.id}
                      </span>
                    </div>
                  </Card>

                  {/* <Card>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText lines={2} />
        </Card> */}
                </div>

                <div className="col-span-1">
                  <Card roundedAbove="sm">
                    <div className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <Text as="span">Total Revenue</Text>
                        <Tooltip content="Total Revenue = Total Insurance Sale - Insurance Order Refund">
                          <Icon source={AlertCircleIcon} tone="info" />
                        </Tooltip>
                      </div>
                      <span className="font-semibold text-2xl mt-7">
                        {i18n.formatCurrency(
                          data?.sum.orderAmount - data?.sum.refundAmount
                        )}
                      </span>
                    </div>
                  </Card>
                </div>
                <div className=" col-span-1">
                  <Card roundedAbove="sm">
                    <div className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <Text as="span">Total Insurance Earning</Text>
                        <Tooltip content="Total Insurance Earnings">
                          <Icon source={AlertCircleIcon} tone="info" />
                        </Tooltip>
                      </div>

                      <span className="font-semibold text-2xl mt-2">
                        {i18n.formatCurrency(data?.sum.protectionFee)}
                      </span>
                    </div>
                  </Card>
                </div>
                <div className="col-span-1">
                  <Card roundedAbove="sm">
                    <div className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <Text as="span">Insurance Order Refund</Text>
                        <Tooltip content="Total Insured orders refund">
                          <Icon source={AlertCircleIcon} tone="info" />
                        </Tooltip>
                      </div>
                      <span className="font-semibold text-2xl mt-2">
                        {i18n.formatCurrency(data?.sum.refundAmount)}
                      </span>
                    </div>
                  </Card>
                </div>
                <div className="col-span-1">
                  <Card roundedAbove="sm">
                    <div className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <Text as="span">Conversion Rate</Text>
                        {/* <Tooltip content="Total Claimed / Total Order * 100"> */}
                        <Tooltip
                          content={
                            <p>
                              Conversion Rate =
                              {/* <math>
                      <mfrac>
                        <mrow>
                          <mi>Total Orders with Protection</mi>
                        </mrow>
                        <mrow>
                          <mi>Total Orders</mi>
                        </mrow>
                      </mfrac>
                    </math> */}
                              &times; 100%
                            </p>
                          }
                        >
                          <Icon source={AlertCircleIcon} tone="info" />
                        </Tooltip>
                      </div>

                      <span className="font-semibold text-2xl mt-7">
                        {conversionRate}%
                      </span>
                    </div>
                  </Card>
                </div>
                <div className=" col-span-1">
                  <Card roundedAbove="sm">
                    <div className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <Text as="span">Total ROI</Text>{' '}
                        <Tooltip content="(Insurance Amount - Refound Amount) / Refound Amount * 100">
                          <Icon source={AlertCircleIcon} tone="info" />
                        </Tooltip>
                      </div>
                      <span className="font-semibold text-2xl mt-7">
                        {roi.toFixed(2)}%
                      </span>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="bg-white rounded-lg shadow-sm h-full p-4 bg-vector-img">
                <div className=" flex items-center justify-center h-full">
                  <div className="text-center">
                    <span className="font-bold text-6xl text-center">
                      {data?.notProcess}
                    </span>{' '}
                    <br />
                    <span className="font-semibold text-2xl text-center leading-5 mb-2">
                      Claim that need resolution
                    </span>
                    <br />
                    <div className="mt-3">
                      <Link url="?tab=claim-request">
                        <Button>View Claim</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>

        <div className="grid grid-cols-2 gap-4">
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
              <LineChartForDashboard
                lineData={data?.lineData}
                date={{ startDate, endDate }}
              />
            </Card>
          </Box>
        </div>
      </>
    );
  }
  return (
    <Layout.Section variant="fullWidth">
      <div className="w-full ">
        <Banner
          title="Package protection isn't showing up on your store yet"
          onDismiss={() => {}}
          icon={AlertDiamondIcon}
          tone="warning"
        >
          <p>
            You activated an app but still need to enable Package protection in
            the Shopify Theme Editor to complete the installation.
          </p>
          <br />
          <div>
            <Button>Enable Package protection</Button>{' '}
            <Button>Check instructions</Button>
          </div>
        </Banner>
      </div>
      <Box paddingBlockStart={'300'} paddingBlockEnd={'300'}>
        <Divider borderColor="border" />
      </Box>
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
              Insurance will be fully customized by you, Insurance is a digital
              product, and route premiums to yourself.
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
              from your app list, and remove insurance from product list, that's
              all.
            </Text>
          </div>
        </Card>
      </Box>
      <Tutorial />
    </Layout.Section>
  );
};

export default Dashboard;
