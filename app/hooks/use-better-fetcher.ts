import type { FetcherSubmitFunction } from 'react-router-dom';
import { useFetcher, useNavigate } from '@remix-run/react';
import { useCallback, useEffect, useMemo } from 'react';

interface BetterFetcherOptions {
  key?: string;
}

interface SubmitOptions {
  loading?: boolean;
  toast?: boolean;
}

interface QueueItem {
  args: Parameters<FetcherSubmitFunction>;
  submitOptions: SubmitOptions;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

export function useBetterFetcher(options?: BetterFetcherOptions) {
  const fetcher = useFetcher(options);
  const navigate = useNavigate();

  const queue = useMemo(
    () => ({
      current: null as QueueItem | null,
      items: [] as QueueItem[],
    }),
    []
  );

  const submit = useCallback(
    (options?: SubmitOptions, ...args: Parameters<FetcherSubmitFunction>) =>
      new Promise((resolve, reject) => {
        queue.items.push({
          args,
          submitOptions: {
            loading: options?.loading ?? true,
            toast: options?.toast ?? true,
          },
          resolve,
          reject,
        });

        if (queue.current) {
          return;
        }

        queue.current = queue.items[0];

        fetcher.submit(...queue.current.args);
      }),
    [fetcher, queue]
  );

  useEffect(() => {
    if (!queue.current) {
      return;
    }

    if (fetcher.state === 'loading' || fetcher.state === 'submitting') {
      if (queue.current.submitOptions.loading) {
        shopify.loading(true);
      }

      return;
    }

    const { current } = queue;

    const response = fetcher.data as any;

    if (current.submitOptions.loading) {
      shopify.loading(false);
      shopify.loading(false);
    }

    if (!response) {
      if (current.submitOptions.toast) {
        shopify.toast.show('The server did not give a valid response.', {
          isError: true,
        });
      }

      queue.items.shift();

      if (queue.items.length > 0) {
        queue.current = queue.items[0];

        fetcher.submit(...queue.current.args);
      } else {
        queue.current = null;
      }

      return current.reject('The server did not give a valid response.');
    }

    if (response.message && current.submitOptions.toast) {
      shopify.toast.show(response.message, {
        isError: response.success === false,
      });
    }

    queue.items.shift();

    if (queue.items.length > 0) {
      queue.current = queue.items[0];

      fetcher.submit(...queue.current.args);
    } else {
      queue.current = null;
    }

    current.resolve(response.data);

    if (response.navigation) {
      navigate(response.navigation.to, response.navigation.options);
    }
  }, [fetcher, navigate, queue]);

  return {
    fetcher,
    submit,
  };
}
