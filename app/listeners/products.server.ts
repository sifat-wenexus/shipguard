import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';

async function handleWebhook({
  storeId,
  payload: _payload,
}: WebhookListenerArgs) {
  if (!_payload) {
    return;
  }

  const payload = _payload as Record<string, any>;

  const product = await prisma.product.findUnique({
    where: {
      id: payload.admin_graphql_api_id,
    },
    select: {
      id: true,
      shopifyUpdatedAt: true,
    },
  });

  const updatedAt =
    new Date(payload.updated_at || payload.createdAt) || new Date();
  if (!product) {
    await prisma.product.create({
      data: {
        storeId,
        id: payload.admin_graphql_api_id,
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
        shopifyUpdatedAt: payload.updated_at,
        Variants: {
          createMany: {
            data: payload.variants.map((variant) => ({
              id: variant.admin_graphql_api_id,
              title: variant.title,
              price: variant.price,
              sku: variant.sku ?? undefined,
              compareAtPrice: variant.compare_at_price ?? undefined,
              inventoryQuantity: variant.inventory_quantity,
              sellableOnlineQuantity: variant.inventory_quantity,
              featuredImage: variant.image_id
                ? payload.images.find((image) => image.id === variant.image_id)
                    ?.src
                : undefined,
            })),
            skipDuplicates: true,
          },
        },
      },
    });
  } else if (
    product &&
    (!product.shopifyUpdatedAt ||
      product.shopifyUpdatedAt.getTime() < updatedAt.getTime())
  ) {
    await prisma.product.update({
      where: {
        id: payload.admin_graphql_api_id,
      },
      data: {
        shopifyUpdatedAt: payload.updated_at,
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
          connectOrCreate: payload.variants.map((variant) => ({
            where: {
              id: variant.admin_graphql_api_id,
            },
            create: {
              id: variant.admin_graphql_api_id,
              title: variant.title,
              price: variant.price,
              sku: variant.sku ?? undefined,
              compareAtPrice: variant.compare_at_price ?? undefined,
              inventoryQuantity: variant.inventory_quantity,
              sellableOnlineQuantity: variant.inventory_quantity,
              featuredImage: variant.image_id
                ? payload.images.find((image) => image.id === variant.image_id)
                    ?.src
                : undefined,
            },
          })),
          update: payload.variants.map((variant) => ({
            where: {
              id: variant.admin_graphql_api_id,
            },
            data: {
              title: variant.title,
              price: variant.price,
              sku: variant.sku ?? undefined,
              compareAtPrice: variant.compare_at_price ?? undefined,
              inventoryQuantity: variant.inventory_quantity,
              sellableOnlineQuantity: variant.inventory_quantity,
              featuredImage: variant.image_id
                ? payload.images.find((image) => image.id === variant.image_id)
                    ?.src
                : undefined,
            },
          })),
        },
      },
    });
  } else {
    console.log(
      `Product ${payload.admin_graphql_api_id} is up to date, skipping`
    );
  }
}

emitter.on('PRODUCTS_UPDATE', handleWebhook);
emitter.on('PRODUCTS_CREATE', handleWebhook);
emitter.on('PRODUCTS_DELETE', async ({ payload }) => {
  if (!payload) {
    return;
  }

  await prisma.product.deleteMany({
    where: {
      id: `gid://shopify/Product/${payload.id}`,
    },
  });
});
