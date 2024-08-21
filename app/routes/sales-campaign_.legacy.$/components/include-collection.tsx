import type { IncludeItemProps } from '~/routes/sales-campaign_.legacy.$/components/include-product';
import type { IncludeSimplified } from '~/routes/sales-campaign_.legacy.$/types';
import { ScrollIntoView } from '~/components/scroll-into-view';
import { queryProxy } from '~/modules/query/query-proxy';
import * as Icons from '@shopify/polaris-icons';
import { useI18n } from '@shopify/react-i18n';
import { useQuery } from '~/hooks/use-query';
import { useMemo } from 'react';
import type { FC } from 'react';

import {
  SkeletonDisplayText,
  ResourceList,
  InlineStack,
  BlockStack,
  TextField,
  Thumbnail,
  Select,
  Text,
} from '@shopify/polaris';

export const IncludeCollection: FC<IncludeItemProps> = ({
  id,
  onFocus,
  include,
  formState,
  onDiscountTypeChange,
  onDiscountValueChange,
}) => {
  const query = useMemo(
    () =>
      queryProxy.collection.findFirst({
        where: { id },
        select: {
          id: true,
          title: true,
          featuredImage: true,
          _count: {
            select: {
              Products: true,
            },
          },
        },
      }),
    [id]
  );

  const { data: item } = useQuery(query);

  const index = useMemo(
    () => formState.state.includes.indexOf(include),
    [formState.state.includes, include]
  );

  const [i18n] = useI18n();

  return (
    <ResourceList.Item
      onClick={() => onFocus(include)}
      verticalAlignment="center"
      id={id}
      media={
        <Thumbnail
          alt={item?.title ?? 'Featured Image'}
          size="medium"
          source={
            item?.featuredImage ? item.featuredImage : Icons.CollectionIcon
          }
        />
      }
    >
      {!item ? (
        <SkeletonDisplayText size="medium" />
      ) : (
        <InlineStack gap="100" align="space-between">
          <BlockStack gap="100" align="space-between">
            <Text as="p">{item.title}</Text>
          </BlockStack>

          <InlineStack gap="100" align="end" blockAlign="center">
            <ScrollIntoView
              className="w-[70px]"
              value={
                !!formState.messages[`includes.${index}.discountValue`]?.message
              }
            >
              <TextField
                onChange={(value) => onDiscountValueChange?.(include, value)}
                value={formState.staged.includes[index].discountValue}
                inputMode="decimal"
                requiredIndicator
                autoComplete="on"
                type="number"
                labelHidden
                label=""
                min={0}
                onBlur={() =>
                  formState.commitStaged({
                    path: 'includes.*.discountValue',
                    indexes: [index],
                  })
                }
                error={
                  !!formState.messages[`includes.${index}.discountValue`]
                    ?.message
                }
                max={
                  include.discountType === 'PERCENTAGE' ? 100 : 0
                }
              />
            </ScrollIntoView>

            <Select
              onFocus={() => onFocus(include)}
              value={include.discountType}
              labelHidden
              label=""
              options={[
                {
                  label: '%',
                  value: 'PERCENTAGE',
                  title: 'Percentage',
                },
                {
                  label: i18n.defaultCurrency ?? 'USD',
                  value: 'AMOUNT_OFF',
                  title: 'Amount off',
                },
              ]}
              onChange={(value) =>
                onDiscountTypeChange?.(
                  include,
                  value as IncludeSimplified['discountType']
                )
              }
            />
          </InlineStack>
        </InlineStack>
      )}
    </ResourceList.Item>
  );
};
