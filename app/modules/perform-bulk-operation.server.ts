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
  R = W extends true ? BulkOperationResultWait : BulkOperationResult,
>(session: Session, query: string, wait: W): Promise<R> {
  const client = getShopifyGQLClient(session);

  const response = await client.query<Record<string, any>>({
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
    tries: 20,
  });

  const { userErrors, bulkOperation } = response.body.data.bulkOperationRunQuery;

  if (userErrors?.length) {
    throw userErrors;
  }

  const operationId = bulkOperation.id;

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

export async function fetchBulkOperationData<D = any>(
  operationId: string,
  session: Session
): Promise<D[]> {
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

async function uploadVariables(
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

export async function performBulkMutation<
  W extends boolean,
  R = W extends true ? BulkOperationResultWait : BulkOperationResult,
>(session: Session, mutation: string, variables: any[], wait: W): Promise<R> {
  const client = getShopifyGQLClient(session);

  const key = await uploadVariables(session, variables);

  const response = await client.query<Record<string, any>>({
    data: {
      query: `#graphql
      mutation ($mutation: String!, $key: String!) {
        bulkOperationRunMutation(mutation: $mutation, stagedUploadPath: $key) {
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
        mutation,
        key,
      },
    },
  });

  const { userErrors, bulkOperation } =
    response.body.data.bulkOperationRunMutation;

  if (userErrors?.length) {
    throw userErrors;
  }

  const operationId = bulkOperation.id;

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
