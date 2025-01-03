import type {
  FilterValues,
  ResourceArgs,
  ResourceItem,
} from '~/components/resource-select';
import type { ModelNames } from '~/modules/query/types/model-names';
import {PaginatedQuery, useQueryPaginated} from '~/hooks/use-query-paginated';
import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { queryProxy } from '~/modules/query/query-proxy';
import type { ChoiceListProps } from '@shopify/polaris';
import type { Unpacked } from '~/types/type-utils';

import {
  InlineStack,
  ChoiceList,
  TextField,
  Spinner,
  Divider,
  Button,
  Text,
  Box,
} from '@shopify/polaris';

export interface ResourceSelectMiniProps<
  M extends ModelNames = ModelNames,
  A extends ResourceArgs<M> = ResourceArgs<M>
> {
  getSearchConditions?: (search: string) => FilterValues<M>;
  resourceName: { plural: string; singular: string };
  onChange: (selected: ResourceItem<M, A>[]) => void;
  getTitle?: (item: ResourceItem<M, A>) => string;
  getId: (item: ResourceItem<M, A>) => string;
  autoSelect?: boolean;
  multiple?: boolean;
  value: string[];
  resource: M;
  args?: A;
  contentHider?: boolean;
  setContentHider?: (v: boolean) => void;
}

let timeout: ReturnType<typeof setTimeout> | null = null;

export function ResourceSelectMini<
  M extends ModelNames = ModelNames,
  A extends ResourceArgs<M> = ResourceArgs<M>
>({ multiple = true, contentHider = true, ...props }: ResourceSelectMiniProps<M, A>) {
  type Choice = Unpacked<ChoiceListProps['choices']>;

  const [searchStaged, setSearchStaged] = useState('');
  const [selected, setSelected] = useState(props.value);
  const [search, setSearch] = useState('');


  const query = useMemo(() => {
    const where = {
      AND: [] as FilterValues<M>[],
    };

    if (props.getSearchConditions && searchStaged) {
      where.AND.push(props.getSearchConditions(searchStaged));
    }

    if (props.args?.where) {
      where.AND.push(props.args.where as any);
    }

    return {
      pageSize: 15,
      ...props.args,
      where:
        where.AND.length === 1
          ? where.AND[0]
          : where.AND.length
            ? where
            : undefined,
    } as PaginatedQuery<M, 'findMany'>;
  }, [props.getSearchConditions, props.args, props.resource, searchStaged]);

  const pagination = useQueryPaginated(props.resource, 'findMany', query, false, true);

  const choices = useMemo<Choice[]>(() => {
    if (!pagination.data) {
      return [];
    }
    return pagination.data.map((i) => {
      const id = props.getId(i as any);

      return {
        value: id,
        label: props.getTitle?.(i as any) ?? id,
      } as Choice;
    });
  }, [pagination.data, props]);

  const onChange = useCallback(
    (value: string[]) => {
      if (props.autoSelect) {
        setSelected(value);

        const changes = pagination.data?.filter((i) =>
          value.includes(props.getId(i as any))
        );

        if (changes) {
          props.onChange(value as any);
        }
      } else {
        setSelected(value);
      }
    },
    [pagination.data, props, selected]
  );

  const done = useCallback(() => {
    const changes = pagination.data?.filter((i) =>
      selected.includes(props.getId(i as any))
    );

    if (changes) {
      props.onChange(changes as any);
    }
  }, [pagination.data, selected, props]);

  const onQueryChange = useCallback(
    (value: string) => {
      if (value.trim() === search.trim()) {
        return setSearch(value);
      }

      setSearch(value);

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(async () => setSearchStaged(value), 300);
    },
    [search]
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (!pagination.loading && pagination.next) {
          pagination.next();
        }
      }
    }
  }, [pagination]);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);


  return (
    <div ref={containerRef} style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <div className="sticky top-0 bg-[--p-color-bg-surface] p-1" style={{ zIndex: 999 }}>
        <TextField
          onChange={onQueryChange}
          placeholder="Search"
          autoComplete="off"
          inputMode="search"
          onFocus={() => props.setContentHider && props.setContentHider(true)}
          value={search}
          labelHidden
          label=""
        />
        <div className="mt-2">
          <Divider />
        </div>
      </div>
      {contentHider &&

        <Box paddingBlockStart="100">
          <ChoiceList
            title={props.resourceName.plural}
            allowMultiple={multiple}
            onChange={onChange}
            selected={selected}
            choices={choices}
            titleHidden
          />

          {pagination.loading || pagination.data?.length === 0 ? (
            <InlineStack align="center">
              <Spinner size="small" />
            </InlineStack>
          ) : pagination.data?.length === 0 ? (
            <Text as="p" alignment="center">
              Nothing found
            </Text>
          ) : null}
        </Box>

      }
      <div className="flex justify-between sticky bottom-0 bg-[--p-color-bg-surface] z-20 p-1">
        {/* <Button
          disabled={pagination.page === pagination.pages || pagination.loading}
          onClick={pagination.next}
          variant="plain"
        >
          Show more
        </Button> */}

        {props.autoSelect ? null : (
          <Button size="micro" onClick={done}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
}
