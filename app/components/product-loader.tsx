import type { Types } from '../../prisma/client/runtime/library';
import { useQueryPaginated } from '~/hooks/use-query-paginated';
import type { Prisma, PrismaClient } from '#prisma-client';
import { queryProxy } from '~/modules/query/query-proxy';
import { useMemo } from 'react';
import type React from 'react';

export type ProductLoaderArgs = Omit<
  Prisma.Args<PrismaClient['product'], 'findMany'>,
  'take' | 'skip'
> & {
  page?: number;
  pageSize?: number;
};
type Items<A extends ProductLoaderArgs> = Types.Result.GetResult<Payload, A, 'findMany'>;
type Payload = Prisma.Payload<PrismaClient['product']>;

export interface ProductLoaderProps<A extends ProductLoaderArgs> {
  renderItems: (data: Items<A> | null, loading: boolean) => React.ReactNode;
  ids?: string[];
  args?: A;
}

export function ProductLoader<A extends ProductLoaderArgs = ProductLoaderArgs>(
  props: ProductLoaderProps<A>
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

    return queryProxy.product.findMany(args);
  }, [props.args, props.ids]);

  const paginated = useQueryPaginated(query, true);

  return props.renderItems(paginated.data as any, paginated.loading);
}
