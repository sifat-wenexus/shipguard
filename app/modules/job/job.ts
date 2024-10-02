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
    public readonly job: JobDetails<P>
  ) {}

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
        result: error ?? result,
        executedAt: new Date(),
        progress: 100,
      },
    });
    _.merge(this.execution, execution);

    if (job.interval) {
      this.runner.scheduleJob(job, true, this.execution);
    }

    if (error) {
      emitter.emitAsync(`job.${job.name}.failed`, job);
      emitter.emitAsync(`${job.storeId}.job.${job.name}.failed`, job);
    } else {
      emitter.emitAsync(`job.${job.name}.completed`, job);
      // emitter.emitAsync(`${job.storeId}.job.${job.name}.completed`, job);
      emitter.emit(`${job.storeId}.job.${job.name}.completed`, job);
    }
  }

  abstract execute(payload?: P): Promise<R>;
}

export interface JobConstructor {
  new (job: JobDetails): Job;
}
