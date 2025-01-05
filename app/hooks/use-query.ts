import {
  PaginatedResult,
  Subscription,
  SubscriptionWithPaginatedResult,
} from '~/modules/query/prisma-extended.server';
import type { Jsonify } from '@remix-run/server-runtime/dist/jsonify';
import type { Types } from '../../prisma/client/runtime/library';
import { ModelNames } from '~/modules/query/types/model-names';
import { Prisma, type PrismaClient } from '#prisma-client';
import { queryProxy } from '~/modules/query/query-proxy';
import { useEffect, useState } from 'react';

type Action =
  | 'findFirst'
  | 'aggregate'
  | 'count'
  | 'findUnique'
  | 'findMany'
  | 'groupBy';

export type Query<M extends ModelNames, O extends Action> = Prisma.Args<
  PrismaClient[M],
  O
>;

export function useQuery<
  M extends ModelNames = ModelNames,
  O extends Action = Action,
  A extends Query<M, O> = Query<M, O>,
  D = Types.Result.GetResult<Prisma.Payload<PrismaClient[M]>, A, O>
>(model: M, method: O, query: A, subscribe = false) {
  const [data, setData] = useState<D | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const _method = subscribe
      ? `subscribe${method[0].toUpperCase()}${method.slice(1)}`
      : method;
    const dataOrSubscription = queryProxy[model][_method](query);

    if (dataOrSubscription instanceof Promise) {
      dataOrSubscription.then((d) => {
        setData(d);
        setLoading(false);
      });

      return;
    }

    const subscription = queryProxy[model][_method](query) as
      | Subscription<D>
      | PaginatedResult<D>
      | SubscriptionWithPaginatedResult<D>;

    subscription.addListener(setData);
    const offLoading = subscription.onLoading(setLoading);

    return () => {
      offLoading();
      if ('close' in subscription) {
        subscription.close();
      }
    };
  }, [method, model, query, subscribe]);

  return {
    data: !data ? null : (data as Jsonify<D>),
    loading,
  };
}
