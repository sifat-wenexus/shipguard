import { getShopifyGQLClient, getShopifyRestClient } from './shopify.server';
import { emitter } from '~/modules/emitter.server';
import type { Session } from '~/shopify-api/lib';
import { getConfig } from './get-config.server';
import type { Store } from '#prisma-client';
import { prisma } from './prisma.server';
import _ from 'lodash';
import { jobRunner } from './job/job-runner.server';

export class Migration {
  constructor(private readonly session: Session) {}

  public static instance: Migration | null = null;
  private readonly GQLClient = getShopifyGQLClient(this.session);
  private readonly RESTClient = getShopifyRestClient(this.session);

  private readonly order: { id: string; method: () => any }[] = [
    {
      id: 'initialization',
      method: this.initialization.bind(this),
    },
    {
      id: 'sync-collections-and-products',
      method: this.syncCollectionsAndProducts.bind(this),
    },
  ];

  static attempt(session: Session) {
    if (!Migration.instance) {
      Migration.instance = new Migration(session);
    }

    return Migration.instance.run();
  }

  static updateAppUrl(session: Session) {
    if (!Migration.instance) {
      Migration.instance = new Migration(session);
    }

    return Migration.instance.updateAppUrl();
  }

  async run() {
    const { lastMigrationId, appStatus } = await prisma.store.findFirstOrThrow({
      where: {
        domain: this.session.shop,
      },
      select: {
        lastMigrationId: true,
        appStatus: true,
      },
    });

    if (appStatus === 'UPDATING') {
      return;
    }

    console.log(`Running migrations for ${this.session.shop}`);

    const lastMigration = _.last(this.order);

    if (lastMigrationId && lastMigrationId === lastMigration?.id) {
      // No migrations to run or all migrations have been run

      return console.log(`No migrations to run for ${this.session.shop}`);
    }

    await prisma.store.update({
      where: {
        domain: this.session.shop,
      },
      data: {
        appStatus: 'UPDATING',
      },
    });

    // If lastMigrationId is null, start from the beginning, otherwise start after the last migration that was run
    const lastIndex = lastMigrationId
      ? this.order.findIndex((o) => o.id === lastMigrationId)
      : -1;

    try {
      await prisma.$transaction(
        async (prisma) => {
          // Run all migrations after the last migration
          // If a migration fails, the transaction will be rolled back

          for (const migration of this.order.slice(lastIndex + 1)) {
            console.log(
              `Running migration ${migration.id} for ${this.session.shop}`
            );

            await migration.method();

            await prisma.store.update({
              where: {
                domain: this.session.shop,
              },
              data: {
                lastMigrationId: migration.id,
                Migrations: {
                  create: {
                    id: migration.id,
                  },
                },
              },
            });
          }
        },
        {
          timeout: 1000 * 60 * 5, // 5 minutes
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      await prisma.store.update({
        where: {
          domain: this.session.shop,
        },
        data: {
          appStatus: 'READY',
        },
      });

      console.log(`Finished migrations for ${this.session.shop}`);
    }
  }

  async getAppInstallationId() {
    const store = await prisma.store.findFirstOrThrow({
      where: {
        domain: this.session.shop,
      },
      select: {
        appInstallationId: true,
      },
    });

    return store.appInstallationId;
  }

  importProducts(store: Store) {
    return new Promise<void>(async (resolve) => {
      emitter.once(`${store.id}.job.import-products.completed`, resolve);

      await jobRunner.run({ name: 'import-products', storeId: store.id });
      // await prisma.job.create({
      //   data: {
      //     storeId: store.id,
      //     name: 'import-products',
      //   },
      // });
    });
  }

  importCollections(store: Store) {
    return new Promise<void>(async (resolve) => {
      emitter.once(`${store.id}.job.import-collections.completed`, resolve);

      await jobRunner.run({ name: 'import-collections', storeId: store.id });
      // await prisma.job.create({
      //   data: {
      //     storeId: store.id,
      //     name: 'import-collections',
      //   },
      // });
    });
  }

  //----------------------- Migration methods ------------------------------

  async updateAppUrl() {
    const config = getConfig();

    const oldValue = await this.GQLClient.query<Record<string, any>>({
      data: {
        query: `#graphql
        query {
          currentAppInstallation {
            metafield(namespace: "global", key: "app_url") {
              value
            }
          }
        }
        `,
      },
    });

    if (
      config.appUrl.toString() ===
      oldValue.body.data.currentAppInstallation.metafield?.value
    ) {
      return false;
    }

    const result = await this.GQLClient.query<Record<string, any>>({
      data: {
        query: `#graphql
        mutation (
          $ownerId: ID!,
          $appUrl: String!
        ) {
          metafieldsSet(metafields: {
            namespace: "global",
            key: "app_url",
            type: "single_line_text_field",
            ownerId: $ownerId,
            value: $appUrl
          }) {
            metafields {
              id
            }
            userErrors {
              code
            }
          }
        }
        `,
        variables: {
          ownerId: await this.getAppInstallationId(),
          appUrl: config.appUrl,
        },
      },
    });

    if (result.body.userErrors) {
      console.error(result.body.userErrors);
    }

    return true;
  }

  async initialization() {
    return this.updateAppUrl();
  }

  async syncCollectionsAndProducts() {
    const store = await prisma.store.findFirstOrThrow({
      where: {
        domain: this.session.shop,
      },
    });

    await this.importCollections(store);
    await this.importProducts(store);
  }
}
