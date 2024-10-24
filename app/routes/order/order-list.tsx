import type { ClaimStatus, FullfillmentStatus } from '#prisma-client';
import { useQueryPaginated } from '~/hooks/use-query-paginated';
import type { IFilterOptions } from './order-search-and-filter';
import OrderSearchAndFilter from './order-search-and-filter';
import { queryProxy } from '~/modules/query/query-proxy';
import useDebounce from '~/hooks/use-debounce';
import { useI18n } from '@shopify/react-i18n';
import type { IActiveDates } from './route';
import { useMemo, useState } from 'react';

import {
  EmptySearchResult,
  useBreakpoints,
  IndexTable,
  Spinner,
  Badge,
  Link,
  Text,
} from '@shopify/polaris';

const OrderList = ({
  activeDates,
  shop,
}: {
  shop: string;
  activeDates: IActiveDates;
}) => {
  const [filterItems, setFilterItems] = useState<IFilterOptions[]>([]);
  const [inputText, setInputText] = useState('');
  const [i18n] = useI18n();

  const searchTerm = useDebounce(inputText, 500);

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

  const mediaDevice = useBreakpoints().mdDown;

  const query = useMemo(() => {
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

    return queryProxy.packageProtectionOrder.subscribeFindMany({
      where: {
        AND: [
          {
            OR: filterItems.map((item) => {
              if ((ClaimStatus as string[]).includes(item.value)) {
                return { claimStatus: { equals: item.value } };
              } else if (
                (FullfillmentStatus as string[]).includes(item.value)
              ) {
                return { fulfillmentStatus: { equals: item.value } };
              }

              return null;
            }),
          },
          { hasPackageProtection: { equals: true } },

          {
            OR: [{ orderName: { contains: searchTerm } }],
          },

          {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: { PackageProtectionClaimOrder: true },
    });
  }, [endDate, filterItems, searchTerm, startDate]);
  const subscription = useQueryPaginated(query);

  const rowMarkup = useMemo(
    () =>
      subscription.data?.map(
        (
          {
            id,
            orderName,
            protectionFee,
            orderAmount,
            fulfillmentStatus,
            createdAt,
            orderId,
            hasClaimRequest,
            PackageProtectionClaimOrder,
          },
          index
        ) => {
          const status = PackageProtectionClaimOrder.map((i) => i.claimStatus);
          const claimStatus:
            | 'Requested'
            | 'Processing'
            | 'Canceled'
            | 'Approved' = status.every((i) => i === 'CANCEL')
            ? 'Canceled'
            : status.every((i) => i === 'REQUESTED')
            ? 'Requested'
            : status.every((i) => i === 'APPROVE')
            ? 'Approved'
            : 'Processing';
          return (
            <IndexTable.Row id={id.toString()} key={id} position={index}>
              <IndexTable.Cell>
                <Link
                  removeUnderline
                  target="_blank"
                  url={
                    shop
                      ? `https://admin.shopify.com/store/${shop}/orders/${orderId.replace(
                          'gid://shopify/Order/',
                          ''
                        )}`
                      : ''
                  }
                >
                  <Text variant="bodyMd" fontWeight="bold" as="span">
                    {orderName}
                  </Text>
                </Link>
              </IndexTable.Cell>
              <IndexTable.Cell>
                {i18n.formatCurrency(Number(protectionFee))}
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="span" numeric>
                  {i18n.formatCurrency(Number(orderAmount))}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <span className="capitalize">
                  <Badge
                    progress="incomplete"
                    tone={
                      fulfillmentStatus === 'PARTIALLY_FULFILLED'
                        ? 'warning'
                        : fulfillmentStatus === 'FULFILLED'
                        ? 'success'
                        : 'attention'
                    }
                  >
                    {fulfillmentStatus.toLowerCase()}
                  </Badge>
                </span>
              </IndexTable.Cell>

              <IndexTable.Cell>
                {hasClaimRequest ? (
                  <div className="">
                    <Badge
                      progress={
                        claimStatus === 'Requested'
                          ? 'incomplete'
                          : claimStatus === 'Approved'
                          ? 'complete'
                          : 'partiallyComplete'
                      }
                      tone={
                        claimStatus === 'Approved'
                          ? 'success'
                          : claimStatus === 'Canceled'
                          ? 'critical'
                          : claimStatus === 'Requested'
                          ? 'warning'
                          : 'info'
                      }
                    >
                      {claimStatus}
                    </Badge>
                    <Badge
                      tone={
                        claimStatus === 'Approved'
                          ? 'success'
                          : claimStatus === 'Canceled'
                          ? 'critical'
                          : claimStatus === 'Requested'
                          ? 'warning'
                          : 'info'
                      }
                    >
                      {PackageProtectionClaimOrder.length.toString()}
                    </Badge>
                  </div>
                ) : (
                  <Text as="span" alignment="start">
                    -
                  </Text>
                )}
              </IndexTable.Cell>
              <IndexTable.Cell>{createdAt.split('T')[0]}</IndexTable.Cell>
            </IndexTable.Row>
          );
        }
      ),
    [i18n, shop, subscription.data]
  );

  const emptyStateMarkup = (
    <EmptySearchResult
      title={'No Order yet'}
      description={'Try changing the filters or search term'}
      withIllustration
    />
  );

  return (
    <div className="w-full bg-white  rounded-lg shadow-md">
      {Array.isArray(subscription?.data) && subscription.data.length > 0 && (
        <OrderSearchAndFilter
          filterOption={{
            inputText,
            setInputText,
            filterItems,
            setFilterItems,
          }}
        />
      )}

      {mediaDevice}
      <IndexTable
        condensed={false}
        // useBreakpoints().smDown
        // resourceName={{ singular: 'order', plural: 'orders' }}
        itemCount={
          subscription.loading ? Infinity : (subscription.count as number)
        }
        headings={[
          { title: 'Order' },
          { title: 'Protection Fees' },
          { title: 'Order Amount' },
          { title: 'Fulfillment status' },
          { title: 'Claim status' },
          { title: 'Created At' },
        ]}
        selectable={false}
        emptyState={emptyStateMarkup}
        pagination={{
          hasNext: Boolean(
            subscription.page && subscription.pages !== subscription.page
          ),
          hasPrevious: Boolean(subscription.page && subscription.page > 1),
          onNext: subscription.next,
          onPrevious: subscription.previous,
        }}
      >
        {subscription.loading ? (
          <IndexTable.Cell colSpan={6}>
            <div className="flex justify-center">
              <Spinner accessibilityLabel="Loading..." size="large" />
            </div>
          </IndexTable.Cell>
        ) : (
          <>{rowMarkup}</>
        )}
      </IndexTable>
    </div>
  );
};

export default OrderList;
