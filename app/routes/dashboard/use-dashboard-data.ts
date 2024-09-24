import { useQueryPaginated } from '~/hooks/use-query-paginated';
import { queryProxy } from '~/modules/query/query-proxy';
import { useQuery } from '~/hooks/use-query';
import { useMemo } from 'react';

export function useDashboardData(startDate: string, endDate: string) {
  const pieDataQuery = useMemo(() => queryProxy.packageProtectionClaimOrder.subscribeFindMany({
    where: {
      AND: [
        {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      ],
    },
  }), [endDate, startDate]);
  const lineDataQuery = useMemo(() => queryProxy.packageProtectionOrder.subscribeGroupBy({
    by: ['createdAt'],
    _sum: { orderAmount: true, refundAmount: true },
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      createdAt: 'desc', // Order by date ascending
    },
  }), [endDate, startDate]);
  const totalQuery = useMemo(() => queryProxy.packageProtectionOrder.subscribeAggregate({
    _sum: {
      refundAmount: true,
      orderAmount: true,
      protectionFee: true,
    },
    _count: { id: true },
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  }), [endDate, startDate]);
  const notClaimedQuery = useMemo(() => queryProxy.packageProtectionOrder.subscribeCount({
    where: {
      AND: [
        { hasClaimRequest: false },
        {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      ],
    },
  }), [endDate, startDate]);
  const claimedQuery = useMemo(() => queryProxy.packageProtectionOrder.subscribeCount({
    where: {
      AND: [
        { hasClaimRequest: true },
        {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      ],
    },
  }), [endDate, startDate]);

  const lineDataSubscription = useQueryPaginated(lineDataQuery);
  const pieDataSubscription = useQueryPaginated(pieDataQuery);
  const notClaimedSubscription = useQuery(notClaimedQuery);
  const claimedSubscription = useQuery(claimedQuery);
  const totalSubscription = useQuery(totalQuery);

  const lineData = useMemo(() => lineDataSubscription.data?.map((e) => {
    if (
      (e._sum.orderAmount === 0 || e._sum.orderAmount) &&
      (e._sum.refundAmount === 0 || e._sum.refundAmount)
    ) {
      return {
        value: (e?._sum?.orderAmount - e._sum.refundAmount).toFixed(2),
        key: e.createdAt,
      };
    }

    return null;
  }).filter(Boolean), [lineDataSubscription.data]);

  const loading = lineDataSubscription.loading || pieDataSubscription.loading || notClaimedSubscription.loading || claimedSubscription.loading || totalSubscription.loading;

  return {
    lineData,
    loading,
    notClaimed: notClaimedSubscription.data,
    pieData: pieDataSubscription.data,
    claimed: claimedSubscription.data,
    total: totalSubscription.data,
  };
}
