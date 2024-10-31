import { getShopifyGQLClient } from './shopify.server';
import type { Session } from '~/shopify-api/lib';
import { prisma } from './prisma.server';

export async function upsertStore(session: Session) {
  try {
    const hasStore = await prisma.store.findFirst({
      where: {
        domain: session.shop,
      },
      select: {
        id: true,
      },
    });

    if (!hasStore) {
      console.log(`Initializing store ${session.shop}`);
    } else {
      console.log(`Updating store ${session.shop}`);
    }

    const client = getShopifyGQLClient(session);

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

    const store = await prisma.store.upsert({
      where: {
        domain: session.shop,
      },
      create: {
        id: body.data.shop.id,
        timezoneId: body.data.shop.ianaTimezone,
        domain: session.shop,
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
      update: {
        timezoneId: body.data.shop.ianaTimezone,
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

    session.storeId = store.id;

    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        storeId: store.id,
      },
    });

    if (!hasStore) {
      await prisma.store.update({
        where: {
          domain: session.shop,
        },
        data: {
          appStatus: 'READY',
        },
      });

      console.log(`Initialized store ${session.shop}`);
    }

    return store;
  } catch (err) {
    console.error('store event error:', err);
  }
}
