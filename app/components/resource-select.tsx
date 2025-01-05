import type { ResourceListSelectedItems } from '@shopify/polaris/build/ts/src/utilities/resource-list';
import type { ModelNames } from '~/modules/query/types/model-names';
import type { Types } from '../../prisma/client/runtime/library';
import {PaginatedQuery, useQueryPaginated} from '~/hooks/use-query-paginated';
import React, { useCallback, useMemo, useState } from 'react';
import type { Prisma, PrismaClient } from '#prisma-client';
import { queryProxy } from '~/modules/query/query-proxy';
import type { Unpacked } from '~/types/type-utils';
import type { PropsWithChildren } from 'react';

import type {
  AppliedFilterInterface,
  FilterInterface,
  SelectOption,
} from '@shopify/polaris';

import {
  ResourceList,
  EmptyState,
  Filters,
  Modal,
  Text,
} from '@shopify/polaris';

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

export interface ResourceSelection<M extends ModelNames = ModelNames> {
  selected: ResourceListSelectedItems;
  query?: ResourceArgs<M>;
  total: number;
}

export interface ResourceSelectProps<
  M extends ModelNames = ModelNames,
  A extends ResourceArgs<M> = ResourceArgs<M>
> extends PropsWithChildren {
  getSearchConditions?: (search: string) => FilterValues<M>;
  resourceName: { plural: string; singular: string };
  appliedFilters?: AppliedFilterInterface[];
  value: ResourceSelection['selected'];
  innerWrapperElement?: 'div' | 'span';
  sortOptions?: SortOptions<M>;
  filters?: FilterInterface[];
  disabledIds?: Set<string>;
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
>({ multiple = true, ...props }: ResourceSelectProps<M, A>) {
  const [selected, setSelected] = useState(props.value);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

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

    return {
      pageSize: 15,
      ...props.args,
      where: where.AND.length === 1 ? where.AND[0] : where.AND.length ? where : undefined,
    } as PaginatedQuery<M, 'findMany'>;
  }, [props.args, props.resource, search]);

  const pagination = useQueryPaginated(props.resource, 'findMany', query, false, true);

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
      const _selected = selected === 'All' ? [] : selected;

      if (_selected.includes(id)) {
        setSelected(_selected.filter((i) => i !== id));
      } else {
        if (multiple) {
          setSelected([..._selected, id]);
        } else {
          setSelected([id]);
        }
      }
    },
    [multiple, selected]
  );

  const onSelectionChange = useCallback(
    (selected: ResourceListSelectedItems) => {
      if (multiple) {
        return setSelected(selected);
      }

      setSelected([selected[selected.length - 1]]);
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
        selected === 'All'
          ? selected
          : props.disabledIds?.size
          ? selected.filter((id) => !props.disabledIds?.has(id))
          : selected,
      total: pagination.count ?? Infinity,
      query: props.args,
    });
  }, [pagination.count, props, selected, toggle]);

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
      selectedItems={selected}
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
        {props.listWrapper ? props.listWrapper(list) : list}
      </div>
    </Modal>
  );
}
