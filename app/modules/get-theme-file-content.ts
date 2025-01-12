import { getShopifyGQLClient } from '~/modules/shopify.server';
import type { Session } from '~/shopify-api/lib';

export async function getThemeFileContent(
  path: string,
  session: Session
): Promise<string | null> {
  const gql = getShopifyGQLClient(session);

  const asset = await gql.query<Record<string, any>>({
    data: `#graphql
    query {
      themes(first: 1, roles: [MAIN]) {
        edges {
          node {
            id
            files(filenames: ["${path}"], first: 1) {
              edges {
                node {
                  body {
                    ...on OnlineStoreThemeFileBodyText {
                      content
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `,tries:20
  });

  return (
    asset.body.data.themes?.edges?.[0].node.files.edges[0]?.node.body.content ??
    null
  );
}

export async function getThemeFileInfo(
  path: string,
  session: Session
): Promise<{
  contentType: string;
  checksumMd5: string;
  createdAt: string;
  updatedAt: string;
  size: number;
} | null> {
  const gql = getShopifyGQLClient(session);

  const asset = await gql.query<Record<string, any>>({
    data: `#graphql
    query {
      themes(first: 1, roles: [MAIN]) {
        edges {
          node {
            files(filenames: ["${path}"], first: 1) {
              edges {
                node {
                  contentType
                  checksumMd5
                  createdAt
                  updatedAt
                  size
                }
              }
            }
          }
        }
      }
    }
    `,tries:20
  });

  return (
    asset.body.data.themes?.edges?.[0]?.node?.files?.edges[0]?.node ?? null
  );
}

export async function getThemeInfo(session: Session): Promise<{
  id: string;
  name: string;
  themeStoreId: string | null;
}> {
  const gql = getShopifyGQLClient(session);

  const asset = await gql.query<Record<string, any>>({
    data: `#graphql
    query {
      themes(first: 1, roles: [MAIN]) {
        nodes{
          id
          name
          themeStoreId
        }
      }
     }
    `,tries:20
  });

  return asset.body.data.themes?.nodes[0] ?? null;
}


