import { useQueryPaginated } from '~/hooks/use-query-paginated';
import { queryProxy } from '~/modules/query/query-proxy';
import { useQuery } from '~/hooks/use-query';
import { useMemo } from 'react';

export function useDashboardData(startDate: string, endDate: string) {
  const pieDataQuery = useMemo(
    () =>
      queryProxy.packageProtectionClaimOrder.groupBy({
        where: {
          packageProtectionOrder: {
            orderDate: {
              gte: startDate,
              lte: endDate,
            },
          },
          // AND: [
          //   {
          //     createdAt: {
          //       gte: startDate,
          //       lte: endDate,
          //     },
          //   },
          // ],
        },
        by: 'issue',
        _count: { id: true },
        orderBy: {
          issue: 'asc',
        },
      }),
    [endDate, startDate]
  );
  const lineDataQuery = useMemo(
    () =>
      queryProxy.packageProtectionOrder.subscribeGroupBy({
        by: ['orderDate'],
        _sum: { orderAmount: true, refundAmount: true },
        where: {
          orderDate: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: {
          orderDate: 'desc', // Order by date ascending
        },
      }),
    [endDate, startDate]
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
          orderDate: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
    [endDate, startDate]
  );
  const notClaimedQuery = useMemo(
    () =>
      queryProxy.packageProtectionOrder.subscribeCount({
        where: {
          AND: [
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
    [endDate, startDate]
  );
  const totalPackageProtectionQuery = useMemo(
    () =>
      queryProxy.packageProtectionOrder.subscribeCount({
        where: {
          AND: [
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
    [endDate, startDate]
  );
  const totalNonPackageProtectionQuery = useMemo(
    () =>
      queryProxy.packageProtectionOrder.subscribeCount({
        where: {
          AND: [
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
    [endDate, startDate]
  );
  const totalNonPackageProtectionSubscription = useQuery(
    totalNonPackageProtectionQuery
  );

  const totalPackageProtectionSubscription = useQuery(
    totalPackageProtectionQuery
  );
  const lineDataSubscription = useQueryPaginated(lineDataQuery);
  const pieDataSubscription = useQueryPaginated(pieDataQuery);
  const notClaimedSubscription = useQuery(notClaimedQuery);
  const totalSubscription = useQuery(totalQuery);

  const lineData = useMemo(
    () =>
      lineDataSubscription.data
        ?.map((e) => {
          if (
            (Number(e._sum.orderAmount) === 0 || e._sum.orderAmount) &&
            (Number(e._sum.refundAmount) === 0 || e._sum.refundAmount)
          ) {
            return {
              value: (
                Number(e?._sum?.orderAmount) - Number(e._sum.refundAmount)
              ).toFixed(2),
              key: e.orderDate,
            };
          }

          return null;
        })
        .filter(Boolean),
    [lineDataSubscription.data]
  );

  const loading =
    lineDataSubscription.loading ||
    pieDataSubscription.loading ||
    notClaimedSubscription.loading ||
    totalPackageProtectionSubscription.loading ||
    totalNonPackageProtectionSubscription.loading ||
    totalSubscription.loading;

  return {
    lineData,
    loading,
    notClaimed: notClaimedSubscription.data,
    pieData: pieDataSubscription.data,
    totalPackageProtect: totalPackageProtectionSubscription.data,
    totalNonPackageProtect: totalNonPackageProtectionSubscription.data,
    total: totalSubscription.data,
  };
}
