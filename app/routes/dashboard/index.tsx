import { AlertCircleIcon, ChevronRightIcon } from '@shopify/polaris-icons';
import { useLivePageData } from '~/hooks/use-live-page-data';
import WarningBanner from '~/components/warning-banner';
import DashboardLoading from './dashboard-loading';
import '@shopify/polaris-viz/build/esm/styles.css';
import LineChartForDashboard from './line-chart';
import '@shopify/polaris/build/esm/styles.css';
import { IActiveDates } from '../order/route';
import { useI18n } from '@shopify/react-i18n';
import { useEffect, useState } from 'react';
import DateRangePicker from './date-range';
import GuideLine from './guideline';
import PieChart from './pie-chart';
import {
  Box,
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  Link,
  Text,
  Tooltip,
} from '@shopify/polaris';

export const default30Days = {
  title: 'Last 30 days',
  alias: 'last30days',
  period: {
    since: '2024-08-07T18:00:00.000Z',
    until: '2024-09-06T18:00:00.000Z',
  },
};

const Dashboard = ({ guidelineVisibility }) => {
  const [i18n] = useI18n();
  const [activeDates, setActiveDates] = useState<IActiveDates>(default30Days);
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

  const { storeInfo, loading: apiLoading } = useLivePageData();
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

  const conversionRate = isNaN((data?.claimed / data?.totals) * 100)
    ? 0
    : ((data?.claimed / data?.totals) * 100).toFixed(2);

  const roi =
    ((data?.sum.protectionFee - data?.sum.refundAmount) / 12.99) * // need to dynamically calculate 12.99
      100 || 0;

  // const totals1 = useMemo(() => {
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
  // console.log({ totals1 });

  let renderElement: React.ReactNode = null;
  if (loading) {
    renderElement = <DashboardLoading />;
  } else {
    renderElement = (
      <>
        <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap:4">
            <div className="col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 gap-y-4 ">
                <div className="col-span-1 h-full">
                  <div className="border rounded-lg bg-white shadow-sm p-4 h-full">
                    <div className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <Text as="span">Total Insurance Order</Text>
                      </div>
                      <span className="font-semibold text-2xl mt-2">
                        {data?.totals ?? 0}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="border rounded-lg bg-white shadow-sm p-4 h-full">
                    <div className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <Text as="span">Total Revenue</Text>
                        <Tooltip content="Total Revenue = Total Insurance Sale - Insurance Order Refund">
                          <Icon source={AlertCircleIcon} tone="info" />
                        </Tooltip>
                      </div>
                      <span className="font-semibold text-2xl mt-7">
                        {i18n.formatCurrency(
                          isNaN(data?.sum.orderAmount - data?.sum.refundAmount)
                            ? 0
                            : data?.sum.orderAmount - data?.sum.refundAmount
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" col-span-1">
                  <div className="border rounded-lg bg-white shadow-sm p-4 h-full">
                    <div className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <Text as="span">Total Insurance Earning</Text>
                      </div>

                      <span className="font-semibold text-2xl mt-2">
                        {i18n.formatCurrency(
                          isNaN(data?.sum.protectionFee)
                            ? 0
                            : data?.sum.protectionFee
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="border rounded-lg bg-white shadow-sm p-4 h-full">
                    <div className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <Text as="span">Insurance Order Refund</Text>
                      </div>
                      <span className="font-semibold text-2xl mt-2">
                        {i18n.formatCurrency(
                          isNaN(data?.sum.refundAmount)
                            ? 0
                            : data?.sum.refundAmount
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="border rounded-lg bg-white shadow-sm p-4 h-full">
                    <div className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <Text as="span">Conversion Rate</Text>
                        {/* <Tooltip content="Total Claimed / Total Order * 100"> */}
                        <Tooltip
                          width="wide"
                          content={
                            <p
                              dangerouslySetInnerHTML={{
                                __html: ` <p class='' >
                                  <span class='text-xs'> Conversion Rate =</span>
                                    <math xmlns="" class="text-xl p-2 font-sans ">
                                      <mfrac>
                                        <mrow>
                                          <mi>Total Orders </mi>
                                        </mrow>
                                        <mrow>
                                          <mi>Total Claim</mi>
                                        </mrow>
                                      </mfrac>
                                    </math>
                                    &cross; <span class='text-xs'>100%</span>
                                  </p> `,
                              }}
                            ></p>
                          }
                        >
                          <Icon source={AlertCircleIcon} tone="info" />
                        </Tooltip>
                      </div>

                      <span className="font-semibold text-2xl mt-7">
                        {conversionRate}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" col-span-1">
                  <div className="border rounded-lg bg-white shadow-sm p-4 h-full">
                    <div className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <Text as="span">Total ROI</Text>{' '}
                      </div>
                      <span className="font-semibold text-2xl mt-7">
                        {roi.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="bg-white rounded-lg shadow-sm h-full p-4 bg-vector-img">
                <div className=" flex items-center justify-center h-full">
                  <div className="text-center">
                    <span className="font-bold text-6xl text-center">
                      {data?.notProcess ?? 0}
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
      <Layout.Section>
        <Text as="h1" variant="headingXl">
          Hi 👋, Welcome to Inhouse Shipping Protection
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
      </Layout.Section>
    </div>
  );
};

export default Dashboard;
