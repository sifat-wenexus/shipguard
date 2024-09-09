import { ActionFunctionArgs, json, LoaderFunction } from '@remix-run/node';
import { shopify as shopifyRemix } from '../modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { ClaimStatus, FullfillmentStatus } from '#prisma-client';

//loader fn for dashboard api
export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);

  let searchParams = url.searchParams;
  const params = Object.fromEntries(searchParams.entries());
  const ctx = await shopifyRemix.authenticate.admin(request);

  const startDate = params.startDate;
  const endDate = params.endDate;

  try {
    const total = await prisma.packageProtectionOrder.aggregate({
      _sum: {
        refundAmount: true,
        orderAmount: true,
        protectionFee: true,
      },
      _count: { id: true },
      where: {
        AND: [
          { storeId: ctx.session.storeId },
          {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
    });
    const claimed = await prisma.packageProtectionOrder.count({
      where: {
        AND: [
          { hasClaimRequest: true },
          { storeId: ctx.session.storeId },
          {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
    });
    const notProcess = await prisma.packageProtectionClaimOrder.count({
      where: {
        AND: [
          { storeId: ctx.session.storeId },
          { hasClaimRequest: false },
          {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
    });
    const pieData = await prisma.packageProtectionClaimOrder.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          { storeId: ctx.session.storeId },
        ],
      },
      select: { issue: true },
    });

    const issueCounts: { [key: string]: number } = pieData.reduce(
      (acc, current) => {
        const key = current.issue;
        if (key !== null && key !== undefined) {
          if (!acc[key]) {
            acc[key] = 0;
          }
          acc[key]++;
        }
        return acc;
      },
      {}
    );

    const getLineData = await prisma.packageProtectionOrder.groupBy({
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
    });
    const lineData = getLineData.map((e) => {
      if (
        (e._sum.orderAmount === 0 || e._sum.orderAmount) &&
        (e._sum.refundAmount === 0 || e._sum.refundAmount)
      ) {
        return {
          value: (e?._sum?.orderAmount - e._sum.refundAmount).toFixed(2),
          key: e.createdAt,
        };
      }
    });

    return json({
      message: 'Dashboard Data fetched successfully',
      status: true,
      data: {
        totals: total._count.id,
        sum: total._sum,
        lineData,
        claimed,
        notProcess,
        pieData: issueCounts,
      },
      params,
    });
  } catch (e) {
    console.error(e);
    return json({
      message: 'An error occurred while fetching dashboard data',
      status: false,
      e,
    });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const ctx = await shopifyRemix.authenticate.admin(request);
  const store = await prisma.session.findFirst({
    where: { storeId: ctx.session.storeId },
    select: { shop: true },
  });
  const body = await request.formData();
  const action = body.get('action');
  try {
    if (action === 'filterOption') {
      const filterOption = JSON.parse(body.get('state') as string);
      const { searchTerm, filterItems, page, pageSize, startDate, endDate } =
        filterOption;
      const ClaimStatus: ClaimStatus[] = [
        'REQUESTED',
        'INPROGRESS',
        'CANCEL',
        'APPROVE',
        'PARTIALLYAPPROVE',
      ];

      const FullfillmentStatus: FullfillmentStatus[] = [
        'UNFULFILLED',
        'FULFILLED',
        'PARTIALLY_FULFILLED',
      ];

      const filterOp = filterItems.map((item) => item.value.toUpperCase());
      const filterFields = filterOp.map((field) => {
        if (ClaimStatus.includes(field)) {
          return { claimStatus: { equals: field } };
        } else if (FullfillmentStatus.includes(field)) {
          return { fulfillmentStatus: { equals: field } };
        }
      });

      const orderList = await prisma.packageProtectionOrder.findMany({
        where: {
          AND: [
            {
              OR: filterFields || [],
            },

            {
              OR: [{ orderName: { contains: searchTerm } }],
            },

            {
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
            { storeId: { equals: ctx.session.storeId } },
          ],
        },
        orderBy: { createdAt: 'desc' },
        include: { PackageProtectionClaimOrder: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      const totalOrder = await prisma.packageProtectionOrder.count({
        where: {
          AND: [
            {
              OR: filterFields || [],
            },
            {
              OR: [{ orderName: { contains: searchTerm } }],
            },
            {
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
            { storeId: { equals: ctx.session.storeId } },
          ],
        },
      });

      // -------------------------------------------------------------------------------------

      return json({
        message: 'Order fetched Successfully!',
        status: true,
        data: { orderList, totalOrder, shop: store?.shop },
      });
    }
  } catch (err) {
    return json({
      message: 'Error fetching order!',
      success: false,
      data: null,
    });
  }
};
