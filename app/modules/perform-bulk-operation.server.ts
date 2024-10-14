import { waitForBulkOperation } from '~/modules/wait-for-bulk-operation.server';
import { getShopifyGQLClient } from '~/modules/shopify.server';
import type { Session } from '~/shopify-api/lib';

interface BulkOperationResult {
  operationId: string;
}

interface BulkOperationResultWait {
  operationId: string;
  data: any[];
}

export async function performBulkQuery<
  W extends boolean,
  R = W extends true ? BulkOperationResultWait : BulkOperationResult
>(session: Session, query: string, wait: W): Promise<R> {
  const client = getShopifyGQLClient(session);

  const createBulkOperation = await client.query<Record<string, any>>({
    data: {
      query: `#graphql
      mutation ($query: String!) {
        bulkOperationRunQuery(query: $query) {
          bulkOperation {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
      `,
      variables: {
        query,
      },
    },
  });

  if (createBulkOperation.body.data.bulkOperationRunQuery.userErrors?.length) {
    throw createBulkOperation.body.data.bulkOperationRunQuery.userErrors;
  }

  const operationId =
    createBulkOperation.body.data.bulkOperationRunQuery.bulkOperation.id;

  if (!wait) {
    return {
      operationId,
    } as R;
  }

  await waitForBulkOperation(operationId);

  const data = await fetchBulkOperationData(operationId, session);

  return {
    operationId,
    data,
  } as R;
}

export async function fetchBulkOperationData<D = any>(operationId: string, session: Session): Promise<D[]> {
  const client = getShopifyGQLClient(session);

  const bulkOperation = await client.query<Record<string, any>>({
    data: `#graphql
    query {
      node(id: "${operationId}") {
        ... on BulkOperation {
          url
        }
      }
    }
    `,
  });

  const dataUrl = bulkOperation.body.data.node.url;

  if (!dataUrl) {
    return [];
  }

  const jsonl = await fetch(dataUrl).then((res) => res.text());
  const lines = jsonl.split('\n');

  return lines
    .filter((line) => line !== '')
    .map((line) => JSON.parse(line));
}
