import { performBulkOperation } from '~/modules/perform-bulk-operation.server';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import { jobRunner } from '~/modules/job/job-runner.server';
import { prisma } from '~/modules/prisma.server';
import { Job } from '~/modules/job/job';

interface Result {
  imported: number;
}

interface Payload {
  productJobId: number;
}

export class ImportCollections extends Job<Result, Payload> {
  async execute() {
    const store = await prisma.store.findUniqueOrThrow({
      where: { id: this.job.storeId! },
      select: {
        domain: true,
        id: true,
      },
    });

    const session = await findOfflineSession(store.domain);

    await this.updateProgress(10);

    const { data: collections } = await performBulkOperation(
      session,
      `#graphql
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
    `
    );

    if (collections.length === 0) {
      return {
        imported: 0,
      };
    }

    await this.updateProgress(60);

    await prisma.collection.createMany({
      data: collections.map((c) => ({
        id: c.id,
        title: c.title,
        featuredImage: c.image?.url,
        storeId: store.id,
      })),
    });

    await jobRunner.resume(this.job.payload.productJobId);

    return {
      imported: collections.length,
    };
  }
}
