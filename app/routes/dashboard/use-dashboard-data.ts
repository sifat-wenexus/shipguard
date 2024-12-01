import { useQueryPaginated } from '~/hooks/use-query-paginated';
import { queryProxy } from '~/modules/query/query-proxy';
import { useQuery } from '~/hooks/use-query';
import { useMemo } from 'react';

export function useDashboardData(
  startDate: string,
  endDate: string,
  storeId: string
) {
  const lineDataQuery = useMemo(
    () =>
      queryProxy.packageProtectionOrder.findMany({
        // by: ['orderDate'],
        // _sum: { orderAmount: true, refundAmount: true },
        where: {
          AND: [
            {
              storeId: { equals: storeId },
            },
            {
              orderDate: {
                gte: startDate,
                lte: endDate,
              },
            },
          ],
        },
        orderBy: {
          orderDate: 'desc', // Order by date ascending
        },
      }),
    [endDate, startDate, storeId]
  );

  const pieQuery = useMemo(
    () =>
      queryProxy.packageProtectionClaimOrder.findMany({
        where: {
          AND: [
            { storeId: { equals: storeId } },
            {
              packageProtectionOrder: {
                orderDate: {
                  gte: startDate,
                  lte: endDate,
                },
              },
            },
          ],
        },
        distinct: ['fulfillmentId'],
      }),
    [startDate, endDate, storeId]
  );

  const totalQuery = useMemo(
    () =>
      queryProxy.packageProtectionOrder.subscribeAggregate({
        _sum: {
          refundAmount: true,
          orderAmount: true,
          protectionFee: true,
        },
        _count: { id: true },
        where: {
          //hasPackageProtection: { equals: true },
          AND: [
            { storeId: { equals: storeId } },
            {
              orderDate: {
                gte: startDate,
                lte: endDate,
              },
            },
          ],
        },
      }),
    [endDate, startDate, storeId]
  );
  const notClaimedQuery = useMemo(
    () =>
      queryProxy.packageProtectionOrder.subscribeCount({
        where: {
          AND: [
            { storeId: { equals: storeId } },
            {
              AND: [
                { hasClaimRequest: true },
                { claimStatus: { in: ['REQUESTED', 'INPROGRESS'] } },
              ],
            },
            {
              orderDate: {
                gte: startDate,
                lte: endDate,
              },
            },
          ],
        },
      }),
    [endDate, startDate, storeId]
  );
  const totalPackageProtectionQuery = useMemo(
    () =>
      queryProxy.packageProtectionOrder.subscribeCount({
        where: {
          AND: [
            { storeId: { equals: storeId } },
            { hasPackageProtection: true },
            {
              orderDate: {
                gte: startDate,
                lte: endDate,
              },
            },
          ],
        },
      }),
    [endDate, startDate, storeId]
  );
  const totalNonPackageProtectionQuery = useMemo(
    () =>
      queryProxy.packageProtectionOrder.subscribeCount({
        where: {
          AND: [
            { storeId: { equals: storeId } },
            { hasPackageProtection: false },
            {
              orderDate: {
                gte: startDate,
                lte: endDate,
              },
            },
          ],
        },
      }),
    [endDate, startDate, storeId]
  );
  const totalNonPackageProtectionSubscription = useQuery(
    totalNonPackageProtectionQuery
  );

  const totalPackageProtectionSubscription = useQuery(
    totalPackageProtectionQuery
  );
  const lineDataSubscription = useQueryPaginated(lineDataQuery);
  const notClaimedSubscription = useQuery(notClaimedQuery);
  const totalSubscription = useQuery(totalQuery);
  const pie = useQuery(pieQuery);

  const groupByDate = (data) => {
    return data?.reduce((acc: Record<string, number>, item) => {
      // Extract date and calculate net amount
      const date = new Date(item.orderDate).toISOString().split('T')[0]; // Extract only the date part
      const netAmount =
        parseFloat(item.orderAmount) - parseFloat(item.refundAmount);

      // Group by date and sum the net amounts
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += netAmount;

      return acc;
    }, {});
  };

  const lineData = useMemo(() => {
    if (lineDataSubscription.data) {
      const groupedTotals = groupByDate(lineDataSubscription.data);
      const result: { key: string; value: string }[] = Object.entries(
        groupedTotals
      ).map(([date, total]: any) => ({
        key: date,
        value: total.toFixed(2),
      }));
      return result;
    }
  }, [lineDataSubscription.data]);

  const groupPieData = (data) => {
    return data.reduce((acc, curr) => {
      const issue = curr.issue.toLowerCase(); // Normalize case
      acc[issue] = (acc[issue] || 0) + 1;
      return acc;
    }, {});
  };

  const pieData = useMemo(() => {
    if (pie.data) {
      const grouped = groupPieData(pie.data);
      return Object.entries(grouped).map(([key, value]) => ({
        name: key?.charAt(0).toUpperCase() + key.slice(1), // Capitalize the issue name
        data: [
          {
            key: 'total',
            value: value,
          },
        ],
      }));
    } else {
      return [];
    }
  }, [pie]);

  const loading =
    lineDataSubscription.loading ||
    pie.loading ||
    notClaimedSubscription.loading ||
    totalPackageProtectionSubscription.loading ||
    totalNonPackageProtectionSubscription.loading ||
    totalSubscription.loading;

  return {
    loading,
    pieData,
    lineData,
    total: totalSubscription.data,
    notClaimed: notClaimedSubscription.data,
    totalPackageProtect: totalPackageProtectionSubscription.data,
    totalNonPackageProtect: totalNonPackageProtectionSubscription.data,
  };
}
