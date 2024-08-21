import type { Subscription } from '~/modules/query/prisma-extended.server';
import type { Jsonify } from '@remix-run/server-runtime/dist/jsonify';
import { useEffect, useState } from 'react';

function isSubscription<D>(s: Subscription<D> | D): s is Subscription<D> {
  return typeof (s as Subscription<D>).addListener === 'function';
}

export function useQuery<D>(
  query: Promise<Subscription<D> | D>
) {
  const [data, setData] = useState<D | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    query.then((s) => {
      if (isSubscription(s)) {
        s.addListener((d) => {
          setData(d);
          setLoading(false);
        });
      } else {
        setData(s);
        setLoading(false);
      }
    });

    return () => {
      query.then((s) => {
        if (isSubscription(s)) {
          s.removeListener(setData);
        }
      });
    };
  }, [query]);

  return {
    data: !data ? null : data as Jsonify<D>,
    loading,
  };
}
