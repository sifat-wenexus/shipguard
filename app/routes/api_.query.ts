import { LiveQueryPaginatedServer } from '~/modules/query/live-query-paginated.server';
import { NormalQueryPaginated } from '~/modules/query/normal-query-paginated';
import type { MutationSchema } from '~/modules/query/schema/mutation-schema';
import type { LiveQueryServer } from '~/modules/query/live-query.server';
import { mutationSchema } from '~/modules/query/schema/mutation-schema';
import type { QuerySchema } from '~/modules/query/schema/query-schema';
import type { SSEToken } from '~/modules/query/token-store.server';
import { sseTokenStore } from '~/modules/query/token-store.server';
import { querySchema } from '~/modules/query/schema/query-schema';
import { QueryException } from '~/modules/query/query-exception';
import { queryServer } from '~/modules/query/query.server';
import type { Session } from '~/../app/shopify-api/lib';
import { shopify } from '~/modules/shopify.server';
import { json } from '@remix-run/node';
import Joi from 'joi';

import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
} from '@remix-run/node';

function handleError(e: any): TypedResponse {
  console.error(e);
  if (e instanceof Joi.ValidationError) {
    return json(
      {
        code: 'VALIDATION_ERROR',
        message: e.message,
        details: e.details,
      },
      { status: 400 }
    );
  }

  console.error(e);

  if (e instanceof QueryException) {
    return json({ code: e.code, message: e.message }, { status: 400 });
  }

  return json(
    {
      code: 'UNKNOWN_ERROR',
      message: (e as any).message,
    },
    { status: 500 }
  );
}

async function authenticate(
  url: URL
): Promise<{ session: Session; token: SSEToken } | null> {
  const sessionId = url.searchParams.get('sessionId');
  const token = url.searchParams.get('token');
  const shop = url.searchParams.get('shop');

  if (!sessionId || !token || !shop) {
    return null;
  }

  const tokenData = await sseTokenStore.verifyToken(shop, sessionId, token);

  if (!tokenData) {
    return null;
  }

  const session = await shopify.sessionStorage.loadSession(sessionId);

  return {
    session: session!,
    token: tokenData,
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  let query: QuerySchema;

  try {
    if (!url.searchParams.has('query')) {
      return json(
        {
          code: 'VALIDATION_ERROR',
          message: 'Missing query parameter',
        },
        { status: 400 }
      );
    }

    const queryJson = JSON.parse(url.searchParams.get('query') as string);

    if (!queryJson.query) {
      queryJson.query = {};
    }

    query = await querySchema.validateAsync(queryJson);

    if (!query.subscribe) {
      const { session } = await shopify.authenticate.admin(request);

      const result = await queryServer.find(query, session, query.trxId);

      if (result instanceof NormalQueryPaginated) {
        return json(
          await new Promise((resolve) => {
            result.addListener((data) => {
              resolve({
                data: data,
                page: result.page,
                pageSize: result.pageSize,
                totalItems: result.totalItems,
                totalPages: result.totalPages,
              });
            });
          })
        );
      }

      return json(result);
    }

    const { eventStream } = await import('remix-utils/sse/server');
    const authResult = await authenticate(url);

    if (!authResult) {
      return json(
        {
          code: 'AUTHENTICATION_FAILED',
          message: 'Failed to authenticate',
        },
        { status: 401 }
      );
    }

    const liveQuery = (await queryServer.find(query, authResult.session)) as
      | LiveQueryServer
      | LiveQueryPaginatedServer;

    return eventStream(request.signal, (send) => {
      liveQuery.addListener((data) => {
        send({
          event: 'message',
          data: JSON.stringify(
            liveQuery instanceof LiveQueryPaginatedServer
              ? {
                  data: data,
                  page: liveQuery.page,
                  pageSize: liveQuery.pageSize,
                  totalItems: liveQuery.totalItems,
                  totalPages: liveQuery.totalPages,
                }
              : data
          ),
        });
      });

      return () => {
        liveQuery.close();
      };
    });
  } catch (e) {
    return handleError(e);
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopify.authenticate.admin(request);

  let mutation: MutationSchema;

  try {
    mutation = await mutationSchema.validateAsync(await request.json());

    return json(
      await queryServer.mutate(
        mutation,
        ctx.session,
        mutation.emitEvents,
        mutation.trxId
      )
    );
  } catch (e) {
    return handleError(e);
  }
}
