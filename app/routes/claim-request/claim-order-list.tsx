import ClaimOrderSearchAndFilter from './claim-order-search-and-filter';
import type { IFilterOptions } from './claim-order-search-and-filter';
import { useQueryPaginated } from '~/hooks/use-query-paginated';
import { queryProxy } from '~/modules/query/query-proxy';
import { useCallback, useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { IActiveDates } from '../order/route';
import type { ClaimStatus } from '#prisma-client';
import { BlogIcon } from '@shopify/polaris-icons';
import useDebounce from '~/hooks/use-debounce';
import { useI18n } from '@shopify/react-i18n';

import {
  EmptySearchResult,
  IndexTable,
  Spinner,
  Button,
  Badge,
  Link,
  Text,
} from '@shopify/polaris';

const claimStatuses: ClaimStatus[] = [
  'REQUESTED',
  'INPROGRESS',
  'CANCEL',
  'APPROVE',
  'PARTIALLYAPPROVE',
];

interface Props {
  activeDates: IActiveDates;
  setIsProcess: Dispatch<SetStateAction<boolean>>;
  setOrderId: Dispatch<SetStateAction<string>>;
  shop: string;
}

const ClaimOrderList = ({
  activeDates,
  setIsProcess,
  setOrderId,
  shop,
}: Props) => {
  const [filterItems, setFilterItems] = useState<IFilterOptions[]>([]);
  const [inputText, setInputText] = useState('');
  const searchTerm = useDebounce(inputText, 500);
  const [i18n] = useI18n();

  const { period } = activeDates || {};
  const startDate = useMemo(
    () =>
      period ? new Date(period?.since).toISOString() : new Date().toISOString(),
    [period]
  );

  const endDate = useMemo(
    () =>
      period
        ? new Date(
            new Date(period?.until).setDate(
              new Date(period.until).getDate() + 1
            )
          ).toISOString()
        : new Date().toISOString(),
    [period]
  );

  const filterOp = useMemo(
    () => filterItems.map((item) => item.value.toUpperCase()),
    [filterItems]
  );
  const filterFields = useMemo(
    () =>
      filterOp.map((field) => {
        if (claimStatuses.includes(field as any)) {
          return { claimStatus: field as ClaimStatus };
        }

        return {};
      }),
    [filterOp]
  );

  const query = useMemo(
    () =>
      queryProxy.packageProtectionOrder.subscribeFindMany({
        where: {
          AND: [
            {
              OR: [{ orderName: { contains: searchTerm } }],
            },
            {
              claimDate: {
                gte: startDate,
                lte: endDate,
              },
            },
            { hasClaimRequest: { equals: true } },
            filterFields.length
              ? {
                  PackageProtectionClaimOrder: {
                    some: {
                      OR: filterFields,
                    },
                  },
                }
              : {},
          ],
        },
        include: {
          PackageProtectionClaimOrder: {

            where: filterFields.length
              ? { OR: filterFields }
              : { claimStatus: { not: 'PARTIALLYAPPROVE' } },
          },
        },
        orderBy: { orderDate: 'desc' },
      }),
    [endDate, filterFields, searchTerm, startDate]
  );

  const subscription = useQueryPaginated(query);

  const handleProcess = useCallback(
    (orderId: string) => {
      setIsProcess(true);
      setOrderId(orderId);
    },
    [setIsProcess, setOrderId]
  );

  const rowMarkup = useMemo(
    () =>{
      const resultWithDistinctClaims = subscription?.data?.map((order) => {
        const uniqueClaims = Array.from(
          new Map(order.PackageProtectionClaimOrder.map((claim) => [claim.fulfillmentId, claim])).values()
        );
        return { ...order, PackageProtectionClaimOrder: uniqueClaims };
      });

     return resultWithDistinctClaims?.map(
        (
          {
            id,
            orderName,
            protectionFee,
            orderAmount,
            claimDate,
            orderId,
            hasClaimRequest,
            PackageProtectionClaimOrder,
            refundAmount,
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
                <Text variant="bodyMd" fontWeight="bold" as="span">
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
                    {' '}
                    {orderName}
                  </Link>
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                {i18n.formatCurrency(Number(protectionFee))}
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="span">
                  {i18n.formatCurrency(Number(orderAmount))}
                </Text>
              </IndexTable.Cell>

              <IndexTable.Cell>
                {hasClaimRequest ? (
                  <>
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
                  </>
                ) : (
                  <Text as="span" alignment="center">
                    -
                  </Text>
                )}
              </IndexTable.Cell>
              <IndexTable.Cell>
                {+refundAmount > 0 ? i18n.formatCurrency(+refundAmount) : '-'}
              </IndexTable.Cell>

              <IndexTable.Cell>{claimDate.split('T')[0]}</IndexTable.Cell>
              <IndexTable.Cell>
                <div className="text-center">
                  <Button
                    accessibilityLabel="Process"
                    onClick={() => handleProcess(orderId)}
                    variant="primary"
                    icon={BlogIcon}
                    tone="success"
                    // disabled={
                    //   claimStatus === 'Approved' || claimStatus === 'Canceled'
                    // }
                  >
                    Process
                  </Button>
                </div>
              </IndexTable.Cell>
            </IndexTable.Row>
          );
        }
      )
    },

    [handleProcess, i18n, shop, subscription.data]
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
      {Array.isArray(subscription.data) && subscription.data.length > 0 && (
        <ClaimOrderSearchAndFilter
          filterOption={{
            inputText,
            setInputText,
            filterItems,
            setFilterItems,
          }}
        />
      )}
      <IndexTable
        itemCount={
          subscription.loading ? Infinity : (subscription.count as number)
        }
        resourceName={{ singular: 'order', plural: 'orders' }}
        condensed={false} //useBreakpoints().smDown}
        emptyState={emptyStateMarkup}
        selectable={false}
        headings={[
          { title: 'Order' },
          { title: 'Protection Fees' },
          { title: 'Order Amount' },
          // { title: 'Fulfillment status' },
          { title: 'Claim Status' },
          { title: 'Refund Value' },
          { title: 'Claim Date' },
          { title: 'Action', alignment: 'center' },
        ]}
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
          <IndexTable.Row id={'request-loading'} position={1}>
          <IndexTable.Cell colSpan={7}>
            <div className="flex justify-center">
              <Spinner accessibilityLabel="Loading..." size="large" />
            </div>
          </IndexTable.Cell></IndexTable.Row>
        ) : (
          <>{rowMarkup}</>
        )}
      </IndexTable>
    </div>
  );
};

export default ClaimOrderList;
