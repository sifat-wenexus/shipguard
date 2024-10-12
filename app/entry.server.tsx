import { createReadableStreamFromReadable } from '@remix-run/node';
import { renderToPipeableStream } from 'react-dom/server';
import type { EntryContext } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { RemixServer } from '@remix-run/react';
import { isbot } from '~/modules/isbot.server';
import { PassThrough } from 'stream';

import './modules/init.server';
import './modules/job/job-runner.server';
import './listeners/index.server';
import './routes/settings.widget-setup/modules/package-protection-listener.server';
import './modules/query/query.server';
import '~/modules/query/token-store.server';

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  shopify.addDocumentResponseHeaders(request, responseHeaders);
  const callbackName = isbot(request.headers.get('user-agent'))
    ? 'onAllReady'
    : 'onShellReady';

  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
