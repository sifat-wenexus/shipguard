import type { Jsonify } from '@remix-run/server-runtime/dist/jsonify';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type {
  SubscriptionWithPaginatedResult,
  PaginatedResult,
} from '~/modules/query/prisma-extended.server';

export function useQueryPaginated<D>(
  query: Promise<PaginatedResult<D> | SubscriptionWithPaginatedResult<D>>,
  combinePages = false
) {
  const [count, setCount] = useState<number | null>(null);
  const [pages, setPages] = useState<number | null>(null);
  const [page, setPage] = useState<number | null>(null);
  const [data, setData] = useState<D | null>(null);
  const [loading, setLoading] = useState(true);
  const chunks = useMemo<Record<number, D>>(() => ({}), []);

  const next = useCallback(() => {
    query.then(async (s) => {
      if (s.hasNext) {
        setLoading(true);
        await s.next();
        setLoading(false);
      }
    });
  }, [query]);

  const previous = useCallback(() => {
    query.then(async (s) => {
      if (s.hasPrev) {
        setLoading(true);
        await s.previous();
        setLoading(false);
      }
    });
  }, [query]);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }

    const listener = (data: D) =>
      query.then((s) => {
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
        setLoading(false);
      });

    query.then((s) => {
      setCount(s.totalItems);
      setPages(s.totalPages);
      setPage(s.page);
      s.addListener(listener);
    });

    return () => {
      query.then((s) => s.removeListener(listener));
    };
  }, [chunks, combinePages, query]);

  return {
    data: !data ? null : (data as Jsonify<D>),
    loading,
    count,
    pages,
    page,
    next,
    previous,
  };
}
