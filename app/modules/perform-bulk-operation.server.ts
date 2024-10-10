import { waitForBulkOperation } from '~/modules/wait-for-bulk-operation.server';
import { getShopifyGQLClient } from '~/modules/shopify.server';
import type { Session } from '~/shopify-api/lib';

export async function performBulkOperation(session: Session, query: string) {
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

  await waitForBulkOperation(operationId);

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
    return {
      operationId,
      dataUrl,
      data: [],
    };
  }

  const jsonl = await fetch(dataUrl).then((res) => res.text());
  const lines = jsonl.split('\n');
  const data = lines
    .filter((line) => line !== '')
    .map((line) => JSON.parse(line));

  return {
    operationId,
    dataUrl,
    data,
  };
}
