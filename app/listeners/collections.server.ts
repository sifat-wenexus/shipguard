import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';

async function upsert({
  ctx: { shop, payload: _payload },
}: WebhookListenerArgs) {
  if (!_payload) {
    return;
  }

  const store = await prisma.store.findFirstOrThrow({
    where: {
      domain: shop,
    },
  });

  const payload = _payload as Record<string, any>;

  await prisma.collection.upsert({
    where: {
      id: payload.admin_graphql_api_id,
    },
    create: {
      id: payload.admin_graphql_api_id,
      storeId: store.id,
      title: payload.title,
      featuredImage: payload.image?.src,
    },
    update: {
      title: payload.title,
      featuredImage: payload.image?.src,
    },
  });
}

emitter.on('COLLECTIONS_UPDATE', async (args: WebhookListenerArgs) => {
  await upsert(args);

  const payload = args.ctx.payload as Record<string, any>;

  if (!payload || !args.ctx.session) {
    return;
  }

  const store = await prisma.store.findFirstOrThrow({
    where: {
      domain: args.ctx.shop,
    },
  });

  await prisma.job.create({
    data: {
      storeId: store.id,
      name: 'update-product-collection',
      payload: {
        collectionId: payload.admin_graphql_api_id,
      },
    },
  });
});

emitter.on('COLLECTIONS_CREATE', upsert);
emitter.on('COLLECTIONS_DELETE', async ({ ctx: { payload } }) => {
  if (!payload) {
    return;
  }

  await prisma.collection.delete({
    where: {
      id: `gid://shopify/Collection/${payload.id}`,
    },
  });
});
