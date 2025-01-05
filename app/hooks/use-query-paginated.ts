import type { Jsonify } from '@remix-run/server-runtime/dist/jsonify';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Types } from '../../prisma/client/runtime/library';
import { ModelNames } from '~/modules/query/types/model-names';
import { Prisma, type PrismaClient } from '#prisma-client';
import { queryProxy } from '~/modules/query/query-proxy';

import {
  PaginatedArgs,
  PaginatedResult,
  SubscriptionWithPaginatedResult,
} from '~/modules/query/prisma-extended.server';

type Action = 'findMany' | 'groupBy';

export type PaginatedQuery<
  M extends ModelNames,
  O extends Action,
> = PaginatedArgs<Prisma.Args<PrismaClient[M], O>>;

export function useQueryPaginated<
  M extends ModelNames = ModelNames,
  O extends Action = Action,
  A extends PaginatedQuery<M, O> = PaginatedQuery<M, O>,
  D = Types.Result.GetResult<Prisma.Payload<PrismaClient[M]>, A, O>,
>(model: M, method: O, query: A, subscribe = false, combinePages = false) {
  const [subscription, setSubscription] = useState<
    SubscriptionWithPaginatedResult<D> | PaginatedResult<D> | null
  >(null);
  const chunks = useMemo<Record<number, D>>(() => ({}), []);
  const [page, setPage] = useState<number>(query.page ?? 1);
  const [count, setCount] = useState<number | null>(null);
  const [pages, setPages] = useState<number | null>(null);
  const [data, setData] = useState<D | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = !subscribe ? queryProxy[model][method](query) as unknown as PaginatedResult<D> : queryProxy[model][
      `subscribe${method[0].toUpperCase()}${method.slice(1)}`
      ](query) as SubscriptionWithPaginatedResult<D>;

    const listener = (data: D) => {
      chunks[s.page] = data;

      if (combinePages) {
        const keys = Object.keys(chunks)
          .map(Number)
          .sort((a, b) => a - b);

        setData(
          keys.reduce((acc, key) => (acc as any).concat(chunks[key]), [] as D)
        );
      } else {
        setData(chunks[s.page]);
      }

      setCount(s.totalItems);
      setPages(s.totalPages);
      setPage(s.page);

      setCount(s.totalItems);
      setPages(s.totalPages);
      setPage(s.page);

      if (firstLoad) {
        setFirstLoad(false);
      }
    };
    const offLoading = s.onLoading(setLoading);

    setSubscription(s);
    s.addListener(listener);

    return () => {
      offLoading();

      if (subscribe) {
        (s as SubscriptionWithPaginatedResult<D>).close();
      }
    };
  }, [model, method, query, subscribe, combinePages]);

  const next = useCallback(() => {
    if (subscription?.hasNext) {
      subscription.next();
    }
  }, [subscription, query]);

  const previous = useCallback(() => {
    if (subscription?.hasPrev) {
      subscription.previous();
    }
  }, [subscription]);

  return {
    data: !data ? null : (data as Jsonify<D>),
    firstLoad,
    loading,
    count,
    pages,
    page,
    next,
    previous,
  };
}
