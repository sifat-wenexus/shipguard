import { findOfflineSession } from '~/modules/find-offline-session.server';
import { gcloudStorage } from '~/modules/gcloud-storage.server';
import { queryProxy } from '~/modules/query/query-proxy';
import {prisma} from "~/modules/prisma.server";
import { Job } from '~/modules/job/job';

export class ShopRedact extends Job {
  async execute() {
    if (!this.job.storeId) {
      return 'Store ID not provided';
    }

    const store = await prisma.store.findFirst({
      where: {
        id: this.job.storeId,
      }
    });

    if (!store) {
      return 'Store not found';
    }

    const session = await findOfflineSession(store.domain);

    if (!session) {
      return 'Session not found';
    }

    await prisma.session.deleteMany({ where: { shop: store.domain } });

    const filesQuery = await queryProxy.file.findMany({
      where: { Store: { domain: store.domain } },
    });

    const bucket = gcloudStorage.bucket(process.env.GC_STORAGE_BUCKET_NAME!);

    filesQuery.addListener(async (files) => {
      for (const file of files) {
        await bucket.file(file.id).delete();
      }

      if (filesQuery.hasNext) {
        return filesQuery.next();
      }

      await prisma.store.deleteMany({ where: { domain: store.domain } });
      await prisma.session.deleteMany({ where: { shop: store.domain } });
    });
  }
}
