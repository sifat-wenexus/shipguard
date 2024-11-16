import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import type { Session } from '~/shopify-api/lib';

const cache = {
  byShop: new Map<
    string,
    {
      session: Session;
      timestamp: number;
    }
  >(),
  byStoreId: new Map<
    string,
    {
      session: Session;
      timestamp: number;
    }
  >(),
};

export async function findOfflineSession(shop: string) {
  const cached = cache.byShop.get(shop);

  if (cached && Date.now() - cached.timestamp < 1000 * 60 * 30) {
    return cached.session;
  }

  const row = await prisma.session.findFirst({
    where: {
      shop,
      isOnline: false,
      OR: [
        {
          expires: {
            gt: new Date(),
          },
        },
        {
          expires: null,
        },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!row) {
    return null;
  }

  const session = shopify.sessionStorage.rowToSession(row);

  cache.byShop.set(shop, {
    session,
    timestamp: Date.now(),
  });

  return session;
}

export async function findOfflineSessionByStoreId(storeId: string) {
  const cached = cache.byStoreId.get(storeId);

  if (cached && Date.now() - cached.timestamp < 1000 * 60 * 30) {
    return cached.session;
  }

  const row = await prisma.session.findFirst({
    where: {
      storeId,
      isOnline: false,
      OR: [
        {
          expires: {
            gt: new Date(),
          },
        },
        {
          expires: null,
        },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!row) {
    return null;
  }

  const session = shopify.sessionStorage.rowToSession(row);

  cache.byStoreId.set(storeId, {
    session,
    timestamp: Date.now(),
  });

  return session;
}

export async function findOfflineSessionsByIds(storeIds: string[]) {
  const sessions: Record<string, Session> = {};

  for (const storeId of storeIds) {
    const session = await findOfflineSessionByStoreId(storeId);

    if (session) {
      sessions[storeId] = session;
    }
  }

  return sessions;
}
