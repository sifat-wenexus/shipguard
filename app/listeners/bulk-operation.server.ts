import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { emitter } from '~/modules/emitter.server';

emitter.on('BULK_OPERATIONS_FINISH', async (args: WebhookListenerArgs) => {
  emitter.emit(
    `bulk-operation.${
      (args.ctx.payload as any)?.admin_graphql_api_id
    }.finished`,
    args
  );
});
