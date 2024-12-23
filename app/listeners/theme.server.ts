import type { WebhookListenerArgs } from '~/types/webhook-listener-args';
import { jobRunner } from '~/modules/job/job-runner.server';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';

emitter.on(['THEMES_UPDATE', 'THEMES_PUBLISH'], async ({ session }: WebhookListenerArgs) => {
  if (session) {
    const jobs = await prisma.job.findMany({
      where: {
        name: 'analyze-current-theme',
      },
      select: {
        id: true,
      }
    });

    jobRunner.run({
      name: 'analyze-current-theme',
      storeId: session.storeId,
      concurrent: true,
      dependencies: jobs.map(job => job.id),
    });
  }
});
