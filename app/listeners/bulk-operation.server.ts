import { fetchBulkOperationData } from '~/modules/perform-bulk-operation.server';
import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { jobRunner } from '~/modules/job/job-runner.server';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';

emitter.on('BULK_OPERATIONS_FINISH', async (ctx: WebhookListenerArgs) => {
  emitter.emit(
    `bulk-operation.${
      (ctx.payload as any)?.admin_graphql_api_id
    }.finished`,
    ctx
  );

  const operationId = (ctx.payload as any)?.admin_graphql_api_id;
  const jobBulkOperation = await prisma.jobBulkOperation.findUnique({
    where: {
      id: operationId,
    },
  });

  if (jobBulkOperation) {
    const data = await fetchBulkOperationData(operationId, ctx.session!);

    jobRunner.resumeExecution(jobBulkOperation.jobId, data);
  }
});
