import type { Job, JobExecution, Prisma } from '#prisma-client';
import { queryProxy } from '~/modules/query/query-proxy';
import type { JobName } from '~/jobs/index.server';
import { jobExecutors } from '~/jobs/index.server';
import { prisma } from '~/modules/prisma.server';

export interface JobRunnerOptions {
  name: JobName;
  storeId?: string;
  interval?: number;
  maxRetries?: number;
  scheduleAt?: Date;
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
  public readonly timeouts: Record<number, NodeJS.Timeout> = {};
  public readonly ids = new Set<number>();
  public loading = false;

  get size() {
    return this.items.size;
  }

  get batch() {
    const storeIds = new Set<string>();
    const items: Job[] = [];

    for (const item of this.items) {
      if (item.storeId && storeIds.has(item.storeId)) {
        continue;
      }

      items.push(item);

      if (item.storeId) {
        storeIds.add(item.storeId);
      }

      if (items.length === this.batchSize) {
        break;
      }
    }

    return items;
  }

  async loadJobs() {
    if (this.loading) {
      return;
    }

    this.loading = true;

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
                interval: null,
              },
              {
                status: 'PENDING',
                interval: {
                  not: null,
                },
                Executions: {
                  some: {
                    status: 'PAUSED',
                  },
                },
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
      distinct: this.concurrent ? ['storeId'] : undefined,
    });

    return new Promise((resolve) => {
      query.addListener(async (jobs) => {
        await Promise.all(jobs.map(this.add.bind(this)));

        if (query.hasNext) {
          query.next();
        } else {
          resolve(undefined);
          this.loading = false;
        }
      });
    });
  }

  async add(job: Job, delay?: number) {
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

      this.timeouts[job.id] = setTimeout(async () => {
        this.items.add(job);
        this.ids.add(job.id);

        await queryProxy.job.update({
          where: {
            id: job.id,
          },
          data: {
            status: 'PENDING',
          },
        });
      }, delay);

      return;
    }

    this.items.add(job);
    this.ids.add(job.id);
  }

  remove(job: Job) {
    this.items.delete(job);
    this.ids.delete(job.id);
  }
}

export class JobRunner {
  constructor() {
    setTimeout(() => {
      this.initialize().then(() => {
        setInterval(() => this.sequentialQueue.loadJobs(), 1000);
        setInterval(() => this.concurrentQueue.loadJobs(), 1000);

        setInterval(() => this.runJobs(this.sequentialQueue), 1000);
        setInterval(() => this.runJobs(this.concurrentQueue), 1000);

        setImmediate(() => this.runJobs(this.sequentialQueue));
        setImmediate(() => this.runJobs(this.concurrentQueue));
      });
    }, 10000);
  }

  public readonly concurrentQueue = new Queue(100000, true);
  public readonly sequentialQueue = new Queue(50);
  private running = false;

  private async runJobs(queue: Queue) {
    if (queue.size === 0 || this.running) {
      return;
    }

    this.running = true;

    const { batch } = queue;

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

    this.running = false;
  }

  private async initialize() {
    // Load incomplete jobs

    await queryProxy.job
      .findMany({
        where: {
          node: process.env.NODE_ID,
          status: {
            in: ['RUNNING', 'PENDING'],
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
    lastExecution?: JobExecution
  ) {
    const queue = job.runConcurrently
      ? this.concurrentQueue
      : this.sequentialQueue;
    const { scheduledAt, interval } = job;

    if (scheduledAt && !interval) {
      // It's a scheduled one-time job

      if (scheduledAt.getTime() < Date.now()) {
        // Overdue job, push it to the queue immediately
        return queue.add(job);
      }

      // Schedule the job to run at the scheduled time

      return queue.add(job, scheduledAt.getTime() - Date.now());
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
      ((scheduledAt && scheduledAt.getTime() < Date.now()) ||
        createdAt.getTime() + intervalInMs < Date.now());

    if (isOverdue) {
      // Overdue job, push it to the queue immediately
      return queue.add(job);
    }

    if (scheduledAt && !ignoreScheduledAt) {
      // The job has a scheduled time, schedule it to run at the scheduled time

      return queue.add(job, scheduledAt.getTime() - Date.now());
    }

    // Schedule the job to run at the next interval

    const lastExecutionTime =
      lastExecution?.updatedAt.getTime() || createdAt.getTime();
    const timeSinceLastExecution = Date.now() - lastExecutionTime;

    // Subtract the time since the last execution from the interval
    return queue.add(job, intervalInMs - timeSinceLastExecution);
  }

  async run(options: JobRunnerOptions) {
    const { name, interval, maxRetries, scheduleAt, payload } = options;

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

    if (options.paused) {
      return job;
    }

    if (scheduleAt) {
      const queue = job.runConcurrently
        ? this.concurrentQueue
        : this.sequentialQueue;
      await queue.add(job, scheduleAt.getTime() - Date.now());
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
      include: {
        Executions: {
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

    const execution = job.Executions?.[0];

    if (execution?.status === 'PAUSED') {
      const step = execution.prevStep;

      if (step) {
        await queryProxy.jobExecution.update({
          where: { id: execution.id },
          data: {
            result: {
              ...((execution.result || {}) as any),
              [step]: payload,
            },
          },
        });
      }
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

      clearTimeout(queue.timeouts[job.id]);
      delete queue.timeouts[job.id];
      queue.remove(job);
    }

    return await queryProxy.job.updateMany({
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
}

export const jobRunner = new JobRunner();
