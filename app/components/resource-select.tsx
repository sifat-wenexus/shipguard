//ignore git

import type { ResourceListSelectedItems } from '@shopify/polaris/build/ts/src/utilities/resource-list';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ModelNames } from '~/modules/query/types/model-names';
import type { Types } from '../../prisma/client/runtime/library';
import { useQueryPaginated } from '~/hooks/use-query-paginated';
import type { Prisma, PrismaClient } from '#prisma-client';
import { queryProxy } from '~/modules/query/query-proxy';
import type { Unpacked } from '~/types/type-utils';
import type { PropsWithChildren } from 'react';

import type {
  AppliedFilterInterface,
  FilterInterface,
  IndexTableProps,
  IndexTableRowProps,
  SelectOption,
} from '@shopify/polaris';

import {
  ResourceList,
  EmptyState,
  Filters,
  Modal,
  Text,
  IndexTable,
  useBreakpoints,
  useIndexResourceState,
  Thumbnail,
  InlineStack,
  Box,
  TextField,
  Icon,
} from '@shopify/polaris';
import { ModelTypes } from '~/modules/query/types/model-types';
import { SearchIcon } from '@shopify/polaris-icons';

type Payload<M extends ModelNames> = Prisma.Payload<PrismaClient[M]>;
export type ResourceArgs<M extends ModelNames> = Omit<
  Prisma.Args<PrismaClient[M], 'findMany'>,
  'skip' | 'take' | 'cursor'
>;
export type ResourceItems<
  M extends ModelNames,
  A extends ResourceArgs<M>
> = Types.Result.GetResult<Payload<M>, A, 'findMany'>;
export type ResourceItem<
  M extends ModelNames,
  A extends ResourceArgs<M> = ResourceArgs<M>
> = Unpacked<ResourceItems<M, A>>;

type Order = 'asc' | 'desc';

export interface SortOptions<M extends ModelNames> {
  [key: string]: {
    label: string;
    value(order: Order): Prisma.Args<PrismaClient[M], 'findMany'>['orderBy'];
  };
}

export type FilterValues<M extends ModelNames> = Exclude<
  Prisma.Args<PrismaClient[M], 'findMany'>['where'],
  undefined
>;

export interface GroupBy<M extends ModelNames, A extends ResourceArgs<M>> {
  by: keyof ModelTypes[M]['model'];
  label(item: ResourceItem<M, A>): string;
}

export interface ResourceSelection<M extends ModelNames = ModelNames> {
  selected: ResourceListSelectedItems;
  query?: ResourceArgs<M>;
  total: number;
}

export interface GetSearchConditions<M extends ModelNames = ModelNames> {
  (search: string): FilterValues<M>;
}

export interface ResourceSelectProps<
  M extends ModelNames = ModelNames,
  A extends ResourceArgs<M> = ResourceArgs<M>
> extends PropsWithChildren {
  resourceName: { plural: string; singular: string };
  getSearchConditions?: GetSearchConditions<M>;
  appliedFilters?: AppliedFilterInterface[];
  value: ResourceSelection['selected'];
  innerWrapperElement?: 'div' | 'span';
  sortOptions?: SortOptions<M>;
  filters?: FilterInterface[];
  disabledIds?: Set<string>;
  selectedItem?: string[];
  groupBy?: GroupBy<M, A>;
  searchValue?: string;
  showProduct?: boolean;
  selectAll?: boolean;
  multiple?: boolean;
  className?: string;
  verb: string;
  resource: M;
  args?: A;

  renderItem: (
    item: ResourceItem<M, A>,
    onItemClick: (id: string) => void
  ) => React.ReactNode;
  listWrapper?: (children: React.ReactNode) => React.ReactNode;
  onChange: (change: ResourceSelection) => void;

  getId(item: ResourceItem<M, A>): string;

  onFilterClear?: () => void;
  onOpen?: () => void;
}

export function ResourceSelect<
  M extends ModelNames = ModelNames,
  A extends ResourceArgs<M> = ResourceArgs<M>
>({
  multiple = true,
  searchValue = '',
  selectedItem = [],
  showProduct = false,
  ...props
}: ResourceSelectProps<M, A>) {
  const [selectedList, setSelectedList] = useState(props.value);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState(searchValue);

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  useEffect(() => {
    setSelectedList(selectedItem);
  }, [selectedItem]);

  const sortOptions = useMemo<Exclude<SelectOption, string>[]>(() => {
    const options: Exclude<SelectOption, string>[] = [];

    if (props.sortOptions) {
      for (const key in props.sortOptions) {
        options.push(
          {
            label: `${props.sortOptions[key].label} (ASC)`,
            value: `${key}-asc`,
          },
          {
            label: `${props.sortOptions[key].label} (DESC)`,
            value: `${key}-desc`,
          }
        );
      }
    }

    return options;
  }, [props.sortOptions]);

  const query = useMemo(() => {
    const where = {
      AND: [] as FilterValues<M>[],
    };

    if (props.getSearchConditions && search) {
      where.AND.push(props.getSearchConditions(search));
    }

    if (props.args?.where) {
      where.AND.push(props.args.where as any);
    }
    let orderByField = {};
    if (props.groupBy) {
      orderByField = {
        orderBy: { [props.groupBy.by]: 'desc' },
      };
    }

    return queryProxy[props.resource].findMany({
      pageSize: showProduct ? 210 : 15,
      ...props.args,
      // orderBy: { ...orderByField },

      ...(props.groupBy ? { orderBy: { [props.groupBy.by]: 'desc' } } : {}),
      where:
        where.AND.length === 1
          ? where.AND[0]
          : where.AND.length
          ? where
          : undefined,
    });
  }, [props.args, props.resource, search]);

  const pagination = useQueryPaginated<any>(query, true);

  const onQueryChange = useCallback(
    (value: string) => {
      if (value.trim() === search.trim()) {
        return setSearch(value);
      }

      setSearch(value);
    },
    [search]
  );

  const onItemClick = useCallback(
    (id: string) => {
      const _selected = selectedList === 'All' ? [] : selectedList;

      if (_selected.includes(id)) {
        setSelectedList(_selected.filter((i) => i !== id));
      } else {
        if (multiple) {
          setSelectedList([..._selected, id]);
        } else {
          setSelectedList([id]);
        }
      }
    },
    [multiple, selectedList]
  );

  const onSelectionChange = useCallback(
    (selected: ResourceListSelectedItems) => {
      if (multiple) {
        return setSelectedList(selected);
      }

      setSelectedList([selected[selected.length - 1]]);
    },
    [multiple]
  );

  const toggle = useCallback(
    async (value?: boolean) => {
      const newValue = typeof value === 'boolean' ? value : !value;

      setVisible(newValue);

      if (newValue && props.onOpen) {
        props.onOpen();
      }
    },
    [props]
  );

  const triggerChange = useCallback(() => {
    toggle(false);
    props.onChange({
      selected:
        selectedList === 'All'
          ? selectedList
          : props.disabledIds?.size
          ? selectedList.filter((id) => !props.disabledIds?.has(id))
          : selectedList,
      total: pagination.count ?? Infinity,
      query: props.args,
    });
  }, [pagination.count, props, selectedList, toggle]);

  // make a function for group by an array
  function groupBy<O extends Record<string, any>>(
    array: O[],
    key: keyof O
  ): Record<string, O[]> {
    return array.reduce((result, obj) => {
      // Get the value of the specified key
      const keyValue = obj[key];
      // If the key doesn't exist in the result object, create an empty array for it
      if (!result[keyValue]) {
        result[keyValue] = [];
      }
      // Push the object to the array corresponding to the key
      result[keyValue].push(obj);
      return result;
    }, {} as Record<string, O[]>);
  }

  // ----------------------------------------------------------------
  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    removeSelectedResources,
  } = useIndexResourceState(
    pagination.data as unknown as { [key: string]: unknown }[],
    {
      resourceFilter: ({ disabled }) => !disabled,
    }
  );

  useEffect(() => {
    setSelectedList(selectedResources);
  }, [selectedResources]);
  useEffect(() => {
    if (selectedItem.length > 0) {
      removeSelectedResources(
        selectedResources.filter((el) => !selectedItem.includes(el))
      );
    }
  }, [selectedItem]);

  const columnHeadings = [
    { title: 'Name', id: 'column-header--title' },
    {
      hidden: false,
      id: 'column-header--price',
      title: 'Price',
    },
    {
      alignment: 'end',
      id: 'column-header--sellableOnlineQuantity',
      title: 'Available',
    },
  ];
  // console.log('pagination', pagination);
  const groupRowsByGroupKey = (
    groupKey,
    resolveId: (groupVal: string) => string
  ) => {
    if (pagination.data) {
      let position = -1;
      const groups = pagination.data.reduce((groups, product) => {
        const groupVal: string = product[groupKey] as string;
        if (!groups[groupVal]) {
          position += 1;

          groups[groupVal] = {
            position,
            products: [],
            id: resolveId(groupVal),
          };
        }
        groups[groupVal].products.push({
          ...product,
          position: position + 1,
        });

        position += 1;
        return groups;
      }, {});

      return groups;
    }
  };
  const groupedProducts = groupRowsByGroupKey(
    'productId',
    (id) => `productId--${id?.toLowerCase()}`
  );

  const rowMarkup =
    groupedProducts &&
    Object.keys(groupedProducts).map((element, index) => {
      const { products, position, id: productId } = groupedProducts[element];
      // console.log('groupedProducts[element]', products[0].Product?.title);
      let selected: IndexTableRowProps['selected'] = false;
      const someProductsSelected = products.some(({ id }) =>
        selectedList.includes(id)
      );
      const allProductsSelected = products.every(({ id }) =>
        selectedList.includes(id)
      );
      if (allProductsSelected) {
        selected = true;
      } else if (someProductsSelected) {
        selected = 'indeterminate';
      }
      const selectableRows = pagination.data.filter(
        ({ disabled }) => !disabled
      );

      const rowRange: IndexTableRowProps['selectionRange'] = [
        selectableRows.findIndex((row) => row.id === products[0].id),
        selectableRows.findIndex(
          (row) => row.id === products[products.length - 1].id
        ),
      ];
      const disabled = products.every(({ disabled }) => disabled);

      return (
        <Fragment key={productId}>
          <IndexTable.Row
            rowType="data"
            selectionRange={rowRange}
            id={`Parent-${index}`}
            position={position}
            selected={selected}
            disabled={disabled}
            accessibilityLabel={`Select all products which have color ${productId}`}
          >
            <IndexTable.Cell scope="col" id={productId}>
              <InlineStack>
                <Thumbnail
                  source={products[0].Product?.featuredImage}
                  size="small"
                  alt="Product Image"
                />
                <Box paddingInlineStart="300" paddingBlockStart="200">
                  {' '}
                  <Text as="span">{products[0].Product?.title}</Text>
                </Box>
              </InlineStack>
            </IndexTable.Cell>
            <IndexTable.Cell />
            <IndexTable.Cell />
          </IndexTable.Row>
          {products.map(
            ({
              id,
              title,
              sellableOnlineQuantity,
              price,
              position,
              disabled,
            }) => (
              <IndexTable.Row
                rowType="child"
                key={id}
                id={id}
                position={position}
                selected={selectedList.includes(id)}
                disabled={disabled}
              >
                <IndexTable.Cell
                  scope="row"
                  headers={`${columnHeadings[0].id} ${productId}`}
                >
                  <Text as="span">{title}</Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" numeric>
                    {price}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric>
                    {sellableOnlineQuantity}
                  </Text>
                </IndexTable.Cell>
              </IndexTable.Row>
            )
          )}
        </Fragment>
      );
    });

  const nestedList = (
    <div className="hide-header relative">
      <div className="p-3 sticky">
        <TextField
          placeholder={'Search Product or Variant.'}
          prefix={<Icon source={SearchIcon} />}
          onChange={(text) => setSearch(text)}
          autoComplete="yes"
          value={search}
          label=""
          focused
        />
      </div>
      <IndexTable
        condensed={useBreakpoints().smDown}
        onSelectionChange={handleSelectionChange}
        // selectedItemsCount={allResourcesSelected ? 'All' : selectedList.length}
        resourceName={{ plural: 'products', singular: 'product' }}
        itemCount={pagination.count ?? 0}
        headings={columnHeadings as IndexTableProps['headings']}
      >
        {rowMarkup}
      </IndexTable>
    </div>
  );

  // ----------------------------------------------------------------
  const list = (
    <ResourceList
      loading={pagination.loading && pagination.data?.length !== 0}
      totalItemsCount={pagination.count ?? Infinity}
      resolveItemId={(item) => props.getId(item)}
      items={(pagination.data as any[]) ?? []}
      onSelectionChange={onSelectionChange}
      resourceName={props.resourceName}
      onSortChange={console.log}
      sortOptions={sortOptions}
      selectedItems={selectedList}
      showHeader={multiple}
      selectable
      isFiltered={
        search !== '' ||
        (props.appliedFilters && props.appliedFilters.length > 0)
      }
      hasMoreItems={
        !pagination.page || !pagination.pages
          ? false
          : pagination.page < pagination.pages
      }
      emptyState={
        <EmptyState
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png?width=150&height=150"
          heading={`No ${props.resourceName.plural} found`}
        >
          <Text as="p">
            Change your query or try selecting different filters.
          </Text>
        </EmptyState>
      }
      filterControl={
        <Filters
          queryPlaceholder={`Search ${props.resourceName.plural}`}
          hideQueryField={props.getSearchConditions === undefined}
          onQueryClear={() => setSearch('')}
          appliedFilters={props.appliedFilters}
          onQueryChange={onQueryChange}
          filters={props.filters ?? []}
          queryValue={search}
          onClearAll={() => {
            setSearch('');
            props.onFilterClear?.();
          }}
          focused
        />
      }
      renderItem={(item) => {
        const component = props.renderItem(item, onItemClick);
        const id = props.getId(item);

        if (props.disabledIds?.has(id)) {
          return (
            <div className="opacity-40 pointer-events-none">{component}</div>
          );
        }

        return component;
      }}
    />
  );

  // console.log('', pagination);
  return (
    <Modal
      title={`${props.verb} ${props.resourceName.plural}`}
      onScrolledToBottom={pagination.next}
      loading={!pagination.data}
      onClose={toggle}
      open={visible}
      footer={
        !multiple ? (
          <div>
            Showing {pagination.data?.length} of {pagination.count ?? Infinity}{' '}
            {props.resourceName.plural}
          </div>
        ) : null
      }
      primaryAction={{
        onAction: triggerChange,
        content: props.verb,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: toggle,
          destructive: true,
        },
      ]}
      activator={
        props.innerWrapperElement === 'div' ? (
          <div className={props.className} onClick={() => toggle()}>
            {props.children}
          </div>
        ) : (
          <span className={props.className} onClick={() => toggle()}>
            {props.children}
          </span>
        )
      }
    >
      <div
        className={`${
          props.selectAll === false
            ? 'wenexus__resource_selector_list hide-select-all'
            : ''
        }`}
      >
        {props.listWrapper
          ? props.listWrapper(showProduct ? nestedList : list)
          : showProduct
          ? nestedList
          : list}
      </div>
    </Modal>
  );
}
