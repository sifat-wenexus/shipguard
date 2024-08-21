import { ProductVariantSelect } from '~/components/product-variant-select';
import type { ResourceSelection } from '~/components/resource-select';
import { ScrollIntoView } from '~/components/scroll-into-view';
import { queryProxy } from '~/modules/query/query-proxy';
import type { FormState } from '~/hooks/use-form-state';
import * as Icons from '@shopify/polaris-icons';
import { useQuery } from '~/hooks/use-query';
import { useI18n } from '@shopify/react-i18n';
import { useCallback, useMemo } from 'react';
import type { FC } from 'react';

import type {
  SalesCampaignState,
  IncludeSimplified,
} from '~/routes/sales-campaign_.legacy.$/types';

import {
  SkeletonDisplayText,
  ResourceList,
  InlineStack,
  BlockStack,
  TextField,
  Thumbnail,
  Button,
  Select,
  Text,
} from '@shopify/polaris';

export interface IncludeItemProps {
  id: string;
  include: IncludeSimplified;
  onFocus: (include: IncludeSimplified) => void;
  onDelete: (include: IncludeSimplified) => void;
  formState: FormState<SalesCampaignState>;
  onDiscountTypeChange?: (
    include: IncludeSimplified,
    discountType: IncludeSimplified['discountType']
  ) => void;
  onDiscountValueChange?: (
    include: IncludeSimplified,
    discountValue: string
  ) => void;
}

export const IncludeProduct: FC<IncludeItemProps> = ({
  id,
  onFocus,
  include,
  formState,
  onDiscountTypeChange,
  onDiscountValueChange,
}) => {
  const query = useMemo(
    () =>
      queryProxy.product.findFirst({
        where: { id },
        select: {
          id: true,
          title: true,
          featuredImage: true,
          _count: {
            select: {
              Variants: true,
            },
          },
          Variants: {
            take: 1,
            select: {
              price: true,
              compareAtPrice: true,
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

  const variantsSelected = useMemo(() => {
    const variants = include.excludes.map((e) => e.productVariants).flat();

    return variants.length > 0 ? variants : 'All';
  }, [include]);

  const excludeVariants = useCallback(
    (selection: ResourceSelection) => {
      const includes = [...formState.state.includes];
      const excludes = [...include.excludes];

      excludes[0] = {
        ...excludes[0],
        productVariants: selection.selected === 'All' ? [] : selection.selected,
      };

      includes.splice(index, 1, {
        ...include,
        excludes,
      });

      formState.addChange({
        includes,
      });
    },
    [formState, include, index]
  );

  const price = useMemo(() => {
    if (!item || item.Variants.length === 0) {
      return 0;
    }

    const include = formState.staged.includes[index];

    const discountValue = parseInt(include.discountValue);
    const compareAtPrice = Number(item.Variants[0]);
    const price = Number(item.Variants[0].price);

    if (compareAtPrice && discountValue === 0) {
      return price;
    }

    if (include.discountType === 'PERCENTAGE') {
      return price - (price * discountValue) / 100;
    }

    if (include.discountType === 'AMOUNT_OFF') {
      return price - discountValue;
    }

    return 0;
  }, [item, formState.staged.includes, index]);

  const compareAtPrice = useMemo(() => {
    if (!item || item.Variants.length === 0) {
      return 0;
    }

    const compareAtPrice = Number(item.Variants[0]);
    const price = Number(item.Variants[0].price);

    if (compareAtPrice === 0) {
      return price;
    }

    return compareAtPrice;
  }, [item]);

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
            item?.featuredImage ? item.featuredImage : Icons.ProductListIcon
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

            <ProductVariantSelect
              showProduct={false}
              onChange={excludeVariants}
              where={{ productId: id }}
              value={variantsSelected}
              selectAll={false}
              verb="Select"
            >
              <div className="pl-1">
                <Button
                  disclosure="down"
                  textAlign="left"
                  variant="plain"
                  size="micro"
                >
                  Edit Variants (
                  {variantsSelected === 'All'
                    ? item._count.Variants.toString()
                    : variantsSelected.length.toString()}
                  )
                </Button>
              </div>
            </ProductVariantSelect>
          </BlockStack>

          <Text as="p" numeric>
            <Text as="span">
              {isNaN(price) ? '' : i18n.formatCurrency(price)}
            </Text>
            &nbsp;&nbsp;
            {compareAtPrice > price ? (
              <Text
                textDecorationLine="line-through"
                variant="bodySm"
                tone="critical"
                as="span"
              >
                {isNaN(compareAtPrice)
                  ? ''
                  : i18n.formatCurrency(compareAtPrice)}
              </Text>
            ) : null}
          </Text>

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
                  include.discountType === 'PERCENTAGE' ? 100 : compareAtPrice
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
