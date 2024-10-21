import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';

async function handleWebhook({ shop, payload: _payload }: WebhookListenerArgs) {
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

  await prisma.product.upsert({
    where: {
      id: payload.admin_graphql_api_id,
    },
    create: {
      id: payload.admin_graphql_api_id,
      storeId: store.id,
      title: payload.title,
      featuredImage: payload.images?.[0]?.src,
      handle: payload.handle,
      productType: payload.product_type,
      tags: payload.tags.split(', '),
      status:
        payload.status === 'active'
          ? 'PUBLISHED'
          : payload.status.toUpperCase(),
      vendor: payload.vendor,
    },
    update: {
      featuredImage: payload.images?.src,
      title: payload.title,
      handle: payload.handle,
      productType: payload.product_type,
      tags: payload.tags.split(', '),
      status:
        payload.status === 'active'
          ? 'PUBLISHED'
          : payload.status.toUpperCase(),
      vendor: payload.vendor,
      Variants: {
        deleteMany: {
          id: {
            notIn: payload.variants.map(
              (variant) => variant.admin_graphql_api_id
            ),
          },
        },
      },
    },
  });

  for (const variant of payload.variants) {
    await prisma.productVariant.upsert({
      where: {
        id: variant.admin_graphql_api_id,
      },
      create: {
        id: variant.admin_graphql_api_id,
        productId: payload.admin_graphql_api_id,
        title: variant.title,
        price: variant.price,
        sku: variant.sku ?? undefined,
        compareAtPrice: variant.compare_at_price ?? undefined,
        inventoryQuantity: variant.inventory_quantity,
        sellableOnlineQuantity: variant.inventory_quantity,
        featuredImage: variant.image_id
          ? payload.images.find((image) => image.id === variant.image_id)?.src
          : undefined,
      },
      update: {
        title: variant.title,
        price: variant.price,
        sku: variant.sku ?? undefined,
        compareAtPrice: variant.compare_at_price ?? undefined,
        inventoryQuantity: variant.inventory_quantity,
        sellableOnlineQuantity: variant.inventory_quantity,
        featuredImage: variant.image_id
          ? payload.images.find((image) => image.id === variant.image_id)?.src
          : undefined,
      },
    });
  }
}

emitter.on('PRODUCTS_UPDATE', handleWebhook);
emitter.on('PRODUCTS_CREATE', handleWebhook);
emitter.on('PRODUCTS_DELETE', async ({ payload }) => {
  if (!payload) {
    return;
  }
  try {
    const res = await prisma.product.delete({
      where: {
        id: `gid://shopify/Product/${payload.id}`,
      },
    });
    console.log(`product deleted successfully Id: ${res.id}`);
  } catch (err) {
    console.error('Error while deleting product', err);
  }
});
