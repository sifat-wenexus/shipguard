import { performBulkOperation } from '~/modules/perform-bulk-operation.server';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import { prisma } from '~/modules/prisma.server';
import { Job } from '~/modules/job-old/job';

interface Result {
  updated: number;
}

export class UpdateProductCollection extends Job<Result> {
  async execute() {
    const store = await prisma.store.findUniqueOrThrow({
      where: { id: this.row.storeId },
      select: {
        domain: true,
        id: true,
      },
    });

    const session = await findOfflineSession(store.domain);

    await this.updateProgress(8);

    const { collectionId } = this.row.payload as Record<string, any>;

    const { data: products } = await performBulkOperation(
      session,
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
      `
    );

    await this.updateProgress(50);

    await prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        Products: {
          set: products,
        },
      },
    });

    await this.updateProgress(99);

    return {
      updated: products.length,
    };
  }
}
