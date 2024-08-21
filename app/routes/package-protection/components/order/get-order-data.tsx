// import { ClaimStatus, FullfillmentStatus } from '#prisma-client';
// import { queryProxy } from '~/modules/query/query-proxy';
// import { IFilterOptions } from './order-search-and-filter';

// interface IFilterItems {
//   searchTerm: string;
//   filterItems: IFilterOptions[];
//   page: number;
//   pageSize: number;
//   startDate: string;
//   endDate: string;
// }

// export const getPackageProtectionOrder = async (filterOption: IFilterItems) => {
//   const { searchTerm, filterItems, page, pageSize, startDate, endDate } =
//     filterOption;
//   const ClaimStatusSet = new Set<ClaimStatus>([
//     'REQUESTED',
//     'INPROGRESS',
//     'CANCEL',
//     'APPROVE',
//     'PARTIALLYAPPROVE',
//   ]);

//   const FullfillmentStatusSet = new Set<FullfillmentStatus>([
//     'UNFULFILLED',
//     'FULFILLED',
//     'PARTIALLY_FULFILLED',
//   ]);

//   const filterFields = filterItems
//     .map((item) => item.value.toUpperCase())
//     .map((field) => {
//       if (ClaimStatusSet.has(field as ClaimStatus)) {
//         return { claimStatus: { equals: field } };
//       } else if (FullfillmentStatusSet.has(field as FullfillmentStatus)) {
//         return { fulfillmentStatus: { equals: field } };
//       }
//     })
//     .filter((field) => field !== undefined);

//     const orderList = await queryProxy.packageProtectionOrder.findMany({
//       where: {
//         AND: [
//           {
//             OR: filterFields || [],
//           },
//           {
//             OR: [
//               { orderName: { contains: searchTerm } },
//               { orderAmount: { contains: searchTerm } },
//               { protectionFee: { contains: searchTerm } },
//             ],
//           },
//           {
//             createdAt: {
//               gte: startDate,
//               lte: endDate,
//             },
//           },
//           { storeId: { equals: ctx.session.storeId } },
//         ],
//       },
//       orderBy: { createdAt: 'desc' },

//       skip: (page - 1) * pageSize,
//       take: pageSize,
//     });
//     const totalOrder = await queryProxy.packageProtectionOrder.count({
//       where: {
//         AND: [
//           {
//             OR: filterFields || [],
//           },
//           {
//             OR: [
//               { orderName: { contains: searchTerm } },
//               { orderAmount: { contains: searchTerm } },
//               { protectionFee: { contains: searchTerm } },
//             ],
//           },
//           {
//             createdAt: {
//               gte: startDate,
//               lte: endDate,
//             },
//           },
//           { storeId: { equals: ctx.session.storeId } },
//         ],
//       },
//     });

//     return { orderList, totalOrder };
// };
