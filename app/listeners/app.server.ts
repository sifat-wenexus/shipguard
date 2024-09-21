import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { gcloudStorage } from '~/modules/gcloud-storage.server';
import { queryProxy } from '~/modules/query/query-proxy';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';

emitter.on(
  'APP_UNINSTALLED',
  async ({ ctx: { session, shop } }: WebhookListenerArgs) => {
    console.log(`App uninstalled for shop ${shop}`);

    // TODO: Move package protection products to Draft status when uninstalled
  },
);

emitter.on(
  'SHOP_REDACT',
  async ({ ctx: { session, shop } }: WebhookListenerArgs) => {
    // TODO: Redact shop data within 25 days

    if (session) {
      await prisma.session.deleteMany({ where: { shop } });
    }

    const filesQuery = await queryProxy.file.findMany({
      where: { Store: { domain: shop } },
    });

    const bucket = gcloudStorage.bucket(process.env.GC_STORAGE_BUCKET_NAME!);

    filesQuery.addListener(async (files) => {
      for (const file of files) {
        await bucket.file(file.id).delete();
      }

      if (filesQuery.hasNext) {
        return filesQuery.next();
      }

      await prisma.store.deleteMany({ where: { domain: shop } });
      await prisma.session.deleteMany({ where: { shop } });
    });
  },
);

emitter.on('CUSTOMERS_DATA_REQUEST', async ({ ctx: { shop } }: WebhookListenerArgs) => {
  // TODO: Implement customer data request handling
  console.log(`Customer data request for shop ${shop}`);
});

emitter.on('CUSTOMERS_REDACT', async ({ ctx: { shop } }: WebhookListenerArgs) => {
  // TODO: Implement customer data redact handling
  console.log(`Customer data redact for shop ${shop}`);
});
