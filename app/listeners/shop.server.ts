import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { upsertStore } from '~/modules/init-store.server';
import { emitter } from '~/modules/emitter.server';

emitter.on('SHOP_UPDATE', async ({ session }: WebhookListenerArgs) => {
  console.log('SHOP_UPDATE', session);
  if (session) {
    const res = await upsertStore(session);

    console.log(res);
  }
});
