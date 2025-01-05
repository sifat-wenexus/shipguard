import {PaginatedQuery, useQueryPaginated} from '~/hooks/use-query-paginated';
import type { Types } from '../../prisma/client/runtime/library';
import type { Prisma, PrismaClient } from '#prisma-client';
import { useMemo } from 'react';
import type React from 'react';

export type CollectionLoaderArgs = Omit<
  Prisma.Args<PrismaClient['collection'], 'findMany'>,
  'take' | 'skip'
> & {
  page?: number;
  pageSize?: number;
};
type Items<A extends CollectionLoaderArgs> = Types.Result.GetResult<Payload, A, 'findMany'>;
type Payload = Prisma.Payload<PrismaClient['collection']>;

export interface CollectionLoaderProps<A extends CollectionLoaderArgs> {
  renderItems: (data: Items<A> | null, loading: boolean) => React.ReactNode;
  ids?: string[];
  args?: A;
}

export function CollectionLoader<A extends CollectionLoaderArgs = CollectionLoaderArgs>(
  props: CollectionLoaderProps<A>
) {
  const query = useMemo(() => {
    const AND: A['where'][] = [];

    if (props.ids) {
      AND.push({ id: { in: props.ids } });
    }

    if (props.args?.where) {
      AND.push(props.args.where);
    }

    const args = { ...props.args };

    if (AND.length > 1) {
      args.where = { AND: AND as any };
    } else if (AND.length === 1) {
      args.where = AND[0];
    }

    return args as PaginatedQuery<'collection', 'findMany'>;
  }, [props.args, props.ids]);

  const paginated = useQueryPaginated('collection', 'findMany', query, false, true);

  return props.renderItems(paginated.data as any, paginated.loading);
}
