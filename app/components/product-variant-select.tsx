import { ResourceSelect } from '~/components/resource-select';
import type { FC, PropsWithChildren } from 'react';
import * as Icons from '@shopify/polaris-icons';
import { useI18n } from '@shopify/react-i18n';
import type { Prisma } from '#prisma-client';
import React, { useCallback } from 'react';

import type {
  FilterValues,
  GetSearchConditions,
  ResourceItem,
  ResourceSelectProps,
} from '~/components/resource-select';
import { ResourceList, InlineStack, Thumbnail, Text } from '@shopify/polaris';

export interface ProductVariantSelectProps extends PropsWithChildren {
  innerWrapperElement?: ResourceSelectProps<'productVariant'>['innerWrapperElement'];
  disabledIds?: ResourceSelectProps<'productVariant'>['disabledIds'];
  className?: ResourceSelectProps<'productVariant'>['className'];
  onChange: ResourceSelectProps<'productVariant'>['onChange'];
  value: ResourceSelectProps<'productVariant'>['value'];
  where?: FilterValues<'productVariant'>;
  selectedItem?: string[];
  searchValue?: string;
  showProduct: boolean;
  selectAll?: boolean;
  multiple?: boolean;
  verb?: string;
}

const ProductVariant: React.FC<{
  item: ResourceItem<'productVariant'>;
  onClick: (id: string) => void;
}> = ({ item, onClick }) => {
  const [i18n] = useI18n();
  // console.log('item', item);
  return (
    <ResourceList.Item
      verticalAlignment="center"
      onClick={onClick}
      name={item.title}
      id={item.id}
      media={
        <Thumbnail
          source={item.featuredImage ? item.featuredImage : Icons.VariantIcon}
          alt={item.title}
          size="small"
        />
      }
    >
      <InlineStack align="space-between" blockAlign="center" wrap>
        <Text as="p">{item.title}</Text>
        <Text as="p" variant="bodySm" tone="subdued">
          {item.inventoryQuantity} in stock
        </Text>

        <Text as="p" numeric>
          <Text as="span">{i18n.formatCurrency(Number(item.price))}</Text>
          &nbsp;&nbsp;
          {item.compareAtPrice && item.compareAtPrice > item.price ? (
            <Text
              as="span"
              variant="bodySm"
              textDecorationLine="line-through"
              tone="critical"
            >
              {i18n.formatCurrency(Number(item.compareAtPrice))}
            </Text>
          ) : null}
        </Text>
      </InlineStack>
    </ResourceList.Item>
  );
};

export const ProductVariantSelect: FC<ProductVariantSelectProps> = ({
  children,
  ...props
}) => {
  const getSearchConditions = useCallback((search: string) => {
    const stringFilter: Prisma.StringFilter = {
      contains: search,
      mode: 'insensitive',
    };

    return {
      OR: [
        { title: stringFilter },
        { sku: stringFilter },
        {
          Product: {
            OR: [
              { title: stringFilter },
              { productType: stringFilter },
              { vendor: stringFilter },
              { tags: { hasSome: [search] } },
              { handle: stringFilter },
              { Collections: { some: { title: stringFilter } } },
              { featuredImage: {} },
            ],
          },
        },
      ],
    } satisfies FilterValues<'productVariant'>;
  }, []);

  return (
    <ResourceSelect
      innerWrapperElement={props.innerWrapperElement}
      selectedItem={props.selectedItem}
      searchValue={props.searchValue}
      verb={props.verb ?? 'Select'}
      args={{
        where: props.where,

        include: {
          Product: {
            select: {
              id: true,
              title: true,
              featuredImage: true,
            },
          },
        },
      }}
      selectAll={props.selectAll}
      className={props.className}
      getId={(item) => item.id}
      resource="productVariant"
      groupBy={
        props.showProduct
          ? {
              label: (item) => item.title,
              by: 'productId',
            }
          : undefined
      }
      showProduct={props.showProduct}
      multiple={props.multiple}
      onChange={props.onChange}
      value={props.value}
      getSearchConditions={
        getSearchConditions as GetSearchConditions<'productVariant'>
      }
      renderItem={(item, onClick) => (
        <ProductVariant item={item} onClick={onClick} />
      )}
      resourceName={{
        plural: 'Product Variants',
        singular: 'Product Variant',
      }}
    >
      {children}
    </ResourceSelect>
  );
};
