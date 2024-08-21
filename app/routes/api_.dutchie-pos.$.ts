import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';

async function proxy({ request, params }: LoaderFunctionArgs) {
  const authorization = request.headers.get('authorization');

  if (!authorization) {
    return json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }

  const param = params['*']!;

  let response: TypedResponse<any>;

  try {
    const originalURL = new URL(request.url);
    const url = new URL(`https://api.pos.dutchie.com/${param}`);
    url.search = originalURL.search;

    const result = await fetch(url, {
      method: request.method,
      body: request.body,
      headers: {
        authorization,
        ConsumerKey: request.headers.get('ConsumerKey') ?? '',
      },
    });

    response = new Response(result.body, {
      headers: {
        'Content-Type': result.headers.get('content-type') ?? 'octet/stream',
      },
    });
  } catch (e) {
    console.error(e);
    response = json(
      {
        message: 'Internal server error',
      },
      {
        status: 500,
      }
    );
  }

  return response;
}

export const loader = proxy;
export const action = proxy;
