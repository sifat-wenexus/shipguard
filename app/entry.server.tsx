import { createReadableStreamFromReadable } from '@remix-run/node';
import { renderToPipeableStream } from 'react-dom/server';
import type { EntryContext } from '@remix-run/node';
import { shopify } from '~/modules/shopify.server';
import { RemixServer } from '@remix-run/react';
import { isbot } from '~/modules/isbot.server';
import { PassThrough } from 'stream';
import dotenv from 'dotenv';

import './routes/settings.widget-setup/modules/package-protection-listener.server';
import { webhookManager } from './modules/webhook-manager.server';
import './modules/bulk-operation-manager.server';
import './modules/find-offline-session.server';
import './modules/websocket/websocket.server';
import '~/modules/websocket/handlers/index';
import '~/modules/query/token-store.server';
import './modules/job/job-runner.server';
import './modules/query/query.server';
import './listeners/index.server';
import './modules/init.server';

const ABORT_DELAY = 5000;

dotenv.config({ path: '.env', override: true });
dotenv.config({ path: '.env.prod', override: true });

setInterval(() => console.log(webhookManager), 1000 * 60 * 60 * 24);

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

  if (process.env.NODE_ENV === 'development') {
    responseHeaders.set(
      'Content-Security-Policy',
      `connect-src 'self' blob: ws://* wss://* https://* https://bugsnag-mtl.shopifycloud.com:4900/js hcaptcha.com *.hcaptcha.com http://localhost:* ws://localhost:*`
    );
  }

  return new Promise(async (resolve, reject) => {
    const { cors } = await import('remix-utils/cors');

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
          const response = new Response(stream, {
            headers: responseHeaders,
            status: responseStatusCode,
          });
          resolve(
            cors(request, response, {
              origin: '*',
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
