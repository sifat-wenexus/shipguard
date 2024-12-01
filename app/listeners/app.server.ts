import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { jobRunner } from '~/modules/job/job-runner.server';
import { getMailer } from '~/modules/get-mailer.server';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';

emitter.on(
  'APP_UNINSTALLED',
  async ({ shop, storeId }: WebhookListenerArgs) => {
    console.log(`App uninstalled for shop: ${shop}`);

    await jobRunner.cancel({
      storeId,
    });

    await prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        uninstalledAt: new Date(),
        PackageProtection: {
          update: {
            enabled: false,
          },
        },
      },
    });

    try {
      await prisma.session.deleteMany({
        where: { storeId },
      });
    } catch (err) {
      console.error('Error while deleting session', err);
    }
  }
);

emitter.on('SHOP_REDACT', async ({ storeId }: WebhookListenerArgs) => {
  // Delete shop data after 25 days
  jobRunner.run({
    storeId,
    name: 'shop-redact',
    scheduleAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25),
  });
});

emitter.on(
  'CUSTOMERS_DATA_REQUEST',
  async ({ payload, storeId }: WebhookListenerArgs) => {
    const customerId = (payload as any).customer.id;
    const ordersRequested = (payload as any).orders_requested as
      | string[]
      | undefined;

    const store = await prisma.store.findUniqueOrThrow({
      where: { id: storeId },
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
  async ({ payload, storeId }: WebhookListenerArgs) => {
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
        storeId,
        orderId: {
          in: ordersToRedact.map((id) => `gid://shopify/Order/${id}`),
        },
      },
    });
  }
);
