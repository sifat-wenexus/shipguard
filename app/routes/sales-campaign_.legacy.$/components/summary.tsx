import { InlineStack, Badge, Text, Icon, List, Box } from '@shopify/polaris';
import type { CollectionLoaderArgs } from '~/components/collection-loader';
import { CollectionLoader } from '~/components/collection-loader';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import type { FormState } from '~/hooks/use-form-state';
import type { SalesCampaignState } from '../types';
import * as Icons from '@shopify/polaris-icons';
import { useI18n } from '@shopify/react-i18n';
import { useMemo } from 'react';
import type { FC } from 'react';

interface SummaryProps {
  state: FormState<SalesCampaignState>['state'];
}

export const Summary: FC<SummaryProps> = ({ state }) => {
  const isEmpty = !state.includes.some(
    (i) =>
      i.all ||
      i.products.length > 0 ||
      i.collections.length > 0 ||
      i.productTags.length > 0 ||
      i.productTypes.length > 0 ||
      i.productVendors.length > 0
  );

  const [i18n] = useI18n();

  const startDateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en', {
        day: 'numeric',
        year: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone: state.startTimeZone.id,
      }),
    [state.startTimeZone.id]
  );

  const endDateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en', {
        day: 'numeric',
        year: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone: state.endTimeZone.id,
      }),
    [state.endTimeZone.id]
  );

  const startDate = useMemo(
    () =>
      state.startDate
        ? startDateFormatter.format(new Date(state.startDate))
        : undefined,
    [startDateFormatter, state.startDate]
  );
  const endDate = useMemo(
    () =>
      state.endDate
        ? endDateFormatter.format(new Date(state.endDate))
        : undefined,
    [endDateFormatter, state.endDate]
  );

  const collectionLoaderArgs = useMemo(
    () =>
      ({
        pageSize: 200,
        select: {
          id: true,
          title: true,
          _count: {
            select: {
              Products: true,
            },
          },
        },
      } satisfies CollectionLoaderArgs),
    []
  );

  const firstInclude = state.includes[0];
  const exclude = state.excludes[0];

  return (
    <ShadowBevelBox icon={<Icon source={Icons.ViewIcon} />} title="Summary">
      {isEmpty ? (
        <Box
          background={'bg-surface-caution'}
          paddingInlineStart="200"
          paddingBlockStart="200"
          paddingInlineEnd="200"
          paddingBlockEnd="200"
          borderRadius="200"
          as="section"
        >
          <Text as="p" alignment="center">
            Configure your sales campaign and discounts to see a summary.
          </Text>
        </Box>
      ) : (
        <List type="bullet">
          {state.rangeType === 'ALL_PRODUCTS_SAME_DISCOUNT' ? (
            <List.Item>
              {firstInclude.discountType === 'PERCENTAGE'
                ? `${firstInclude.discountValue}% off`
                : firstInclude.discountType === 'AMOUNT_OFF'
                ? `${i18n.formatCurrency(
                    Number(firstInclude.discountValue)
                  )} discount`
                : `${i18n.formatCurrency(
                    Number(firstInclude.discountValue)
                  )} fixed price`}{' '}
              applies to{' '}
              {firstInclude.all ? (
                <b>All Products</b>
              ) : (
                <>
                  {firstInclude.products.length > 0 ? (
                    <Badge
                      children={`${firstInclude.products.length} individually
                        selected product(s)`}
                      tone="success"
                    />
                  ) : null}

                  {firstInclude.collections.length > 0 ? (
                    <>
                      {firstInclude.products.length > 0 ? (
                        <p className="font-bold my-2">And products where:</p>
                      ) : (
                        'products where'
                      )}

                      <CollectionLoader
                        ids={firstInclude.collections}
                        args={collectionLoaderArgs}
                        renderItems={(data, error) =>
                          data ? (
                            <InlineStack gap="150" wrap>
                              {data.map((item) => (
                                <Badge
                                  children={`Collection is ${item.title} (${item._count.Products} product(s))`}
                                  key={`collection-${item.id}`}
                                  tone="success"
                                />
                              ))}
                            </InlineStack>
                          ) : null
                        }
                      />
                    </>
                  ) : null}
                </>
              )}
              {firstInclude.all ||
              firstInclude.products.length > 0 ||
              firstInclude.collections.length > 0 ? (
                <>
                  {exclude.products.length > 0 ||
                  exclude.collections.length > 0 ||
                  exclude.productTags.length > 0 ||
                  exclude.productTypes.length > 0 ||
                  exclude.productVendors.length > 0 ? (
                    <p className="font-bold my-2">Except</p>
                  ) : null}

                  {exclude.products.length > 0 ? (
                    <div className="my-1">
                      <Badge
                        children={`${exclude.products.length} excluded product(s)`}
                        tone="attention"
                      />
                    </div>
                  ) : null}

                  {exclude.collections.length > 0 ? (
                    <div className="my-1">
                      <Badge
                        children={`${exclude.collections.length} excluded collection(s)`}
                        tone="attention"
                      />
                    </div>
                  ) : null}

                  <div className="my-1">
                    <InlineStack gap="100" wrap>
                      {exclude.productTags.length > 0
                        ? exclude.productTags.map((tag) => (
                            <Badge
                              children={`Tag is ${tag}`}
                              key={`tag-${tag}`}
                              tone="attention"
                            />
                          ))
                        : null}

                      {exclude.productTypes.length > 0
                        ? exclude.productTypes.map((type) => (
                            <Badge
                              children={`Product Type is ${type}`}
                              key={`type-${type}`}
                              tone="attention"
                            />
                          ))
                        : null}

                      {exclude.productVendors.length > 0
                        ? exclude.productVendors.map((vendor) => (
                            <Badge
                              children={`Vendor is ${vendor}`}
                              key={`vendor-${vendor}`}
                              tone="attention"
                            />
                          ))
                        : null}
                    </InlineStack>
                  </div>
                </>
              ) : null}
              {firstInclude.productTags.length > 0
                ? firstInclude.productTags.map((tag) => (
                    <div className="my-1" key={`tag-${tag}`}>
                      <Badge children={`Tag is ${tag}`} tone="success" />
                    </div>
                  ))
                : null}
              {firstInclude.productVendors.length > 0
                ? firstInclude.productVendors.map((vendor) => (
                    <div className="my-1" key={`vendor-${vendor}`}>
                      <Badge children={`Vendor is ${vendor}`} tone="success" />
                    </div>
                  ))
                : null}
              {firstInclude.productTypes.length > 0
                ? firstInclude.productTypes.map((type) => (
                    <div className="my-1" key={`tag-${type}`}>
                      <Badge
                        children={`Product Type is ${type}`}
                        tone="success"
                      />
                    </div>
                  ))
                : null}
            </List.Item>
          ) : null}

          <List.Item>
            {startDate ? (
              <>
                Starts at <b>{startDate}</b>
              </>
            ) : (
              <>Starts now</>
            )}
          </List.Item>
          <List.Item>
            {endDate ? (
              <>
                Ends at <b>{endDate}</b>
              </>
            ) : (
              <>Never ends unless stopped manually</>
            )}
          </List.Item>
        </List>
      )}
    </ShadowBevelBox>
  );
};
