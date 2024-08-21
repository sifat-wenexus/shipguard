import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';

export async function findOfflineSession(shop: string) {
  const session = await prisma.session.findFirstOrThrow({
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

  return shopify.sessionStorage.rowToSession(session);
}
