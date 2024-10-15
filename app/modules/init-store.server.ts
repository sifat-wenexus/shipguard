import { getShopifyGQLClient } from './shopify.server';
import type { Session } from '~/shopify-api/lib';
import { prisma } from './prisma.server';
import { Migration } from '~/modules/migration.server';

export class InitStore {
  constructor(private readonly session: Session) {
  }

  async run() {
    const hasStore = await prisma.store.findFirst({
      where: {
        domain: this.session.shop,
      },
      select: {
        id: true,
      },
    });

    if (hasStore) {
      return;
    }

    console.log(`Initializing store ${this.session.shop}`);

    const client = getShopifyGQLClient(this.session);

    const { body } = await client.query<Record<string, any>>({
      data: `#graphql
      query {
        currentAppInstallation {
          id
        }

        shop {
          id
          name
          email
          description
          ianaTimezone
          currencyCode
          currencyFormats {
            moneyFormat
            moneyInEmailsFormat
            moneyWithCurrencyFormat
            moneyWithCurrencyInEmailsFormat
          }
        }
      }
      `,
      tries: 20,
    });

    const store = await prisma.store.create({
      data: {
        id: body.data.shop.id,
        timezoneId: body.data.shop.ianaTimezone,
        domain: this.session.shop,
        email: body.data.shop.email,
        name: body.data.shop.name,
        description: body.data.shop.description,
        appInstallationId: body.data.currentAppInstallation.id,
        currencyCode: body.data.shop.currencyCode,
        moneyFormat: body.data.shop.currencyFormats.moneyFormat,
        moneyInEmailsFormat: body.data.shop.currencyFormats.moneyInEmailsFormat,
        moneyWithCurrencyFormat:
        body.data.shop.currencyFormats.moneyWithCurrencyFormat,
        moneyWithCurrencyInEmailsFormat:
        body.data.shop.currencyFormats.moneyWithCurrencyInEmailsFormat,
      },
    });

    await prisma.session.update({
      where: {
        id: this.session.id,
      },
      data: {
        storeId: store.id,
      },
    });

    await prisma.store.update({
      where: {
        domain: this.session.shop,
      },
      data: {
        appStatus: 'READY',
      },
    });

    await Migration.attempt(this.session);

    console.log(`Initialized store ${this.session.shop}`);
  }
}
