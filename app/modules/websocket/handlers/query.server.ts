import { LiveQueryPaginatedServer } from '~/modules/query/live-query-paginated.server';
import { querySchema, QuerySchema } from '~/modules/query/schema/query-schema';
import type { LiveQueryServer } from '~/modules/query/live-query.server';
import { addRequestHandler } from '~/modules/websocket/websocket.server';
import { queryServer } from '~/modules/query/query.server';

addRequestHandler('query', async (msg, ws) => {
  let query: QuerySchema;

  try {
    const queryJson = msg.payload.payload;

    if (!queryJson.query) {
      queryJson.query = {};
    }

    query = await querySchema.validateAsync(queryJson);

    const liveQuery = (await queryServer.find(
      query,
      ws.getUserData().session
    )) as LiveQueryServer | LiveQueryPaginatedServer;

    liveQuery.addListener(async (data) => {
      msg.reply(
        liveQuery instanceof LiveQueryPaginatedServer
          ? {
              data: data,
              page: liveQuery.page,
              pageSize: liveQuery.pageSize,
              totalItems: liveQuery.totalItems,
              totalPages: liveQuery.totalPages,
            }
          : data,
        false,
        false
      );
    });

    msg.on('patch', async (patch) => {
      query = await querySchema.validateAsync({
        ...query,
        query: patch.payload.payload,
      });

      const {
        query: { query: queryProcessed },
      } = await queryServer.processQuery(query, ws.getUserData().session);

      if (
        liveQuery instanceof LiveQueryPaginatedServer &&
        (queryProcessed.page !== undefined ||
          queryProcessed.pageSize !== undefined)
      ) {
        if (queryProcessed.pageSize !== undefined) {
          liveQuery.pageSize = queryProcessed.pageSize;
        }

        if (queryProcessed.page !== undefined) {
          liveQuery.jumpTo(queryProcessed.page);
        }

        delete queryProcessed.page;
        delete queryProcessed.pageSize;
      }

      liveQuery.refresh(queryProcessed);
    });
  } catch (e: any) {
    msg.reply(e.message, true);
  }
});
