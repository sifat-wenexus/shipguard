import { queryProxy } from '~/modules/query/query-proxy';
import type { Job, JobExecution } from '#prisma-client';
import type { JobName } from '~/jobs/index.server';
import { jobExecutors } from '~/jobs/index.server';

export interface JobRunnerOptions {
  name: JobName;
  storeId?: string;
  interval?: number;
  timeout?: number;
  maxRetries?: number;
  scheduleAt?: Date;
  paused?: boolean;
  payload?: (typeof jobExecutors)[JobName]['prototype']['job']['payload'];
}

class Queue {
  constructor(private readonly batchSize = 50) {
  }

  public readonly items = new Set<Job>();
  public readonly ids = new Set<number>();
  public loading = false;

  get size() {
    return this.items.size;
  }

  get batch() {
    const items: Job[] = [];

    for (const item of this.items) {
      items.push(item);

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
                  }
                }
              },
              {
                status: 'FAILED',
                OR: [
                  {
                    maxRetries: null,
                  },
                  {
                    tries: {
                      lt: queryProxy.job.fields.maxRetries,
                    },
                  }
                ]
              },
            ],
          },
        ],
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
    });

    return new Promise((resolve) => {
      query.addListener(async (jobs) => {
        await Promise.all(jobs.map((job) => this.add(job)));

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

      setTimeout(async () => {
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
        setInterval(this.queue.loadJobs.bind(this.queue), 1000);
        setInterval(this.runJobs.bind(this), 1000);
        setImmediate(this.runJobs.bind(this));
      });
    }, 10000);
  }

  public readonly queue = new Queue(50);
  private running = false;

  private async runJobs() {
    if (this.queue.size === 0 || this.running) {
      return;
    }

    this.running = true;

    const { batch } = this.queue;

    await Promise.allSettled(
      batch.map(async (job) => {
        try {
          await new jobExecutors[job.name](this, job).run();
          this.queue.remove(job);
        } catch (e) {
          console.error(e);
        }
      }),
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
                this.queue.add(job);
              }

              if (query.hasNext) {
                query.next();
              } else {
                resolve(null);
              }
            });
          }),
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
          }),
      );
  }

  async scheduleJob(
    job: Job,
    ignoreScheduledAt?: boolean,
    lastExecution?: JobExecution,
  ) {
    const { scheduledAt, interval } = job;

    if (scheduledAt && !interval) {
      // It's a scheduled one-time job

      if (scheduledAt.getTime() < Date.now()) {
        // Overdue job, push it to the queue immediately
        return this.queue.add(job);
      }

      // Schedule the job to run at the scheduled time

      return this.queue.add(job, scheduledAt.getTime() - Date.now());
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
      return this.queue.add(job);
    }

    if (scheduledAt && !ignoreScheduledAt) {
      // The job has a scheduled time, schedule it to run at the scheduled time

      return this.queue.add(job, scheduledAt.getTime() - Date.now());
    }

    // Schedule the job to run at the next interval

    const lastExecutionTime =
      lastExecution?.updatedAt.getTime() || createdAt.getTime();
    const timeSinceLastExecution = Date.now() - lastExecutionTime;

    // Subtract the time since the last execution from the interval
    return this.queue.add(job, intervalInMs - timeSinceLastExecution);
  }

  async run(options: JobRunnerOptions) {
    const { name, interval, timeout, maxRetries, scheduleAt, payload } =
      options;

    const job = await queryProxy.job.create({
      data: {
        status: options.paused ? 'PAUSED' : (scheduleAt || interval) ? 'SCHEDULED' : 'PENDING',
        node: process.env.NODE_ID!,
        storeId: options.storeId,
        scheduledAt: scheduleAt,
        maxRetries,
        interval,
        timeout,
        payload,
        name,
      },
    });

    if (options.paused) {
      return job;
    }

    await this.queue.add(
      job,
      scheduleAt ? scheduleAt.getTime() - Date.now() : undefined,
    );

    return job;
  }

  async resume(id: number, payload?: any) {
    const job = await queryProxy.job.findUnique({
      where: { id },
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

    if (job?.status !== 'PAUSED') {
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
              ...(execution.result || {}) as any,
              [step]: payload,
            },
          },
        });
      }
    }

    await queryProxy.job.update({
      where: { id },
      data: { status: job.Executions?.[0].status === 'PAUSED' ? 'PENDING' : job.scheduledAt || job.interval ? 'SCHEDULED' : 'PENDING' },
    });

    return job;
  }
}

export const jobRunner = new JobRunner();
