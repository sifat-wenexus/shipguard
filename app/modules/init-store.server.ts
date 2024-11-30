import { jobRunner } from '~/modules/job/job-runner.server';
import { getShopifyGQLClient } from './shopify.server';
import type { Session } from '~/shopify-api/lib';
import { prisma } from './prisma.server';

export async function upsertStore(session: Session, afterAuth = false) {
  try {
    const hasStore = await prisma.store.findFirst({
      where: {
        domain: session.shop,
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

    const data = {
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
    };

    if (afterAuth) {
      (data as any).installedAt = new Date();
      (data as any).uninstalledAt = null;

      if (hasStore) {
        await jobRunner.cancel({
          storeId: hasStore.id,
          name: 'shop-redact',
        });

        const orderIds = await prisma.packageProtectionOrder.findMany({
          where: {
            storeId: hasStore.id,
          },
          select: {
            orderId: true,
          }
        });

        await jobRunner.run({
          name: 'import-orders',
          storeId: hasStore.id,
          payload: {
            orderIds: orderIds.map((order) => order.orderId),
          }
        });

        await jobRunner.run({
          name: 'import-orders',
          storeId: hasStore.id,
          interval: 60 * 60 * 24,
          scheduleAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
          maxRetries: 5,
          payload: {
            since: new Date(),
          },
        });
      }
    }

    const store = await prisma.store.upsert({
      where: {
        domain: session.shop,
      },
      create: data,
      update: data,
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
