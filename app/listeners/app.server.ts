import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { gcloudStorage } from '~/modules/gcloud-storage.server';
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
    if (session) {
      await prisma.session.deleteMany({ where: { shop } });
    }

    const files = await prisma.file.findMany({
      where: { Store: { domain: shop } },
    });

    const bucket = gcloudStorage.bucket(process.env.GC_STORAGE_BUCKET_NAME!);

    for (const file of files) {
      await bucket.file(file.id).delete();
    }

    await prisma.store.deleteMany({ where: { domain: shop } });
    await prisma.session.deleteMany({ where: { shop } });
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
