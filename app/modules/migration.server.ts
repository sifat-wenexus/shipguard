import { getShopifyGQLClient, getShopifyRestClient } from './shopify.server';
import { queryProxy } from '~/modules/query/query-proxy';
import { jobRunner } from './job/job-runner.server';
import type { Session } from '~/shopify-api/lib';
import { getConfig } from './get-config.server';
import { prisma } from './prisma.server';
import _ from 'lodash';

export class Migration {
  constructor(private readonly session: Session) {}

  private readonly GQLClient = getShopifyGQLClient(this.session);
  private readonly RESTClient = getShopifyRestClient(this.session);

  public readonly order: { id: string; method: () => any }[] = [
    {
      id: 'initialization',
      method: this.initialization.bind(this),
    },
    {
      id: 'sync-collections-and-products',
      method: this.syncCollectionsAndProducts.bind(this),
    },
    {
      id: 'import-orders',
      method: this.importOrders.bind(this),
    },
  ];

  static attempt(session: Session) {
    return new Migration(session).run();
  }

  static updateAppUrl(session: Session) {
    return new Migration(session).updateAppUrl();
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

    await queryProxy.store.update({
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

            await queryProxy.store.update({
              where: {
                domain: this.session.shop,
              },
              data: {
                lastMigrationId: migration.id,
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
      await queryProxy.store.update({
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
      tries: 20,
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
      tries: 20,
    });

    if (result.body.userErrors) {
      console.error(result.body.userErrors);
    }

    return true;
  }

  //----------------------- Migration methods ------------------------------

  async initialization() {
    return this.updateAppUrl();
  }

  async importOrders() {
    const previousJob = await prisma.job.findFirst({
      where: {
        name: 'import-products',
        storeId: this.session.storeId,
      },
    });

    await jobRunner.run({
      name: 'import-orders',
      storeId: this.session.storeId,
      maxRetries: 5,
      dependencies: previousJob ? [previousJob.id] : [],
    });

    await jobRunner.run({
      name: 'import-orders',
      storeId: this.session.storeId,
      // interval: 60 * 60 * 6,
      interval:15,
      scheduleAt:new Date(Date.now() + 1000 *15),
      // scheduleAt: new Date(Date.now() + 1000 * 60 * 60 * 6),
      maxRetries: 5,
    });
  }

  syncCollectionsAndProducts() {
    return jobRunner.run({
      name: 'import-products',
      storeId: this.session.storeId,
      maxRetries: 5,
    });
  }
}
