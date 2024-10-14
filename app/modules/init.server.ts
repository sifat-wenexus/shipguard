import { findOfflineSession } from '~/modules/find-offline-session.server';
import { queryProxy } from '~/modules/query/query-proxy';
import { Migration } from '~/modules/migration.server';
import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import _ from 'lodash';

async function init() {
  const app = await prisma.app.findFirst();

  if (app?.url !== process.env.APP_URL) {
    const query = await queryProxy.store.findMany({
      select: { domain: true },
      orderBy: [{ id: 'asc' }],
    });

    query.addListener(async (data) => {
      for (const { domain } of data) {
        try {
          const session = await findOfflineSession(domain);

          await shopify.registerWebhooks({ session });
          await Migration.updateAppUrl(session);
        } catch (e) {
          console.error(e);
        }
      }

      if (query.hasNext) {
        query.next();
      } else {
        await prisma.app.upsert({
          where: { id: 1 },
          create: { id: 1, url: process.env.APP_URL! },
          update: { id: 1, url: process.env.APP_URL },
        });
      }
    });
  }

  const aStore = await prisma.store.findFirst();

  if (!aStore) {
    return;
  }

  const aSession = await findOfflineSession(aStore.domain);

  if (!aSession) {
    return;
  }

  const lastMigrationId = _.last(new Migration(aSession).order)?.id;

  const query = await queryProxy.store.findMany({
    select: { id: true, domain: true },
    where: {
      OR: [
        {
          lastMigrationId: {
            not: lastMigrationId,
          },
        },
        {
          lastMigrationId: null,
        },
      ],
    },
    orderBy: [{ id: 'asc' }],
  });

  query.addListener(async (data) => {
    for (const { domain } of data) {
      try {
        const session = await findOfflineSession(domain);
        await Migration.attempt(session);
      } catch (e) {
        console.error(e);
      }
    }

    if (query.hasNext) {
      query.next();
    }
  });
}

init();
