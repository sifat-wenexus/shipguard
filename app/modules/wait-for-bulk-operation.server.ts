import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { emitter } from '~/modules/emitter.server';

export function waitForBulkOperation(operationId: string) {
  return new Promise<WebhookListenerArgs>((resolve) => {
    emitter.once(`bulk-operation.${operationId}.finished`, resolve);
  });
}
