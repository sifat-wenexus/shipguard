import { NormalQueryPaginated } from '~/modules/query/normal-query-paginated';
import type { MutationSchema } from '~/modules/query/schema/mutation-schema';
import { mutationSchema } from '~/modules/query/schema/mutation-schema';
import type { QuerySchema } from '~/modules/query/schema/query-schema';
import { querySchema } from '~/modules/query/schema/query-schema';
import { QueryException } from '~/modules/query/query-exception';
import { queryServer } from '~/modules/query/query.server';
import { shopify } from '~/modules/shopify.server';
import { json } from '@remix-run/node';
import Joi from 'joi';

import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
} from '@remix-run/node';

export function handleError(e: any): TypedResponse {
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

export async function action({ request }: LoaderFunctionArgs) {
  let query: QuerySchema;

  try {
    const queryJson = await request.json();

    if (!queryJson.query) {
      queryJson.query = {};
    }

    query = await querySchema.validateAsync(queryJson);

    if (query.subscribe) {
      return json(
        {
          code: 'VALIDATION_ERROR',
          message: 'Subscribe is not supported in this endpoint',
        },
        { status: 400 }
      );
    }

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
  } catch (e) {
    return handleError(e);
  }
}
