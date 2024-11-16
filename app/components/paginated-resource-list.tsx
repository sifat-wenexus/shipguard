import React, { useCallback, useMemo, useState } from 'react';
import type { ResourceSelection } from './resource-select';
import type { ResourceListProps } from '@shopify/polaris';

import {
  ResourceList,
  InlineStack,
  EmptyState,
  Pagination,
  Checkbox,
  Divider,
  Button,
  Text,
} from '@shopify/polaris';

export interface PaginatedResourceListProps<T> {
  onSelectionChange?: (selected: ResourceSelection['selected']) => void;
  promotedBulkActions?: ResourceListProps['promotedBulkActions'];
  bulkActions?: ResourceListProps['bulkActions'];
  pagination?: JSX.Element | React.ReactNode;
  renderItem: (item: T) => React.ReactNode;
  selected?: ResourceSelection['selected'];
  empty: JSX.Element | React.ReactNode;
  emptyStateText?: string;
  resourceName: string;
  loading?: boolean;
  pageSize?: number;
  items: T[];
}

export function PaginatedResourceList<T extends Record<string, any>>({
  selected,
  items,
  ...props
}: PaginatedResourceListProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = props.pageSize ?? items.length;

  const totalPages = useMemo(
    () => Math.ceil(items.length / pageSize),
    [items.length, pageSize]
  );

  const page = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    return items.slice(start, end);
  }, [currentPage, items, pageSize]);

  const onSelectAll = useCallback(() => {
    if (
      selected &&
      (selected === 'All' ||
        selected.length !== 0 ||
        selected.length === items.length)
    ) {
      return props.onSelectionChange?.([]);
    }

    props.onSelectionChange?.('All');
  }, [selected, items.length, props]);

  return (
    <div
      style={
        items.length === 0 ? { marginBottom: `var(--p-space-1600)` } : undefined
      }
    >
      {selected !== undefined && items.length > 0 ? (
        <>
          <div className="ml-[12px]">
            <InlineStack gap="100" align="start" blockAlign="center">
              <Checkbox
                onChange={onSelectAll}
                label={
                  selected === 'All' ? (
                    <span>
                      All {items.length}{' '}
                      <span className="capitalize">{props.resourceName}</span>
                    </span>
                  ) : selected.length === 0 ? (
                    <span>
                      Showing{' '}
                      {Math.min((currentPage - 1) * pageSize + 1, items.length)}{' '}
                      - {Math.min(currentPage * pageSize, items.length)} of{' '}
                      {items.length}{' '}
                      <span className="capitalize">{props.resourceName}</span>
                    </span>
                  ) : (
                    `${selected.length} selected`
                  )
                }
                checked={
                  selected === 'All' || selected.length === items.length
                    ? true
                    : selected.length === 0
                    ? false
                    : 'indeterminate'
                }
              />

              {selected !== 'All' &&
              selected.length > 0 &&
              selected.length !== items.length &&
              totalPages > 1 ? (
                <>
                  {' | '}

                  <Button
                    onClick={() => props.onSelectionChange?.('All')}
                    variant="plain"
                  >
                    Select all {items.length.toString()}
                  </Button>
                </>
              ) : null}
            </InlineStack>
          </div>

          <div className="mt-3 mb-[2px]">
            <Divider />
          </div>
        </>
      ) : null}

      <ResourceList<T>
        selectable={props.onSelectionChange !== undefined}
        promotedBulkActions={props.promotedBulkActions}
        onSelectionChange={props.onSelectionChange}
        hasMoreItems={totalPages > currentPage}
        totalItemsCount={items.length}
        renderItem={props.renderItem}
        selectedItems={selected}
        loading={props.loading}
        showHeader={false}
        items={page}
        resolveItemId={(item) =>
          item.include.id ? item.include.id.toString() : item.id
        }
        bulkActions={
          props.onSelectionChange
            ? [
                {
                  onAction: () => props.onSelectionChange?.('All'),
                  content: 'Select all',
                  id: 'select-all',
                  disabled:
                    selected !== undefined &&
                    (selected === 'All' || selected.length === items.length),
                },
                {
                  id: 'unselect-all',
                  content: 'Unselect all',
                  onAction: () => props.onSelectionChange?.([]),
                },
                ...(props.bulkActions ?? []),
              ]
            : undefined
        }
        emptyState={
          <div style={{ '--p-space-1600': '0' } as any}>
            <EmptyState
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png?width=150&height=150"
              heading="Nothing to see here"
            >
              <Text as="p">
                {props.emptyStateText ??
                  `No ${props.resourceName.toLowerCase()} here.`}
              </Text>
            </EmptyState>
          </div>
        }
      />

      {items.length === 0 ? (
        props.empty
      ) : (
        <div className="mt-4">
          {props.pagination ?? (
            <InlineStack
              align={
                props.onSelectionChange !== undefined ? 'end' : 'space-between'
              }
            >
              {!props.onSelectionChange ? (
                <span>
                  Showing{' '}
                  {Math.min((currentPage - 1) * pageSize + 1, items.length)} -{' '}
                  {Math.min(currentPage * pageSize, items.length)} of{' '}
                  {items.length}{' '}
                  <span className="capitalize">{props.resourceName}</span>
                </span>
              ) : null}

              <Pagination
                onPrevious={() => setCurrentPage(currentPage - 1)}
                onNext={() => setCurrentPage(currentPage + 1)}
                hasNext={totalPages > currentPage}
                hasPrevious={currentPage > 1}
              />
            </InlineStack>
          )}
        </div>
      )}
    </div>
  );
}
