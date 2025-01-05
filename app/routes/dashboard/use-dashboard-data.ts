import { PaginatedQuery, useQueryPaginated } from '~/hooks/use-query-paginated';
import { Query, useQuery } from '~/hooks/use-query';
import { useMemo } from 'react';

export function useDashboardData(
  startDate: string,
  endDate: string,
  storeId: string
) {
  const lineDataQuery = useMemo(
    () =>
      ({
        // by: ['orderDate'],
        // _sum: { orderAmount: true, refundAmount: true },
        where: {
          AND: [
            {
              storeId: { equals: storeId },
            },
            { hasPackageProtection: { equals: true } },
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
      } satisfies PaginatedQuery<'packageProtectionOrder', 'findMany'>),
    [endDate, startDate, storeId]
  );

  const pieQuery = useMemo(
    () =>
      ({
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
      } satisfies PaginatedQuery<'packageProtectionClaimOrder', 'findMany'>),
    [startDate, endDate, storeId]
  );

  const totalQuery = useMemo(
    () => ({
      _sum: {
        refundAmount: true,
        orderAmount: true,
        protectionFee: true,
      },
      _count: { id: true },
      where: {
        AND: [
          { storeId: { equals: storeId } },
          { hasPackageProtection: { equals: true } },
          {
            orderDate: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
    } satisfies Query<'packageProtectionOrder', 'aggregate'>),
    [endDate, startDate, storeId]
  );
  const notClaimedQuery = useMemo(
    () => ({
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
    } satisfies Query<'packageProtectionOrder', 'count'>),
    [endDate, startDate, storeId]
  );
  const totalPackageProtectionQuery = useMemo(
    () => ({
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
    () => ({
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
    'packageProtectionOrder',
    'count',
    totalNonPackageProtectionQuery,
    true
  );

  const totalPackageProtectionSubscription = useQuery(
    'packageProtectionOrder',
    'count',
    totalPackageProtectionQuery,
    true
  );
  const lineDataSubscription = useQueryPaginated('packageProtectionOrder', 'findMany', lineDataQuery);
  const notClaimedSubscription = useQuery('packageProtectionOrder', 'count', notClaimedQuery, true);
  const totalSubscription = useQuery('packageProtectionOrder', 'aggregate', totalQuery, true);
  const pie = useQuery('packageProtectionClaimOrder', 'findMany', pieQuery, true);

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
