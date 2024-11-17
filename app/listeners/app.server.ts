import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { jobRunner } from '~/modules/job/job-runner.server';
import { getMailer } from '~/modules/get-mailer.server';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';

emitter.on(
  'APP_UNINSTALLED',
  async ({ session, shop }: WebhookListenerArgs) => {
    console.log(`App uninstalled for shop: ${shop}`);
    // console.log('session :', session);
    try {
      await prisma.session.deleteMany({
        where: { storeId: session?.storeId },
      });
    } catch (err) {
      console.error('Error while deleting session', err);
    }
  }
);

emitter.on(
  'SHOP_REDACT',
  async ({ session }: WebhookListenerArgs) => {
    // Delete shop data after 25 days
    jobRunner.run({
      name: 'shop-redact',
      storeId: session?.storeId,
      scheduleAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25),
    });

    // if (session) {
    //   await prisma.session.deleteMany({ where: { shop } });
    // }
    //
    // const filesQuery = await queryProxy.file.findMany({
    //   where: { Store: { domain: shop } },
    // });
    //
    // const bucket = gcloudStorage.bucket(process.env.GC_STORAGE_BUCKET_NAME!);
    //
    // filesQuery.addListener(async (files) => {
    //   for (const file of files) {
    //     await bucket.file(file.id).delete();
    //   }
    //
    //   if (filesQuery.hasNext) {
    //     return filesQuery.next();
    //   }
    //
    //   await prisma.store.deleteMany({ where: { domain: shop } });
    //   await prisma.session.deleteMany({ where: { shop } });
    // });
  }
);

emitter.on(
  'CUSTOMERS_DATA_REQUEST',
  async ({ payload, session }: WebhookListenerArgs) => {
    const customerId = (payload as any).customer.id;
    const ordersRequested = (payload as any).orders_requested as
      | string[]
      | undefined;

    const store = await prisma.store.findUniqueOrThrow({
      where: { id: session!.storeId },
      include: {
        PackageProtectionOrders: {
          where: {
            customerId,
            orderId: ordersRequested?.length
              ? {
                  in: ordersRequested.map((id) => `gid://shopify/Order/${id}`),
                }
              : undefined,
          },
          include: {
            PackageProtectionClaimOrder: true,
          },
        },
      },
    });

    const mailer = await getMailer();

    await mailer!.sendMail({
      from: `no-reply@${process.env.INTERNAL_MAILER_DOMAIN}`,
      to: store.email!,
      text: `Customer data request for ${customerId}`,
      subject: `Customer data request for ${customerId}`,
      attachments: [
        {
          filename: 'customer-data.json',
          content: JSON.stringify(store),
          contentType: 'application/json',
          contentDisposition: 'attachment',
        },
      ],
    });
  }
);

emitter.on(
  'CUSTOMERS_REDACT',
  async ({ payload, session }: WebhookListenerArgs) => {
    const ordersToRedact = (payload as any)?.orders_to_redact as
      | string[]
      | undefined;
    const customerId = (payload as any)?.customer.id;

    if (!ordersToRedact?.length) {
      return;
    }

    await prisma.packageProtectionOrder.deleteMany({
      where: {
        customerId,
        storeId: session!.storeId,
        orderId: {
          in: ordersToRedact.map((id) => `gid://shopify/Order/${id}`),
        },
      },
    });
  }
);
