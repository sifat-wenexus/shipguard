import { prisma } from '~/modules/prisma.server';
import { Job } from '~/modules/job/job';

export class ImportProducts extends Job {
  steps = ['fetchCollections', 'importCollections', 'fetchProducts', 'importProducts'];

  async validate() {
    if (!this.job.storeId) {
      return this.cancel({
        imported: 0,
        reason: 'Missing storeId',
      });
    }
  }

  async fetchCollections() {
    await this.performShopifyBulkQuery(`#graphql
    {
      collections {
        edges {
          node {
            id
            title
            image {
              url
            }
          }
        }
      }
    }
    `);

    await this.updateProgress(10);
    this.pause();
  }

  async importCollections() {
    await this.updateProgress(20);

    const collections = await this.getResult<Record<string, any>[]>('fetchCollections');

    if (!collections?.length) {
      return {
        imported: 0,
      };
    }

    await this.updateProgress(30);

    await prisma.collection.createMany({
      data: collections.map((c) => ({
        id: c.id,
        title: c.title,
        featuredImage: c.image?.url,
        storeId: this.job.storeId!,
      })),
    });

    await this.updateProgress(40);

    return {
      imported: collections.length,
    };
  }

  async fetchProducts() {
    await this.performShopifyBulkQuery(
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
      `,
    );

    await this.updateProgress(50);
    this.pause();
  }

  async importProducts() {
    await this.updateProgress(60);

    const nodes = await this.getResult<Record<string, any>[]>('fetchProducts');

    if (!nodes?.length) {
      return {
        imported: 0,
      };
    }

    await this.updateProgress(70);

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
        storeId: this.job.storeId!,
        title: p.title,
        handle: p.handle,
        productType: p.productType,
        status: p.status === 'ACTIVE' ? 'PUBLISHED' : p.status,
        vendor: p.vendor,
        tags: p.tags,
        featuredImage: p.featuredImage?.url,
      })),
      skipDuplicates: true,
    });

    await this.updateProgress(80);

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
      skipDuplicates: true,
    });

    return {
      imported: products.length,
    };
  }
}
