import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ClaimStatus, FullfillmentStatus } from '#prisma-client';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { BlogIcon } from '@shopify/polaris-icons';
import useDebounce from '~/hooks/use-debounce';
import { useLocation } from '@remix-run/react';
import { useI18n } from '@shopify/react-i18n';
import { IActiveDates } from '../order/route';
import {
  Badge,
  Button,
  EmptySearchResult,
  IndexTable,
  Link,
  Spinner,
  Text,
} from '@shopify/polaris';
import ClaimOrderSearchAndFilter, {
  IFilterOptions,
} from './claim-order-search-and-filter';

const ClaimOrderList = ({
  activeDates,
  setIsProcess,
  setOrderId,
}: {
  activeDates: IActiveDates;
  setIsProcess: Dispatch<SetStateAction<boolean>>;
  setOrderId: Dispatch<SetStateAction<string>>;
}) => {
  const [i18n] = useI18n();
  const fetcher = useBetterFetcher();
  const [inputText, setInputText] = useState('');
  const [filterItems, setFilterItems] = useState<IFilterOptions[]>([]);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [orderList, setOrderList] = useState<Record<string, any>[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

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
  // console.log(period, startDate, endDate);
  // let startPoint = 0;

  const url = useLocation();
  const params = new URLSearchParams(url.search);
  const shop = params.get('shop')?.split('.')[0];

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };

  const handleProcess = (orderId: string) => {
    setIsProcess(true);
    setOrderId(orderId);
  };

  const rowMarkup = orderList?.map(
    (
      {
        id,
        orderName,
        protectionFee,
        orderAmount,
        createdAt,
        orderId,
        hasClaimRequest,
        PackageProtectionClaimOrder,
        refundAmount,
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
                url={`https://admin.shopify.com/store/${shop}/orders/${orderId.replace(
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
            <Text as="span">{i18n.formatCurrency(Number(orderAmount))}</Text>
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
          <IndexTable.Cell>
            {refundAmount > 0 ? i18n.formatCurrency(refundAmount) : '-'}
          </IndexTable.Cell>

          <IndexTable.Cell>{createdAt.split('T')[0]}</IndexTable.Cell>
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
  );

  const getData = async () => {
    setLoading(true);
    const data = (await fetcher.submit(
      { loading: false, toast: false },
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
        action: '/get-claim-order-data',
        method: 'POST',
      }
    )) as {
      orderList: {
        id: number;
        storeId: string;
        protectionFee: string;
        orderAmount: string;
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
      setLoading(false);
      setOrderList(data.orderList);
      setOrderCount(data.totalOrder);
    } else {
      setLoading(false);
    }
  };
  console.log(loading);

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
      <ClaimOrderSearchAndFilter
        filterOption={{
          inputText,
          setInputText,
          filterItems,
          setFilterItems,
        }}
      />
      <IndexTable
        condensed={false} //useBreakpoints().smDown}
        resourceName={{ singular: 'order', plural: 'orders' }}
        itemCount={orderCount}
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
        selectable={false}
        emptyState={emptyStateMarkup}
        pagination={{
          hasNext: page < orderCount / pageSize,
          hasPrevious: page > 1,
          onNext: handleNext,
          onPrevious: handlePrevious,
        }}
      >
        {loading ? (
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

export default ClaimOrderList;
