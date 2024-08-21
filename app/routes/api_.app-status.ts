import type { LoaderFunctionArgs } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import type { AppStatus } from '#prisma-client';

export async function loader({ request }: LoaderFunctionArgs) {
  const ctx = await shopify.authenticate.admin(request);

  const { eventStream } = await import('remix-utils/sse/server');
  const { interval } = await import('remix-utils/timers');

  const iterator = interval(1000, { signal: request.signal });

  return eventStream(request.signal, (send) => {
    (async function run() {
      let lastStatus: AppStatus | null = null;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _ of iterator) {
        const store = await prisma.store.findFirstOrThrow({
          where: {
            id: ctx.session.storeId!,
          },
        });

        if (store.appStatus !== lastStatus) {
          lastStatus = store.appStatus;
          send({ event: 'message', data: store.appStatus });
        }
      }
    })();

    return async () => iterator.return?.();
  });
}
