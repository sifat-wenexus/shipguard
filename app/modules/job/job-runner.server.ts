import { bulkOperationManager } from '~/modules/bulk-operation-manager.server';
import { BulkOperation, Job, JobExecution, Prisma } from '#prisma-client';
import { createDateWithTimezone } from '../utils/date-utils';
import { bigSetTimeout } from '~/modules/big-set-timeout';
import { queryProxy } from '~/modules/query/query-proxy';
import type { JobName } from '~/jobs/index.server';
import { jobExecutors } from '~/jobs/index.server';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';

export interface JobRunnerOptions {
  name: JobName;
  storeId?: string;
  interval?: number;
  maxRetries?: number;
  scheduleAt?: Date;
  scheduledAtTimezoneId?: string;
  dependencies?: number[];
  paused?: boolean;
  concurrent?: boolean;
  priority?: number;
  payload?: (typeof jobExecutors)[JobName]['prototype']['job']['payload'];
}

class Queue {
  constructor(
    private readonly batchSize = 50,
    private readonly concurrent = false
  ) {}

  public readonly items = new Set<Job>();
  public readonly timeouts: Record<number, () => void> = {};
  public readonly ids = new Set<number>();
  public loading = false;

  get size() {
    return this.items.size;
  }

  get batch() {
    const _items = Array.from(this.items);
    const itemsByStoreId: Record<string, Set<Job>> = {};
    const storeIds = new Set<string>();
    const items: Job[] = [];

    for (const item of _items) {
      const storeId = item.storeId || '';

      storeIds.add(storeId);
      itemsByStoreId[storeId] = itemsByStoreId[storeId] || new Set();
      itemsByStoreId[storeId].add(item);
    }

    while (items.length < this.batchSize) {
      for (const storeId of storeIds) {
        const storeItems = itemsByStoreId[storeId];

        if (!storeItems.size) {
          continue;
        }

        const item = storeItems.values().next().value;
        storeItems.delete(item!);
        items.push(item!);

        if (items.length === this.batchSize) {
          break;
        }
      }

      if (items.length === this.batchSize || !this.concurrent) {
        break;
      }
    }

    return items;
  }

  async loadJobs() {
    const query = await queryProxy.job.findMany({
      where: {
        AND: [
          {
            id: { notIn: Array.from(this.ids) },
            node: process.env.NODE_ID,
            runConcurrently: this.concurrent,
            Dependencies: {
              every: {
                DependsOn: {
                  status: {
                    in: ['FINISHED', 'CANCELLED'],
                  },
                },
              },
            },
          },
          {
            OR: [
              {
                status: 'PENDING',
              },
              {
                status: 'FAILED',
                executedAt: {
                  lt: new Date(Date.now() - 20000), // Wait 20 seconds before retrying
                },
                OR: [
                  {
                    interval: {
                      not: null,
                    },
                  },
                  {
                    maxRetries: null,
                  },
                  {
                    tries: {
                      lt: queryProxy.job.fields.maxRetries,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      orderBy: [
        {
          priority: 'desc',
        },
        {
          id: 'asc',
        },
        {
          executedAt: {
            nulls: 'first',
            sort: 'asc',
          },
        },
      ],
      pageSize: 1000000,
      distinct: !this.concurrent ? ['storeId'] : undefined,
    });

    return new Promise((resolve) => {
      if (query.totalItems > 0) {
        console.log(`[Queue] Loading ${query.totalItems} jobs from database`);
      }

      query.addListener(async (jobs) => {
        await Promise.all(jobs.map(this.add.bind(this)));

        if (query.hasNext) {
          query.next();
        } else {
          resolve(undefined);
          setTimeout(() => this.loadJobs(), 2000);
        }
      });
    });
  }

  async add(job: Job, delay?: number) {
    console.log(`[Queue] Adding job ${job.id} to the queue`);

    if (delay) {
      await queryProxy.job.update({
        where: {
          id: job.id,
        },
        data: {
          status: 'SCHEDULED',
          scheduledAt: new Date(Date.now() + delay),
        },
      });

      this.timeouts[job.id] = bigSetTimeout(async () => {
        await queryProxy.job.update({
          where: {
            id: job.id,
          },
          data: {
            status: 'PENDING',
          },
        });
      }, delay);

      console.log(`[Queue] Job ${job.id} scheduled to run in ${delay}ms`);

      return;
    }

    this.items.add(job);
    this.ids.add(job.id);
  }

  remove(job: Job) {
    this.items.delete(job);
    this.ids.delete(job.id);

    console.log(`[Queue] Removed job ${job.id} from the queue`);
  }
}

export class JobRunner {
  constructor() {
    emitter.on(
      'bulk-operation.finished',
      async (operation: BulkOperation) => {
        const job = await prisma.job.findFirst({
          where: {
            bulkOperationId: operation.id,
          },
          select: {
            id: true,
          },
        });

        if (!job) {
          console.log(
            `[JobRunner] No job found for bulk operation ${operation.id}`
          );
          return;
        }

        console.log(
          `[JobRunner] Resuming job ${job.id} after bulk operation ${operation.id} finished`
        );

        try {
          const data = await bulkOperationManager.fetchData(operation);
          await jobRunner.resumeExecution(job.id, data);
        } catch (e) {
          console.error(e);
        }
      },
      {
        async: true,
      }
    );

    emitter.on(
      'bulk-operation.failed',
      async (operation: BulkOperation) => {
        const job = await prisma.job.findFirst({
          where: {
            bulkOperationId: operation.id,
          },
          select: {
            id: true,
          },
        });

        if (!job) {
          console.log(
            `[JobRunner] No job found for bulk operation ${operation.id}`
          );

          return;
        }

        console.log(
          `[JobRunner] Failing job ${job.id} after bulk operation ${operation.id} failed`
        );

        // await jobRunner.cancel([job.id]);
        await jobRunner.failJobs([job.id]);
      },
      {
        async: true,
      }
    );

    setTimeout(() => {
      this.initialize().then(() => {
        setTimeout(() => this.sequentialQueue.loadJobs(), 1000);
        setTimeout(() => this.concurrentQueue.loadJobs(), 3000);

        setTimeout(() => this.runJobs(this.sequentialQueue), 6000);
        setTimeout(() => this.runJobs(this.concurrentQueue), 9000);
        setTimeout(() => this.watchPausedStuckJobs(), 12000);
      });
    }, 10000);
  }

  public readonly concurrentQueue = new Queue(100000, true);
  public readonly sequentialQueue = new Queue(50);

  private async runJobs(queue: Queue) {
    if (queue.size === 0) {
      return setTimeout(() => this.runJobs(queue), 1000);
    }

    const { batch } = queue;

    console.log(`[Queue] taking ${batch.length} jobs from the queue.`);

    await Promise.allSettled(
      batch.map(async (job) => {
        try {
          await new jobExecutors[job.name](this, job).run();
          queue.remove(job);
        } catch (e) {
          console.error(e);
        }
      })
    );

    setTimeout(() => this.runJobs(queue), 1000);
  }

  private async watchPausedStuckJobs() {
    const query = await queryProxy.job.findMany({
      where: {
        status: 'PAUSED',
        BulkOperation: {
          processed: true,
          status: {
            in: ['COMPLETED', 'CANCELLED', 'EXPIRED', 'FAILED'],
          },
        },
      },
      include: {
        BulkOperation: true,
      },
    });

    if (query.totalItems > 0) {
      console.log(`[JobRunner] Watching ${query.totalItems} paused jobs`);
    }

    return new Promise((resolve) => {
      query.addListener(async (jobs) => {
        await Promise.all(
          jobs.map(async (job) => {
            const bulkOperation = job.BulkOperation;

            if (!bulkOperation) {
              return;
            }

            if (bulkOperation.status === 'COMPLETED') {
              try {
                const data =
                  await bulkOperationManager.fetchData(bulkOperation);
                await this.resumeExecution(job.id, data);
              } catch (e) {
                console.error(e);
              }
            } else {
              await this.cancel([job.id]);
            }
          })
        );

        if (query.hasNext) {
          query.next();
        } else {
          resolve(undefined);
          setTimeout(() => this.watchPausedStuckJobs(), 5000);
        }
      });
    });
  }

  private async initialize() {
    // Load incomplete jobs

    await queryProxy.job
      .findMany({
        where: {
          node: process.env.NODE_ID,
          status: {
            in: ['RUNNING'],
          },
        },
        orderBy: [
          {
            id: 'asc',
          },
          {
            executedAt: {
              nulls: 'first',
              sort: 'asc',
            },
          },
        ],
        pageSize: 1000000,
        distinct: ['storeId'],
      })
      .then(
        (query) =>
          new Promise((resolve) => {
            console.log(
              `[JobRunner] Loading ${query.totalItems} incomplete jobs`
            );

            query.addListener((jobs) => {
              for (const job of jobs) {
                const queue = job.runConcurrently
                  ? this.concurrentQueue
                  : this.sequentialQueue;
                queue.add(job);
              }

              if (query.hasNext) {
                query.next();
              } else {
                resolve(null);
              }
            });
          })
      );

    // Load scheduled jobs

    await queryProxy.job
      .findMany({
        include: {
          // Take the last execution
          Executions: {
            take: 1,
            orderBy: [
              {
                id: 'desc',
              },
            ],
          },
        },
        where: {
          node: process.env.NODE_ID,
          status: 'SCHEDULED',
        },
        orderBy: [
          {
            id: 'desc',
          },
          {
            executedAt: {
              nulls: 'first',
              sort: 'asc',
            },
          },
        ],
        pageSize: 1000000,
      })
      .then(
        (query) =>
          new Promise((resolve) => {
            console.log(
              `[JobRunner] Loading ${query.totalItems} scheduled jobs`
            );

            query.addListener(async (jobs) => {
              for (const job of jobs) {
                await this.scheduleJob(job, false, job.Executions[0]);
              }
            });

            if (query.hasNext) {
              query.next();
            } else {
              resolve(null);
            }
          })
      );
  }

  async scheduleJob(
    job: Job,
    ignoreScheduledAt?: boolean,
    lastExecution?: Pick<JobExecution, 'id' | 'updatedAt'>
  ): Promise<any> {
    console.log(`[JobRunner] Scheduling job ${job.id}`);

    const queue = job.runConcurrently
      ? this.concurrentQueue
      : this.sequentialQueue;
    const { scheduledAt, interval } = job;

    const scheduledConvert = scheduledAt
      ? createDateWithTimezone(
          scheduledAt,
          job.scheduledAtTimezoneId ?? 'America/New_York'
        )
      : null;
    const nowTime = createDateWithTimezone(
      new Date(),
      job.scheduledAtTimezoneId ?? 'America/New_York'
    );

    if (scheduledConvert && !interval) {
      // It's a scheduled one-time job

      if (scheduledConvert.getTime() < nowTime.getTime()) {
        // Overdue job, set the status to PENDING so it's picked up immediately

        return queryProxy.job.update({
          select: { id: true },
          where: { id: job.id },
          data: {
            status: 'PENDING',
          },
        });
      }

      // Schedule the job to run at the scheduled time

      return queue.add(job, scheduledConvert.getTime() - nowTime.getTime());
    }

    if (!interval) {
      return;
    }

    const { createdAt } = job;

    // It's a scheduled recurring job
    // Calculate the next run time

    const intervalInMs = interval * 1000;
    const isOverdue =
      !lastExecution &&
      ((scheduledConvert && scheduledConvert.getTime() < nowTime.getTime()) ||
        createdAt.getTime() + intervalInMs < Date.now());

    if (isOverdue) {
      // Overdue job, set the status to PENDING so it's picked up immediately

      return queryProxy.job.update({
        where: { id: job.id },
        data: {
          status: 'PENDING',
        },
      });
    }

    if (scheduledConvert && !ignoreScheduledAt) {
      // The job has a scheduled time, schedule it to run at the scheduled time

      return queue.add(job, scheduledConvert.getTime() - nowTime.getTime());
    }

    // Schedule the job to run at the next interval

    const lastExecutionTime =
      lastExecution?.updatedAt.getTime() || createdAt.getTime();
    const timeSinceLastExecution = Date.now() - lastExecutionTime;

    // Subtract the time since the last execution from the interval
    return queue.add(job, intervalInMs - timeSinceLastExecution);
  }

  async run(options: JobRunnerOptions) {
    const {
      name,
      interval,
      maxRetries,
      scheduleAt,
      payload,
      scheduledAtTimezoneId,
    } = options;

    const job = await queryProxy.job.create({
      data: {
        status: options.paused
          ? 'PAUSED'
          : scheduleAt
            ? 'SCHEDULED'
            : 'PENDING',
        node: process.env.NODE_ID!,
        storeId: options.storeId,
        scheduledAt: scheduleAt,
        scheduledAtTimezoneId: scheduledAtTimezoneId,
        Dependencies: {
          createMany: {
            data: (options.dependencies || []).map((id) => ({
              dependsOnId: id,
            })),
          },
        },
        priority: options.priority || 0,
        runConcurrently:
          typeof options.concurrent === 'boolean' ? options.concurrent : false,
        maxRetries,
        interval,
        payload,
        name,
      },
    });

    console.log(`[JobRunner] Created job ${job.id}`);

    if (options.paused) {
      return job;
    }

    if (scheduleAt) {
      const scheduledConvert = createDateWithTimezone(
        new Date(scheduleAt),
        job.scheduledAtTimezoneId ?? 'America/New_York'
      );
      const nowTime = createDateWithTimezone(
        new Date(),
        job.scheduledAtTimezoneId ?? 'America/New_York'
      );

      const queue = job.runConcurrently
        ? this.concurrentQueue
        : this.sequentialQueue;
      await queue.add(job, scheduledConvert.getTime() - nowTime.getTime());
    }

    return job;
  }

  async resumeExecution(
    filterOrId: number | Prisma.JobWhereInput,
    payload?: any
  ) {
    const job = await queryProxy.job.findFirst({
      where:
        typeof filterOrId === 'number'
          ? { id: filterOrId, status: 'PAUSED' }
          : {
              AND: [
                filterOrId,
                {
                  status: 'PAUSED',
                },
              ],
            },
      select: {
        id: true,
        scheduledAt: true,
        interval: true,
        Executions: {
          select: {
            id: true,
            status: true,
            step: true,
          },
          take: 1,
          orderBy: [
            {
              id: 'desc',
            },
          ],
        },
      },
    });

    if (!job) {
      return job;
    }

    console.log(`[JobRunner] Resuming job ${job.id}`);

    const execution = job.Executions?.[0];

    if (execution?.status === 'PAUSED') {
      await queryProxy.jobExecution.update({
        select: {
          id: true,
        },
        where: { id: execution.id },
        data: {
          result: payload,
          status: 'SUCCEEDED',
        },
      });
    }

    await queryProxy.job.update({
      where: { id: job.id },
      data: {
        status:
          job.Executions?.[0].status === 'PAUSED'
            ? 'PENDING'
            : job.scheduledAt || job.interval
              ? 'SCHEDULED'
              : 'PENDING',
      },
    });

    return job;
  }

  async cancel(filterOrIds: number[] | Prisma.JobWhereInput) {
    const jobs = await prisma.job.findMany({
      select: { id: true, runConcurrently: true },
      where: {
        AND: [
          Array.isArray(filterOrIds)
            ? {
                id: {
                  in: filterOrIds,
                },
              }
            : filterOrIds,

          {
            OR: [
              {
                status: {
                  in: ['SCHEDULED', 'PENDING', 'PAUSED'],
                },
              },
              {
                status: 'FAILED',
                AND: [
                  {
                    maxRetries: null,
                  },
                  {
                    tries: {
                      lt: queryProxy.job.fields.maxRetries,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    for (const job of jobs) {
      const queue = job.runConcurrently
        ? this.concurrentQueue
        : this.sequentialQueue;

      queue.timeouts[job.id]?.();
      delete queue.timeouts[job.id];

      for (const _job of queue.items) {
        if (_job.id === job.id) {
          queue.remove(_job);
          break;
        }
      }
    }

    if (Array.isArray(filterOrIds)) {
      console.log(`[JobRunner] Cancelling jobs ${filterOrIds.join(', ')}`);
    } else {
      console.log(
        `[JobRunner] Cancelling job: ${JSON.stringify(filterOrIds, null, 2)}`
      );
    }

    return await queryProxy.job.updateMany({
      select: { id: true },
      where: {
        id: {
          in: jobs.map((job) => job.id),
        },
      },
      data: {
        status: 'CANCELLED',
      },
    });
  }

  async failJobs(filterOrIds: number[] | Prisma.JobWhereInput) {
    const jobs = await prisma.job.findMany({
      select: { id: true, runConcurrently : true },
      where: {
        AND: [
          Array.isArray(filterOrIds)
            ? {
                id: {
                  in: filterOrIds,
                },
              }
            : filterOrIds,

          {
            OR: [
              {
                status: {
                  in: ['SCHEDULED', 'PENDING', 'PAUSED'],
                },
              },
              {
                status: 'FAILED',
                AND: [
                  {
                    maxRetries: null,
                  },
                  {
                    tries: {
                      lt: queryProxy.job.fields.maxRetries,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    for (const job of jobs) {
      const queue = job.runConcurrently
        ? this.concurrentQueue
        : this.sequentialQueue;

      queue.timeouts[job.id]?.();
      delete queue.timeouts[job.id];

      for (const _job of queue.items) {
        if (_job.id === job.id) {
          queue.remove(_job);
          break;
        }
      }
    }

    if (Array.isArray(filterOrIds)) {
      console.log(`[JobRunner] Failing jobs ${filterOrIds.join(', ')}`);
    } else {
      console.log(
        `[JobRunner] Failing job: ${JSON.stringify(filterOrIds, null, 2)}`
      );
    }

    return await queryProxy.job.updateMany({
      select: { id: true },
      where: {
        id: {
          in: jobs.map((job) => job.id),
        },
      },
      data: {
        status: 'FAILED',
      },
    });
  }
}

export const jobRunner = new JobRunner();
