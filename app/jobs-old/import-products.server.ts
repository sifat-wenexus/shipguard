import { performBulkOperation } from '~/modules/perform-bulk-operation.server';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import { prisma } from '~/modules/prisma.server';
import { Job } from '~/modules/job-old/job';

interface Result {
  imported: number;
}

export class ImportProducts extends Job<Result> {
  async execute() {
    const store = await prisma.store.findUniqueOrThrow({
      where: { id: this.row.storeId },
      select: {
        domain: true,
        id: true,
      },
    });

    const session = await findOfflineSession(store.domain);

    await this.updateProgress(10);

    const { data: nodes } = await performBulkOperation(
      session,
      `#graphql
      {
        products {
          edges {
            node {
              id
              handle
              title
              status
              vendor
              tags
              productType
              featuredImage {
                url
              }
              collections {
                edges {
                  node {
                    id
                  }
                }
              }
              variants {
                edges {
                  node {
                    id
                    title
                    sku
                    price
                    compareAtPrice
                    inventoryQuantity
                    sellableOnlineQuantity
                    image {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
      `
    );

    if (nodes.length === 0) {
      return {
        imported: 0,
      };
    }

    await this.updateProgress(50);

    const products: Record<string, any>[] = [];
    const collections: Record<string, any>[] = [];
    const variants: Record<string, any>[] = [];

    for (const node of nodes) {
      if (node.id.startsWith('gid://shopify/ProductVariant')) {
        variants.push(node);
      } else if (node.id.startsWith('gid://shopify/Product')) {
        products.push(node);
      } else if (node.id.startsWith('gid://shopify/Collection')) {
        collections.push(node);
      }
    }

    await prisma.product.createMany({
      data: products.map((p) => ({
        id: p.id,
        storeId: store.id,
        title: p.title,
        handle: p.handle,
        productType: p.productType,
        status: p.status === 'ACTIVE' ? 'PUBLISHED' : p.status,
        vendor: p.vendor,
        tags: p.tags,
        featuredImage: p.featuredImage?.url,
      })),
    });

    await this.updateProgress(70);

    for (const collection of collections) {
      await prisma.collection.update({
        where: {
          id: collection.id,
        },
        data: {
          Products: {
            connect: {
              id: collection.__parentId,
            },
          },
        },
      });
    }

    await this.updateProgress(90);

    await prisma.productVariant.createMany({
      data: variants.map((v) => ({
        id: v.id,
        productId: v.__parentId,
        title: v.title,
        sku: v.sku === '' ? undefined : v.sku,
        price: v.price,
        compareAtPrice: v.compareAtPrice ?? undefined,
        inventoryQuantity: v.inventoryQuantity,
        sellableOnlineQuantity: v.sellableOnlineQuantity,
        featuredImage: v.image?.url,
      })),
    });

    return {
      imported: products.length,
    };
  }
}
