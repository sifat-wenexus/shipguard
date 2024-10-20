import { prisma } from '~/modules/prisma.server';
import { Job } from '~/modules/job/job';

interface Payload {
  collectionId: string;
}

export class UpdateProductCollection extends Job<Payload> {
  steps = ['fetchProducts', 'updateProducts'];

  async fetchProducts() {
    if (!this.job.storeId) {
      return this.cancelExecution({
        updated: 0,
        reason: 'Missing storeId',
      });
    }

    const { collectionId } = this.job.payload;

    await this.performShopifyBulkQuery(
        `#graphql
      {
        collection(id: "${collectionId}") {
          products {
            edges {
              node {
                id
              }
            }
          }
        }
      }
      `,
    );

    await this.updateProgress(20);
    this.pauseExecution();
  }

  async updateProducts() {
    const products = await this.getResult<{ id: string }[]>('fetchProducts');
    const { collectionId } = this.job.payload;

    await this.updateProgress(50);

    await prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        Products: {
          set: products ?? [],
        },
      },
    });

    await this.updateProgress(95);

    return {
      updated: products?.length ?? 0,
    };
  }
}
