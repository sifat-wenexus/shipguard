import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { jobRunner } from '~/modules/job/job-runner.server';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';

async function upsert({ shop, payload: _payload }: WebhookListenerArgs) {
  if (!_payload) {
    return;
  }

  const store = await prisma.store.findFirst({
    where: {
      domain: shop,
    },
  });

  if (!store) {
    return console.error(`Store not found for ${shop}`);
  }

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

emitter.on('COLLECTIONS_UPDATE', async (ctx: WebhookListenerArgs) => {
  await upsert(ctx);

  const payload = ctx.payload as Record<string, any>;

  if (!payload || !ctx.session) {
    return;
  }

  const store = await prisma.store.findFirst({
    where: {
      domain: ctx.shop,
    },
  });

  if (!store) {
    return console.error(`Store not found for ${ctx.shop}`);
  }

  await jobRunner.run({
    name: 'update-product-collection',
    storeId: store.id,
    payload: {
      collectionId: payload.admin_graphql_api_id,
    }
  })
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
