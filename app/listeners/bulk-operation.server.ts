import { bulkOperationManager } from '~/modules/bulk-operation-manager.server';
import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';

emitter.on('BULK_OPERATIONS_FINISH', async (ctx: WebhookListenerArgs) => {
  const operationId: string = (ctx.payload as any)?.admin_graphql_api_id;

  const operation = await prisma.bulkOperation.findFirst({
    where: { operationId, processed: false },
  });

  if (!operation) {
    return;
  }

  await bulkOperationManager.updateOperationInfo(operation, ctx.session);
  await bulkOperationManager.complete(operation);
});
