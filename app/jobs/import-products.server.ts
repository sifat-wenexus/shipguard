import { bulkOperationManager } from '~/modules/bulk-operation-manager.server';
import { prisma } from '~/modules/prisma.server';
import { Job } from '~/modules/job/job';
import chalk from 'chalk';
import _ from 'lodash';

interface Payload {
  collectionIds?: string[];
  productIds?: string[];
}

export class ImportProducts extends Job<Payload> {
  steps = [
    'validate',
    'fetchCollections',
    'importCollections',
    'fetchProducts',
    'importProducts',
  ];

  async validate() {
    if (!this.job.storeId) {
      return this.cancelExecution({
        imported: 0,
        reason: 'Missing storeId',
      });
    }

    console.log(
      `[${chalk.blueBright('import-products')}]`,
      `Running for store: ${this.job.storeId}`
    );
  }

  async fetchCollections() {
    const ids = this.job.payload?.collectionIds;
    let query = '';

    if (ids) {
      if (ids.length === 0) {
        return {
          imported: 0,
        };
      }

      query = ids.map((id) => `id:${id}`).join(' OR ');

      console.log(
        `[${chalk.blueBright('import-products')}]`,
        `Fetching collections by IDs, total: ${ids.length}`
      );
    } else {
      console.log(
        `[${chalk.blueBright('import-products')}]`,
        `Fetching all collections`
      );
    }

    await this.performShopifyBulkQuery(`#graphql
    {
      collections(query: "${query}") {
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
    this.pauseExecution();
  }

  async importCollections() {
    await this.updateProgress(20);

    const collections =
      await this.getResult<Record<string, any>[]>('fetchCollections');

    if (!collections?.length) {
      console.log(
        `[${chalk.blueBright('import-products')}]`,
        `No collections found`
      );

      return {
        imported: 0,
      };
    }

    console.log(
      `[${chalk.blueBright('import-products')}]`,
      `Importing collections, total: ${collections.length}`
    );

    await this.updateProgress(30);

    await prisma.$transaction(
      async (trx) => {
        for (const collection of collections) {
          await trx.collection.upsert({
            select: { id: true },
            where: {
              id: collection.id,
            },
            create: {
              id: collection.id,
              title: collection.title,
              featuredImage: collection.image?.url,
              storeId: this.job.storeId!,
            },
            update: {
              title: collection.title,
              featuredImage: collection.image?.url,
            },
          });
        }
      },
      {
        timeout: 600000,
        maxWait: 600000,
      }
    );

    await this.updateProgress(40);

    return {
      imported: collections.length,
    };
  }

  async fetchProducts() {
    const ids = this.job.payload?.productIds;
    let query = '';

    if (ids) {
      if (ids.length === 0) {
        return {
          imported: 0,
        };
      }

      query = ids.map((id) => `id:${id}`).join(' OR ');

      console.log(
        `[${chalk.blueBright('import-products')}]`,
        `Fetching products by IDs, total: ${ids.length}`
      );
    }

    await this.performShopifyBulkQuery(`#graphql
    {
      products(query: "${query}") {
        edges {
          node {
            id
            handle
            title
            status
            vendor
            tags
            productType
            updatedAt
            createdAt
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
    `);

    await this.updateProgress(50);
    this.pauseExecution();
  }

  async importProducts() {
    await this.updateProgress(60);

    const nodes = await this.getResult<Record<string, any>[]>('fetchProducts');

    if (!nodes?.length) {
      console.log(
        `[${chalk.blueBright('import-products')}]`,
        `No products found`
      );

      return {
        imported: 0,
      };
    }

    const products = bulkOperationManager.stitchResult(nodes);

    console.log(
      `[${chalk.blueBright('import-products')}]`,
      `Importing products, total products: ${products.length}, total variants: ${products.reduce((acc, p) => acc + p.productVariants.length, 0)}`
    );

    await this.updateProgress(70);

    const chunks = _.chunk(products, 300);
    const totalChunks = chunks.length;

    console.log(
      `[${chalk.blueBright('import-products')}]`,
      `Chunks: ${totalChunks}`
    );

    for (let i = 0; i < totalChunks; i++) {
      const payloads = chunks[i].map((product) => ({
        select: { id: true },
        where: {
          id: product.id,
        },
        create: {
          id: product.id,
          storeId: this.job.storeId!,
          title: product.title,
          handle: product.handle,
          productType: product.productType,
          status: product.status === 'ACTIVE' ? 'PUBLISHED' : product.status,
          vendor: product.vendor,
          tags: product.tags,
          featuredImage: product.featuredImage?.url,
          shopifyUpdatedAt:
            product.updatedAt || product.createdAt || new Date(),
          Collections: product.collections
            ? {
                connect: product.collections.map((c) => ({ id: c.id })),
              }
            : undefined,
          Variants: {
            createMany: {
              data: product.productVariants.map((v) => ({
                id: v.id,
                title: v.title,
                sku: v.sku,
                price: v.price || v.compareAtPrice || 0,
                compareAtPrice: v.compareAtPrice || v.price || 0,
                inventoryQuantity: v.inventoryQuantity,
                sellableOnlineQuantity: v.sellableOnlineQuantity,
                featuredImage: v.image?.url || null,
              })),
              skipDuplicates: true,
            },
          },
        },
        update: {
          title: product.title,
          handle: product.handle,
          productType: product.productType,
          status: product.status === 'ACTIVE' ? 'PUBLISHED' : product.status,
          vendor: product.vendor,
          tags: product.tags,
          featuredImage: product.featuredImage?.url,
          shopifyUpdatedAt:
            product.updatedAt || product.createdAt || new Date(),
          Collections: product.collections
            ? {
                set: product.collections.map((c) => ({ id: c.id })),
              }
            : undefined,
          Variants: {
            connectOrCreate: product.productVariants.map((v) => ({
              where: { id: v.id },
              create: {
                id: v.id,
                title: v.title,
                sku: v.sku,
                price: v.price || v.compareAtPrice || 0,
                compareAtPrice: v.compareAtPrice || v.price || 0,
                inventoryQuantity: v.inventoryQuantity,
                sellableOnlineQuantity: v.sellableOnlineQuantity,
                featuredImage: v.image?.url || null,
              },
            })),
            deleteMany: {
              id: {
                notIn: product.productVariants.map((v) => v.id),
              },
            },
          },
        },
      }));

      await prisma.$transaction(
        (trx) =>
          Promise.all(payloads.map((payload) => trx.product.upsert(payload))),
        {
          timeout: 600000,
          maxWait: 600000,
        }
      );

      console.log(
        `[${chalk.blueBright('import-products')}]`,
        `Chunk: ${i + 1}/${totalChunks} done`
      );
    }

    console.log(
      `[${chalk.blueBright('import-products')}]`,
      `Importing products done`
    );

    return {
      imported: products.length,
    };
  }
}
