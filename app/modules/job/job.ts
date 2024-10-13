import type { Job as BaseJobDetails, JobExecution } from '#prisma-client';
import type { JobRunner } from '~/modules/job/job-runner.server';
import { queryProxy } from '~/modules/query/query-proxy';
import { emitter } from '~/modules/emitter.server';
import _ from 'lodash';

export interface JobDetails<P = any> extends Omit<BaseJobDetails, 'payload'> {
  payload: P;
}

export abstract class Job<R = any, P = any> {
  constructor(
    private readonly runner: JobRunner,
    public readonly job: JobDetails<P>,
  ) {
  }

  private execution: JobExecution | null = null;

  async updateProgress(progress: number) {
    if (!this.execution) {
      throw new Error('Execution not found');
    }

    progress = Math.min(100, Math.max(0, Math.floor(progress)));

    const execution = await queryProxy.jobExecution.update({
      where: { id: this.execution?.id },
      data: { progress },
    });

    _.merge(this.execution, execution);
  }

  async run() {
    let job = await queryProxy.job.update({
      where: {
        id: this.job.id,
      },
      data: {
        status: 'RUNNING',
        tries: {
          increment: 1,
        },
      },
      include: {
        Executions: {
          take: 1,
          orderBy: {
            id: 'desc',
          },
        },
      },
    });

    _.merge(this.job, job);

    if (job.Executions.length && job.Executions[0].status === 'RUNNING') {
      // Continue the execution

      this.execution = job.Executions[0];
    } else {
      // Start a new execution

      this.execution = await queryProxy.jobExecution.create({
        data: {
          jobId: this.job.id,
          status: 'RUNNING',
        },
      });
    }

    let result: any = null;
    let error: any = null;

    try {
      result = await this.execute();
    } catch (e) {
      error = e;
      console.error(e);
    }

    job = (await queryProxy.job.update({
      where: {
        id: this.job.id,
      },
      data: {
        status: job.interval ? 'SCHEDULED' : error ? 'FAILED' : 'FINISHED',
        executedAt: new Date(),
      },
    })) as any;
    _.merge(this.job, job);

    const execution = await queryProxy.jobExecution.update({
      where: {
        id: this.execution.id,
      },
      data: {
        status: error ? 'FAILED' : 'SUCCEEDED',
        result: _.isEmpty(JSON.parse(JSON.stringify(error)))
          ? { message: error?.message, stack: error?.stack }
          : (error ?? result),
        executedAt: new Date(),
        progress: 100,
      },
    });
    _.merge(this.execution, execution);

    if (job.interval) {
      this.runner.scheduleJob(job, true, this.execution);
    }

    const eventBase = `job.${job.name}`;

    if (error) {
      emitter.emitAsync(`${eventBase}.failed`, job);
      emitter.emitAsync(`${job.storeId}.${eventBase}.failed`, job);
    } else {
      emitter.emitAsync(`${eventBase}.completed`, job);
      emitter.emitAsync(`${job.storeId}.${eventBase}.completed`, job);
    }
  }

  async updatePayload(payload: P) {
    return queryProxy.job.update({
      where: {
        id: this.job.id,
      },
      data: {
        payload,
      },
    });
  }

  abstract execute(payload?: P): Promise<R> | R;
}

export interface JobConstructor {
  new(job: JobDetails): Job;
}
