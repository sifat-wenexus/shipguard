import OrderSearchAndFilter, {
  IFilterOptions,
} from './order-search-and-filter';
import { useEffect, useState } from 'react';
import {
  Badge,
  EmptySearchResult,
  IndexTable,
  Link,
  Text,
} from '@shopify/polaris';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import useDebounce from '~/hooks/use-debouncer';
import { ClaimStatus, FullfillmentStatus } from '#prisma-client';
import { IActiveDates } from '.';
import { useI18n } from '@shopify/react-i18n';

const OrderList = ({ activeDates }: { activeDates: IActiveDates }) => {
  const [i18n] = useI18n();
  const fetcher = useBetterFetcher();
  const [inputText, setInputText] = useState('');
  const [filterItems, setFilterItems] = useState<IFilterOptions[]>([]);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [orderList, setOrderList] = useState<Record<string, any>[]>([]);
  const [page, setPage] = useState<number>(1);

  const pageSize = 20;

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

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };

  const rowMarkup = orderList?.map(
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
      const claimStatus: 'Requested' | 'Processing' | 'Canceled' | 'Approved' =
        status.every((i) => i === 'CANCEL')
          ? 'Canceled'
          : status.every((i) => i === 'REQUESTED')
          ? 'Requested'
          : status.every((i) => i === 'APPROVE')
          ? 'Approved'
          : 'Processing';
      return (
        <IndexTable.Row id={id} key={id} position={index}>
          <IndexTable.Cell>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              <Link
                removeUnderline
                target="_blank"
                url={`https://admin.shopify.com/store/nexusapp/orders/${orderId.replace(
                  'gid://shopify/Order/',
                  ''
                )}`}
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
            <Text as="span" numeric>
              {i18n.formatCurrency(Number(orderAmount))}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
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
              {fulfillmentStatus}
            </Badge>
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
                  {PackageProtectionClaimOrder.length}
                </Badge>
              </>
            ) : (
              <Text as="span" alignment="center">
                -
              </Text>
            )}
          </IndexTable.Cell>
          <IndexTable.Cell>{createdAt.split('T')[0]}</IndexTable.Cell>
        </IndexTable.Row>
      );
    }
  );

  // getPackageProtectionOrder({
  //   filterItems,
  //   page,
  //   pageSize,
  //   searchTerm,
  //   startDate,
  //   endDate,
  // })
  //   .then((res) => console.log('***********', res))
  //   .catch((error) => console.log(error));

  const getData = async () => {
    const data = (await fetcher.submit(
      { loading: true, toast: false },
      {
        action: 'filterOption',
        state: JSON.stringify({
          searchTerm: searchTerm,
          filterItems: filterItems,
          startDate: startDate, //+ 'T00:00:01.000Z',
          endDate: endDate, //+ 'T23:59:59.000Z',
          page: page,
          pageSize: pageSize,
        }),
      },
      {
        action: '/get-order-data',
        method: 'POST',
      }
    )) as {
      orderList: {
        id: number;
        storeId: string;
        protectionFee: number;
        orderAmount: number;
        claimStatus: ClaimStatus;
        fulfillmentStatus: FullfillmentStatus;
        orderId: string;
        orderName: string;
        createdAt: Date;
        updatedAt: Date;
      }[];
      totalOrder: number;
    };
    if (data) {
      setOrderList(data.orderList);
      setOrderCount(data.totalOrder);
    }
  };

  useEffect(() => {
    getData();
  }, [filterItems, searchTerm, activeDates, page]);

  const emptyStateMarkup = (
    <EmptySearchResult
      title={'No Order yet'}
      description={'Try changing the filters or search term'}
      withIllustration
    />
  );

  return (
    <div className="w-full bg-white  rounded-lg shadow-md">
      <OrderSearchAndFilter
        filterOption={{ inputText, setInputText, filterItems, setFilterItems }}
      />
      <IndexTable
        condensed={false} //useBreakpoints().smDown}
        // resourceName={{ singular: 'order', plural: 'orders' }}
        itemCount={orderCount}
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
          hasNext: page < orderCount / pageSize,
          hasPrevious: page > 1,
          onNext: handleNext,
          onPrevious: handlePrevious,
        }}
      >
        {rowMarkup}
      </IndexTable>
    </div>
  );
};

export default OrderList;
