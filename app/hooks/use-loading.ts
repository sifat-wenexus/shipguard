import type { Fetcher } from '@remix-run/react';
import { useEffect } from 'react';

export function useLoading(fetcher: Fetcher) {
  useEffect(() => {
    if (!fetcher.state || fetcher.state == 'loading') {
      return;
    }

    if (fetcher.data?.message && fetcher.state === 'idle') {
      window.shopify.toast.show(fetcher.data.message);
    }

    shopify.loading(fetcher.state !== 'idle');
  }, [fetcher]);
}
