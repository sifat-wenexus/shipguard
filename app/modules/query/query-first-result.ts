import type {
  SubscriptionWithPaginatedResult,
  PaginatedResult,
  Subscription,
} from '~/modules/query/prisma-extended.server';

export function queryFirstResult<D>(
  query:
    | PaginatedResult<D>
    | SubscriptionWithPaginatedResult<D>
    | Subscription<D>
): Promise<D> {
  return new Promise<D>((resolve) => {
    const resolver = (data: D) => {
      resolve(data);
      query.removeListener(resolver);
    };

    query.addListener(resolver);
  });
}
