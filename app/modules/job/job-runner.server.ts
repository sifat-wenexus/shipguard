import { emitter } from '~/modules/emitter.server';
import { jobExecutors } from '~/jobs/index.server';
import { prisma } from '~/modules/prisma.server';

let isRunning = false;
const batchSize = 20;

async function run() {
  const jobs = await prisma.job.findMany({
    where: {
      status: 'CREATED',
    },
    orderBy: {
      id: 'desc',
    },
    take: batchSize,
    distinct: ['storeId'],
  });

  await prisma.job.updateMany({
    where: {
      id: {
        in: jobs.map((job) => job.id),
      },
    },
    data: {
      status: 'RUNNING',
    },
  });

  await Promise.all(
    jobs.map(async (job) => {
      const jobInstance = new jobExecutors[job.name](job);

      await jobInstance.run();

      emitter.emit(`${job.storeId}.job.${job.name}.completed`, job);
    })
  );
}

setInterval(async () => {
  if (isRunning) {
    return;
  }

  isRunning = true;

  await run();

  isRunning = false;
}, 500);
