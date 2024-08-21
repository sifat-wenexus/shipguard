import { LiveQueryPaginatedClient } from '~/modules/query/live-query-paginated.client';
import { NormalQueryPaginated } from '~/modules/query/normal-query-paginated';
import type { PrismaExtended } from '~/modules/query/prisma-extended.server';
import type { MutationType } from '~/modules/query/schema/mutation-schema';
import type { QueryType } from '~/modules/query/schema/query-schema';
import type { ModelNames } from '~/modules/query/types/model-names';
import { LiveQueryClient } from '~/modules/query/live-query.client';
import { queryServer } from '~/modules/query/query.server';
import _ from 'lodash';

const proxies: Record<string, any> = {};
const queryMethods = new Set([
  'findUnique',
  'findFirst',
  'findMany',
  'count',
  'aggregate',
  'groupBy',
  'subscribeFindUnique',
  'subscribeFindFirst',
  'subscribeFindMany',
  'subscribeCount',
  'subscribeAggregate',
  'subscribeGroupBy',
]);
const mutationMethods = new Set([
  'create',
  'createMany',
  'update',
  'updateMany',
  'upsert',
  'delete',
  'deleteMany',
]);

function getQueryProxy(trxId?: string) {
  return new Proxy<PrismaExtended>({} as any, {
    get(__, model: string) {
      const isServer = typeof window === 'undefined';

      if (model === '$transaction') {
        if (isServer) {
          return async (...args: any[]) => {
            const trxId = await queryServer.transaction(
              undefined,
              args[1]?.maxWait,
              args[1]?.timeout,
              args[1]?.isolationLevel
            );

            try {
              const result = await args[0](getQueryProxy(trxId));
              queryServer.transactions[trxId].commit(result);

              return result;
            } catch (e) {
              queryServer.transactions[trxId].rollback(e as any);
              throw e;
            }
          };
        }

        return async (...args: any[]) => {
          const trxId = await fetch(`/api/transaction`, {
            method: 'POST',
            body: JSON.stringify({
              action: 'start',
              maxWait: args[1]?.maxWait,
              timeout: args[1]?.timeout,
              isolationLevel: args[1]?.isolationLevel,
            }),
          })
            .then((r) => r.json())
            .then((r: any) => r.data.transactionId);

          try {
            const result = await args[0](getQueryProxy(trxId));

            await fetch(`/api/transaction`, {
              method: 'POST',
              body: JSON.stringify({
                action: 'commit',
                id: trxId,
              }),
            });

            return result;
          } catch (e) {
            await fetch(`/api/transaction`, {
              method: 'POST',
              body: JSON.stringify({
                action: 'rollback',
                id: trxId,
              }),
            });

            throw e;
          }
        };
      }

      if (proxies.hasOwnProperty(model)) {
        return proxies[model];
      }

      proxies[model] = new Proxy(
        {},
        {
          get(__, method: string): any {
            if (!queryMethods.has(method) && !mutationMethods.has(method)) {
              throw new Error(`Unsupported method: ${method}`);
            }

            const isSubscription = method.startsWith('subscribe');

            if (isServer) {
              const trx = trxId ? queryServer.transactions[trxId] : undefined;

              return (...args: any[]) => {
                if (queryMethods.has(method)) {
                  return queryServer.find(
                    {
                      type: (!isSubscription
                        ? method
                        : _.camelCase(
                            method.replace('subscribe', '')
                          )) as QueryType,
                      model: model as ModelNames,
                      query: JSON.parse(JSON.stringify(args[0] ?? {})),
                      subscribe: isSubscription,
                    },
                    args[1],
                    trx?.trx
                  );
                }

                return queryServer.mutate(
                  {
                    type: method as MutationType,
                    model: model as ModelNames,
                    query: JSON.parse(JSON.stringify(args[0] ?? {})),
                  },
                  args[1]?.session,
                  args[1]?.emitEvents,
                  trx?.trx
                );
              };
            }

            return async (...args: any[]) => {
              const query = args[0] ?? {};

              if (queryMethods.has(method)) {
                if (!method.startsWith('subscribe')) {
                  if (method === 'findMany' || method === 'groupBy') {
                    const count = await fetch(
                      `/api/query?query=${JSON.stringify({
                        type: 'count',
                        model: model as ModelNames,
                        subscribe: false,
                        query: _.pick(query, 'where'),
                        trxId,
                      })}`
                    ).then((r) => r.json());

                    return new NormalQueryPaginated(count, {
                      type: method as QueryType,
                      model: model as ModelNames,
                      subscribe: false,
                      query,
                    });
                  }

                  return fetch(
                    `/api/query?query=${JSON.stringify({
                      type: method as QueryType,
                      model: model as ModelNames,
                      subscribe: false,
                      query,
                      trxId,
                    })}`
                  ).then((r) => r.json());
                }

                if (
                  method === 'subscribeFindMany' ||
                  method === 'subscribeGroupBy'
                ) {
                  const count = await fetch(
                    `/api/query?query=${JSON.stringify({
                      type: 'count',
                      model: model as ModelNames,
                      subscribe: false,
                      query: _.pick(query, 'where'),
                    })}`
                  ).then((r) => r.json());

                  return new LiveQueryPaginatedClient(
                    count,
                    model as ModelNames,
                    _.camelCase(method.replace('subscribe', '')) as QueryType,
                    args[0] ?? {}
                  );
                }

                return new LiveQueryClient(
                  model as ModelNames,
                  _.camelCase(method.replace('subscribe', '')) as QueryType,
                  args[0] ?? {}
                );
              }

              return fetch(`/api/query`, {
                method: 'POST',
                body: JSON.stringify({
                  type: method as MutationType,
                  model: model as ModelNames,
                  query: args[0] ?? {},
                  emitEvents: args[1]?.emitEvents,
                  trxId,
                }),
              }).then((r) => r.json());
            };
          },
        }
      );

      return proxies[model];
    },
  });
}

export const queryProxy = getQueryProxy();
