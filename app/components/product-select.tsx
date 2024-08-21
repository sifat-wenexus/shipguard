import { ResourceSelectMini } from '~/components/resource-select-mini';
import { ResourceSelect } from '~/components/resource-select';
import { useCallback, useMemo, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import * as Icons from '@shopify/polaris-icons';
import type { Prisma } from '#prisma-client';

import type {
  ResourceSelectProps,
  FilterValues,
  ResourceArgs,
  ResourceItem,
} from '~/components/resource-select';

import {
  type AppliedFilterInterface,
  type FilterInterface,
  ResourceList,
  Thumbnail,
} from '@shopify/polaris';

export interface ProductSelectProps extends PropsWithChildren {
  innerWrapperElement?: ResourceSelectProps<'product'>['innerWrapperElement'];
  disabledIds?: ResourceSelectProps<'product'>['disabledIds'];
  className?: ResourceSelectProps<'product'>['className'];
  onChange: ResourceSelectProps<'product'>['onChange'];
  onOpen?: ResourceSelectProps<'product'>['onOpen'];
  value: ResourceSelectProps<'product'>['value'];
  where?: FilterValues<'product'>;
  hideFilters?: string[];
  selectAll?: boolean;
  multiple?: boolean;
  verb?: string;
  searchValue?: string;
  selectedItem?: string[];
}

export const ProductSelect: FC<ProductSelectProps> = ({
  children,
  ...props
}) => {
  const [filterValues, setFilterValues] = useState<
    Record<string, FilterValues<'product'>>
  >({});

  const [appliedFilters, setAppliedFilters] = useState<
    AppliedFilterInterface[]
  >([]);

  const args = useMemo(() => {
    const args: ResourceArgs<'product'> = {};

    const AND: FilterValues<'product'>[] = [];

    if (props.where) {
      AND.push(props.where);
    }

    for (const key in filterValues) {
      AND.push(filterValues[key]);
    }

    if (AND.length > 1) {
      args.where = { AND };
    } else if (AND.length === 1) {
      args.where = AND[0];
    }

    return args;
  }, [filterValues, props.where]);

  const [vendors, setVendors] = useState<ResourceItem<'productVendor'>[]>([]);
  const [types, setTypes] = useState<ResourceItem<'productType'>[]>([]);
  const [tags, setTags] = useState<ResourceItem<'productTag'>[]>([]);

  const clearFilters = useCallback(() => {
    setFilterValues({});
    setAppliedFilters([]);
  }, []);

  const removeFilter = useCallback(
    (key: string) => {
      setAppliedFilters(appliedFilters.filter((f) => f.key !== key));

      const newValue = { ...filterValues };
      delete newValue[key];

      setFilterValues(newValue);
    },
    [appliedFilters, filterValues]
  );

  const applyFilter = useCallback(
    (key: string, label: string, value?: FilterValues<'product'>) => {
      const filterIndex = appliedFilters.findIndex((f) => f.key === key);
      const newAppliedFilters = [...appliedFilters];

      const newFilter = {
        key,
        label: label ?? '',
        onRemove: removeFilter,
      };

      if (filterIndex > -1) {
        newAppliedFilters[filterIndex] = newFilter;
      } else {
        newAppliedFilters.push(newFilter);
      }

      setAppliedFilters(newAppliedFilters);

      const newValue = { ...filterValues };

      if (value) {
        newValue[key] = value;
      } else {
        delete newValue[key];
      }

      setFilterValues(newValue);
    },
    [appliedFilters, filterValues, removeFilter]
  );

  const filters = useMemo<FilterInterface[]>(
    () =>
      [
        {
          key: 'tags',
          label: 'Tags',
          pinned: true,
          shortcut: true,
          hideClearButton: true,
          filter: (
            <div
              onKeyDown={(e) => {
                if (e.key === 'Enter' && tags.length > 0) {
                  applyFilter('tags', tags.map((t) => t.tag).join(', '), {
                    tags: {
                      hasSome: tags.map((t) => t.tag),
                    },
                  } satisfies FilterValues<'product'>);
                }
              }}
            >
              <ResourceSelectMini
                resourceName={{ plural: 'Tags', singular: 'Tag' }}
                value={tags.map((t) => t.tag)}
                getTitle={(item) => item.tag}
                getId={(item) => item.tag}
                resource="productTag"
                onChange={(selected) => {
                  setTags(selected);

                  applyFilter('tags', selected.map((t) => t.tag).join(', '), {
                    tags: {
                      hasSome: selected.map((t) => t.tag),
                    },
                  } satisfies FilterValues<'product'>);
                }}
              />
            </div>
          ),
        },
        {
          key: 'vendor',
          label: 'Vendor',
          pinned: true,
          shortcut: true,
          hideClearButton: true,
          filter: (
            <div
              onKeyDown={(e) => {
                if (e.key === 'Enter' && vendors.length > 0) {
                  applyFilter(
                    'vendor',
                    vendors.map((v) => v.vendor).join(', '),
                    {
                      vendor: {
                        in: vendors.map((v) => v.vendor),
                      },
                    } satisfies FilterValues<'product'>
                  );
                }
              }}
            >
              <ResourceSelectMini
                resourceName={{ plural: 'Vendors', singular: 'Vendor' }}
                value={vendors.map((v) => v.vendor)}
                getTitle={(item) => item.vendor}
                getId={(item) => item.vendor}
                resource="productVendor"
                onChange={(selected) => {
                  setVendors(selected);

                  applyFilter(
                    'vendor',
                    selected.map((v) => v.vendor).join(', '),
                    {
                      vendor: {
                        in: selected.map((v) => v.vendor),
                      },
                    } satisfies FilterValues<'product'>
                  );
                }}
              />
            </div>
          ),
        },
        {
          key: 'productType',
          label: 'Type',
          pinned: true,
          shortcut: true,
          hideClearButton: true,
          filter: (
            <div
              onKeyDown={(e) => {
                if (e.key === 'Enter' && types.length > 0) {
                  applyFilter(
                    'productType',
                    types.map((t) => t.productType).join(', '),
                    {
                      productType: {
                        in: types.map((t) => t.productType),
                      },
                    } satisfies FilterValues<'product'>
                  );
                }
              }}
            >
              <ResourceSelectMini
                resourceName={{ plural: 'Types', singular: 'Type' }}
                value={types.map((t) => t.productType)}
                getTitle={(item) => item.productType}
                getId={(item) => item.productType}
                resource="productType"
                onChange={(selected) => {
                  setTypes(selected);

                  applyFilter(
                    'productType',
                    selected.map((t) => t.productType).join(', '),
                    {
                      productType: {
                        in: selected.map((t) => t.productType),
                      },
                    } satisfies FilterValues<'product'>
                  );
                }}
              />
            </div>
          ),
        },
      ].filter((f) => !props.hideFilters?.includes(f.key)),
    [applyFilter, tags, types, vendors]
  );

  const getSearchConditions = useCallback((search: string) => {
    const stringFilter: Prisma.StringFilter = {
      contains: search,
      mode: 'insensitive',
    };

    return {
      OR: [
        { title: stringFilter },
        { productType: stringFilter },
        { vendor: stringFilter },
        { vendor: stringFilter },
        { handle: stringFilter },
        { tags: { hasSome: [search] } },
        { Collections: { some: { title: stringFilter } } },
        {
          Variants: {
            some: {
              OR: [{ title: stringFilter }, { sku: stringFilter }],
            },
          },
        },
      ],
    } satisfies FilterValues<'product'>;
  }, []);

  return (
    <ResourceSelect
      getId={(item) => item.id}
      innerWrapperElement={props.innerWrapperElement}
      getSearchConditions={getSearchConditions}
      selectedItem={props.selectedItem}
      searchValue={props.searchValue}
      appliedFilters={appliedFilters}
      disabledIds={props.disabledIds}
      verb={props.verb ?? 'Select'}
      onFilterClear={clearFilters}
      className={props.className}
      selectAll={props.selectAll}
      multiple={props.multiple}
      onChange={props.onChange}
      onOpen={props.onOpen}
      value={props.value}
      resource="product"
      filters={filters}
      args={args}
      resourceName={{
        plural: 'Products',
        singular: 'Product',
      }}
      renderItem={(item, onItemClick) => (
        <ResourceList.Item
          verticalAlignment="center"
          onClick={onItemClick}
          name={item.title}
          id={item.id}
          media={
            <Thumbnail
              source={
                item.featuredImage ? item.featuredImage : Icons.ProductListIcon
              }
              alt={item.title}
              size="small"
            />
          }
        >
          {item.title}
        </ResourceList.Item>
      )}
    >
      {children}
    </ResourceSelect>
  );
};
