import { getShopifyGQLClient } from '~/modules/shopify.server';
import type { Session } from '~/shopify-api/lib';

interface ThemeInfo {
  id: string;
  name: string;
  themeStoreId: string | null;
}

interface ThemeFileInfo {
  contentType: string;
  checksumMd5: string;
  createdAt: string;
  updatedAt: string;
  size: number;
}

export class Theme {
  private static readonly cache: Record<
    string,
    Record<string, { value: any; timeoutId: NodeJS.Timeout }>
  > = {};

  private static async getCachedValue<R>(
    storeId: string,
    key: string,
    fn: () => R
  ): Promise<R> {
    const cache = this.cache[storeId!] ?? {};

    if (cache.hasOwnProperty(key)) {
      return cache[key].value;
    }

    const value = await fn();

    if (cache[key]) {
      clearTimeout(cache[key].timeoutId);
    }

    cache[key] = {
      value,
      timeoutId: setTimeout(() => {
        delete cache[key];
      }, 1000 * 60 * 5),
    };

    this.cache[storeId!] = cache;

    return value;
  }

  static async info(session: Session): Promise<ThemeInfo> {
    return this.getCachedValue(session.storeId!, 'info', async () => {
      const gql = getShopifyGQLClient(session);

      const asset = await gql.query<Record<string, any>>({
        data: `#graphql
        query {
          themes(first: 1, roles: [MAIN]) {
            edges {
              node {
                id
                name
                themeStoreId
              }
            }
          }
        }
        `,
        tries: 20,
      });

      const themeInfo = asset.body.data.themes?.edges?.[0].node;

      if (!themeInfo) {
        throw new Error('Theme not found');
      }

      return {
        id: themeInfo.id,
        name: themeInfo.name,
        themeStoreId: themeInfo.themeStoreId,
      };
    });
  }

  static async fileInfo(
    session: Session,
    path: string
  ): Promise<ThemeFileInfo | null> {
    return this.getCachedValue(
      session.storeId!,
      `file-info:${path}`,
      async () => {
        const gql = getShopifyGQLClient(session);

        const asset = await gql.query<Record<string, any>>({
          data: {
            query: `#graphql
            query($path: String!) {
              themes(first: 1, roles: [MAIN]) {
                edges {
                  node {
                    files(filenames: [$path], first: 1) {
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
            `,
            variables: {
              path,
            },
          },
          tries: 20,
        });

        return (
          asset.body.data.themes?.edges?.[0]?.node?.files?.edges[0]?.node ??
          null
        );
      }
    );
  }

  static async fileContent(session: Session, path: string) {
    return this.getCachedValue(
      session.storeId!,
      `file-content:${path}`,
      async () => {
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
        `,
          tries: 20,
        });

        return (
          asset.body.data.themes?.edges?.[0].node.files.edges[0]?.node.body
            .content ?? null
        );
      }
    );
  }
}
