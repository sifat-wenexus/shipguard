import { PaginatedQuery, useQueryPaginated } from '~/hooks/use-query-paginated';
import type { Types } from '../../prisma/client/runtime/library';
import type { Prisma, PrismaClient } from '#prisma-client';
import type React from 'react';
import { useMemo } from 'react';

export type ProductVariantLoaderArgs = Omit<
  Prisma.Args<PrismaClient['productVariant'], 'findMany'>,
  'take' | 'skip'
> & {
  page?: number;
  pageSize?: number;
};
type Items<A extends ProductVariantLoaderArgs> = Types.Result.GetResult<
  Payload,
  A,
  'findMany'
>;
type Payload = Prisma.Payload<PrismaClient['productVariant']>;

export interface ProductVariantLoaderProps<A extends ProductVariantLoaderArgs> {
  renderItems: (data: Items<A> | null, loading: boolean) => React.ReactNode;
  ids?: string[];
  args?: A;
}

export function ProductVariantLoader<
  A extends ProductVariantLoaderArgs = ProductVariantLoaderArgs
>(props: ProductVariantLoaderProps<A>) {
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

    return args;
  }, [props.args, props.ids]);

  const paginated = useQueryPaginated(
    'productVariant',
    'findMany',
    query as PaginatedQuery<'productVariant', 'findMany'>,
    false,
    true
  );

  return props.renderItems(paginated.data as any, paginated.loading);
}
