import { findOfflineSessionByStoreId } from '~/modules/find-offline-session.server';
import type { BulkOperation, BulkOperationType } from '#prisma-client';
import type { RequestReturn, Session } from '~/shopify-api/lib';
import { getShopifyGQLClient } from '~/modules/shopify.server';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';
import _ from 'lodash';

interface BulkOperationResultWait {
  operation: BulkOperation;
  data: any[];
}

interface Operations {
  scheduled: Set<BulkOperation>;
  current: BulkOperation | null;
}

class BulkOperationError extends Error {
  constructor(public readonly operation: BulkOperation) {
    super(operation.error?.toString() ?? 'Bulk operation failed');
  }
}

export class BulkOperationManager {
  constructor() {
    setTimeout(async () => {
      await this.load();
      await this.run();
      await this.pollInfo();
    }, 10000);

    emitter.on('store.delete', async (storeId: string) => {
      if (this.operations[storeId]) {
        delete this.operations[storeId];
      }
    });
  }

  private operations: Record<string, Operations> = {};
  private finishedStatuses = new Set([
    'COMPLETED',
    'FAILED',
    'CANCELLED',
    'EXPIRED',
  ]);

  private async pollInfo() {
    const storeIds = Object.keys(this.operations);

    await Promise.allSettled(
      storeIds.map(async (storeId) => {
        const operations = this.operations[storeId];

        if (
          !operations ||
          !operations.current ||
          operations.current.processed ||
          !operations.current.operationId
        ) {
          return;
        }

        const operation = await this.updateOperationInfo(operations.current);

        if (this.finishedStatuses.has(operation.status)) {
          await this.complete(operation);
        }
      })
    );

    setTimeout(() => this.pollInfo(), 1000);
  }

  async updateOperationInfo(
    idOrOperation: number | BulkOperation,
    session?: Session
  ): Promise<BulkOperation> {
    let operation: BulkOperation;

    if (typeof idOrOperation === 'number') {
      operation = await prisma.bulkOperation.findFirstOrThrow({
        where: {
          id: idOrOperation,
        },
      });
    } else {
      operation = idOrOperation;
    }

    if (!session) {
      session = await findOfflineSessionByStoreId(operation.storeId);
    }

    if (!session) {
      return prisma.bulkOperation.update({
        where: {
          id: operation.id,
        },
        data: {
          processed: true,
          status: 'EXPIRED',
          error: 'Session not found',
        },
      });
    }

    const client = getShopifyGQLClient(session);

    let response: RequestReturn<Record<string, any>>;

    try {
      response = await client.query<Record<string, any>>({
        data: `#graphql
        query {
          node(id: "${operation.operationId}") {
            ... on BulkOperation {
              id
              errorCode
              fileSize
              objectCount
              partialDataUrl
              rootObjectCount
              completedAt
              status
              url
            }
          }
        }
        `,
        tries: 20,
      });
    } catch (e: any) {
      throw e;
    }

    const bulkOperation = response.body.data.node;

    if (!bulkOperation) {
      const _operation = await prisma.bulkOperation.update({
        where: {
          id: operation.id,
        },
        data: {
          processed: true,
          status: 'EXPIRED',
          error: 'Bulk operation not found',
        },
      });

      return _.merge(operation, _operation);
    }

    const _operation = await prisma.bulkOperation.update({
      where: {
        id: operation.id,
      },
      data: {
        status: bulkOperation.status,
        errorCode: bulkOperation.errorCode ?? null,
        completedAt: bulkOperation.completedAt
          ? new Date(bulkOperation.completedAt)
          : null,
        fileSize: bulkOperation.fileSize
          ? Number(bulkOperation.fileSize)
          : null,
        url: bulkOperation.url ?? null,
        rootObjectCount: Number(bulkOperation.rootObjectCount),
        objectCount: Number(bulkOperation.objectCount),
        partialDataUrl: bulkOperation.partialDataUrl ?? null,
        processed: this.finishedStatuses.has(bulkOperation.status),
      },
    });

    return _.merge(operation, _operation);
  }

  private async load() {
    const operations = await prisma.bulkOperation.findMany({
      where: {
        nodeId: process.env.NODE_ID || 'local',
        processed: false,
      },
      orderBy: {
        id: 'asc',
      },
    });

    for (const operation of operations) {
      if (!this.operations.hasOwnProperty(operation.storeId)) {
        this.operations[operation.storeId] = {
          scheduled: new Set(),
          current: null,
        };
      }

      this.operations[operation.storeId].scheduled.add(operation);
    }
  }

  private async run(storeId?: string) {
    const storeIds = storeId ? [storeId] : Object.keys(this.operations);

    await Promise.allSettled(
      storeIds.map(async (storeId) => {
        const operations = this.operations[storeId];

        if (!operations || operations.current || !operations.scheduled.size) {
          return;
        }

        const [operation] = operations.scheduled;
        operations.scheduled.delete(operation);
        operations.current = operation;

        if (operation.status !== 'SCHEDULED') {
          return;
        }

        const session = await findOfflineSessionByStoreId(storeId);
        const client = getShopifyGQLClient(session);

        let response: RequestReturn<Record<string, any>>;

        try {
          if (operation.type === 'QUERY') {
            response = await client.query<Record<string, any>>({
              data: {
                query: `#graphql
                mutation ($query: String!) {
                  bulkOperationRunQuery(query: $query) {
                    bulkOperation {
                      id
                      errorCode
                      fileSize
                      objectCount
                      partialDataUrl
                      rootObjectCount
                      status
                      url
                    }
                    userErrors {
                      field
                      message
                    }
                  }
                }
                `,
                variables: {
                  query: operation.query,
                },
              },
              tries: 20,
            });
          } else {
            let stagedUploadPath = operation.stagedUploadPath;

            if (!stagedUploadPath) {
              stagedUploadPath = await this.uploadVariables(
                session,
                operation.variables as any[]
              );

              const _operation = await prisma.bulkOperation.update({
                where: {
                  id: operation.id,
                },
                data: {
                  stagedUploadPath,
                },
              });

              _.merge(operation, _operation);
            }

            response = await client.query<Record<string, any>>({
              data: {
                query: `#graphql
                mutation ($mutation: String!, $key: String!) {
                  bulkOperationRunMutation(mutation: $mutation, stagedUploadPath: $key) {
                    bulkOperation {
                      id
                      errorCode
                      fileSize
                      objectCount
                      partialDataUrl
                      rootObjectCount
                      status
                      url
                    }
                    userErrors {
                      field
                      message
                    }
                  }
                }
                `,
                variables: {
                  mutation: operation.query,
                  key: stagedUploadPath,
                },
              },
            });
          }
        } catch (e: any) {
          console.error(e);
          const _operation = await prisma.bulkOperation.update({
            where: {
              id: operation.id,
            },
            data: {
              processed: true,
              error: e.message,
              errorCode: 'INTERNAL_SERVER_ERROR',
              status: 'FAILED',
            },
          });
          _.merge(operation, _operation);

          return this.complete(operation);
        }

        const { userErrors, bulkOperation } =
        response.body.data.bulkOperationRunQuery ||
        response.body.data.bulkOperationRunMutation;

        if (userErrors?.length || bulkOperation?.errorCode) {
          const _operation = await prisma.bulkOperation.update({
            where: {
              id: operation.id,
            },
            data: {
              processed: true,
              error: userErrors,
              errorCode: bulkOperation?.errorCode ?? null,
              status: bulkOperation?.status || 'FAILED',
            },
          });
          _.merge(operation, _operation);

          return this.complete(operation);
        }

        const updates = await prisma.bulkOperation.update({
          where: {
            id: operation.id,
          },
          data: {
            operationId: bulkOperation.id,
            status: bulkOperation.status,
            errorCode: bulkOperation.errorCode ?? null,
            fileSize: bulkOperation.fileSize ?? null,
            url: bulkOperation.url ?? null,
            rootObjectCount: Number(bulkOperation.rootObjectCount),
            objectCount: Number(bulkOperation.objectCount),
            partialDataUrl: bulkOperation.partialDataUrl ?? null,
          },
        });

        _.merge(operation, updates);
      })
    );
  }

  async complete(operation: BulkOperation) {
    const operations = this.operations[operation.storeId];

    if (!operations) {
      return;
    }

    operations.current = null;

    if (operation.status === 'COMPLETED') {
      emitter.emitAsync(`bulk-operation.${operation.id}.finished`, operation);
      emitter.emitAsync('bulk-operation.finished', operation);
    } else {
      emitter.emitAsync(`bulk-operation.${operation.id}.failed`, operation);
      emitter.emitAsync('bulk-operation.failed', operation);
    }

    setImmediate(() => this.run(operation.storeId));
  }

  async fetchData<D = any>(
    idOrOperation: number | BulkOperation,
    session?: Session
  ): Promise<D[]> {
    let operation: BulkOperation;

    if (typeof idOrOperation === 'number') {
      operation = await prisma.bulkOperation.findFirstOrThrow({
        where: {
          id: idOrOperation,
        },
      });
    } else {
      operation = idOrOperation;
    }

    if (operation.status !== 'COMPLETED') {
      throw new Error('Bulk operation is not completed');
    }

    if (!session) {
      session = await findOfflineSessionByStoreId(operation.storeId);
    }

    const client = getShopifyGQLClient(session);

    const bulkOperation = await client.query<Record<string, any>>({
      data: `#graphql
      query {
        node(id: "${operation.operationId}") {
          ... on BulkOperation {
            url
          }
        }
      }
      `,
      tries: 20,
    });

    const dataUrl = bulkOperation.body.data.node.url;

    if (!dataUrl) {
      return [];
    }

    const jsonl = await fetch(dataUrl).then((res) => res.text());
    const lines = jsonl.split('\n');

    return lines.filter((line) => line !== '').map((line) => JSON.parse(line));
  }

  stitchResult<T = Record<string, any>>(data: Record<string, any>[]): T[] {
    if (!data.length) {
      return [];
    }

    const result: T[] = [];

    const itemsById = _.keyBy(data, 'id');

    for (const item of data) {
      if (!item.__parentId) {
        result.push(item as T);
        continue;
      }

      const parent = itemsById[item.__parentId];
      const group = _.camelCase(item.id.split('/')[3] + 's');

      if (!parent[group]) {
        parent[group] = [];
      }

      parent[group].push(item);
    }

    return result;
  }

  wait(id: number) {
    return new Promise<BulkOperation>((resolve, reject) => {
      const _resolve = (operation: BulkOperation) => {
        emitter.off(`bulk-operation.${id}.finished`, _resolve);
        emitter.off(`bulk-operation.${id}.failed`, _reject);
        resolve(operation);
      };

      const _reject = (operation: BulkOperation) => {
        emitter.off(`bulk-operation.${id}.finished`, _resolve);
        emitter.off(`bulk-operation.${id}.failed`, _reject);
        reject(new BulkOperationError(operation));
      };

      emitter.once(`bulk-operation.${id}.finished`, _resolve);
      emitter.once(`bulk-operation.${id}.failed`, _reject);
    });
  }

  private async uploadVariables(
    session: Session,
    variables: any[]
  ): Promise<string> {
    const client = getShopifyGQLClient(session);

    const stagedUpload = await client.query<Record<string, any>>({
      data: `#graphql
      mutation {
        stagedUploadsCreate(input: {
          resource: BULK_MUTATION_VARIABLES,
          filename: "bulk_mutation",
          mimeType: "text/jsonl",
          httpMethod: POST
        }) {
          stagedTargets {
            url
            resourceUrl
            parameters {
              name
              value
            }
          }
          userErrors {
            field
            message
          }
        }
      }
      `,
    });

    const { stagedTargets, userErrors } =
      stagedUpload.body.data.stagedUploadsCreate;

    if (userErrors?.length) {
      throw userErrors;
    }

    const { url, parameters } = stagedTargets[0];

    const formData = new FormData();

    for (const parameter of parameters) {
      formData.append(parameter.name, parameter.value);
    }

    const jsonl = variables.map((v) => JSON.stringify(v)).join('\n');

    formData.append('file', jsonl);

    await fetch(url, {
      method: 'POST',
      body: formData,
    });

    return parameters.find((p) => p.name === 'key')!.value;
  }

  private async execute<
    W extends boolean,
    R = W extends true ? BulkOperationResultWait : BulkOperation,
  >(
    session: Session,
    wait: W,
    type: BulkOperationType,
    query: string,
    variables?: any[]
  ): Promise<R> {
    const storeId = session.storeId!;
    const operation = await prisma.bulkOperation.create({
      data: {
        type,
        storeId,
        query,
        status: 'SCHEDULED',
        nodeId: process.env.NODE_ID || 'local',
        variables: variables || {},
      },
    });

    this.operations[storeId] = this.operations[storeId] ?? {
      scheduled: new Set(),
      current: null,
    };

    const operations = this.operations[storeId];

    operations.scheduled.add(operation);

    if (type === 'MUTATION' && variables && variables?.length > 0) {
      const _operation = await prisma.bulkOperation.update({
        where: {
          id: operation.id,
        },
        data: {
          stagedUploadPath: await this.uploadVariables(session, variables),
        },
      });

      _.merge(operation, _operation);
    }

    if (!operations.current) {
      await this.run(storeId);
    }

    if (!wait) {
      return operation as R;
    }

    await this.wait(operation.id);

    const data = await this.fetchData(operation.id, session);

    return {
      operation,
      data,
    } as R;
  }

  async query<
    W extends boolean,
    R = W extends true ? BulkOperationResultWait : BulkOperation,
  >(session: Session, query: string, wait: W): Promise<R> {
    return this.execute<W, R>(session, wait, 'QUERY', query);
  }

  async mutation<
    W extends boolean,
    R = W extends true ? BulkOperationResultWait : BulkOperation,
  >(session: Session, mutation: string, variables: any[], wait: W): Promise<R> {
    return this.execute<W, R>(session, wait, 'MUTATION', mutation, variables);
  }
}

export const bulkOperationManager = new BulkOperationManager();
