import { performBulkQuery } from '~/modules/perform-bulk-operation.server';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import type { Job as BaseJobDetails, JobExecution } from '#prisma-client';
import type { JobRunner } from '~/modules/job/job-runner.server';
import { queryProxy } from '~/modules/query/query-proxy';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';
import _ from 'lodash';

export interface JobDetails<P = any> extends Omit<BaseJobDetails, 'payload'> {
  payload: P;
}

export abstract class Job<P = any> {
  constructor(
    private readonly runner: JobRunner,
    public readonly job: JobDetails<P>,
  ) {
  }

  private execution: JobExecution | null = null;
  private cancelled = false;
  private paused = false;
  steps: string[] = ['execute'];

  pause(result?: any) {
    this.paused = true;

    return result;
  }

  cancel(result?: any) {
    this.cancelled = true;

    return result;
  }

  execute(): any {
    throw new Error('No execute method defined, or steps array is empty');
  }

  async performShopifyBulkQuery(query: string, storeId = this.job.storeId) {
    if (!storeId) {
      throw new Error('No storeId provided');
    }

    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      throw new Error('Store not found');
    }

    const session = await findOfflineSession(store.domain);

    if (!session) {
      throw new Error('Session not found');
    }

    const { operationId } = await performBulkQuery(session, query, false);

    await prisma.jobBulkOperation.create({
      data: {
        id: operationId,
        jobId: this.job.id,
      },
    });
  }

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
    const isRetry = this.job.status === 'FAILED';
    const jobUpdate: Record<string, any> = {
      status: 'RUNNING',
    };

    if (isRetry) {
      jobUpdate.tries = {
        increment: 1,
      };
    }

    let job = await queryProxy.job.update({
      where: {
        id: this.job.id,
      },
      data: jobUpdate,
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

    const lastExecution = job.Executions?.[0];

    if (lastExecution?.status === 'RUNNING') {
      // Continue the execution

      this.execution = job.Executions[0];
    } else if (lastExecution?.status === 'PAUSED') {
      // Continue the paused execution
      this.execution = await queryProxy.jobExecution.update({
        where: {
          id: lastExecution.id,
        },
        data: {
          status: 'RUNNING',
        },
      });
    } else if (lastExecution?.status === 'FAILED') {
      // Retry the execution

      this.execution = await queryProxy.jobExecution.create({
        data: {
          jobId: this.job.id,
          status: 'RUNNING',
          currentStep: lastExecution.currentStep || this.steps[0],
          prevStep: lastExecution.prevStep,
          result: lastExecution.result,
        },
      });
    } else {
      // Start a new execution

      this.execution = await queryProxy.jobExecution.create({
        data: {
          jobId: this.job.id,
          status: 'RUNNING',
          currentStep: this.steps[0],
        },
      });
    }

    let error: any = null;

    for (let i = this.steps.indexOf(this.execution.currentStep); i < this.steps.length; i++) {
      let result: any = null;

      const currentStep = this.steps[i];
      const nextStep = this.steps[i + 1];

      try {
        result = await this[currentStep]();
      } catch (e) {
        error = e;
        console.error(e);
      }

      const executionUpdate: Record<string, any> = {
        currentStep: error ? currentStep : nextStep,
        prevStep: error ? this.execution.prevStep : currentStep,
        status: error ? 'FAILED' : this.cancelled ? 'CANCELLED' : this.paused && nextStep ? 'PAUSED' : 'SUCCEEDED',
        result: {
          ...(this.execution.result as Record<string, any> || {}),
          [currentStep]: error ? (_.isEmpty(JSON.parse(JSON.stringify(error)))
              ? { message: error?.message, stack: error?.stack } : error)
            : result,
        },
        executedAt: new Date(),
      };

      const execution = await queryProxy.jobExecution.update({
        where: {
          id: this.execution.id,
        },
        data: executionUpdate,
      });
      _.merge(this.execution, execution);

      if (error || this.paused || this.cancelled) {
        break;
      }
    }

    job = (await queryProxy.job.update({
      where: {
        id: this.job.id,
      },
      data: {
        status: error ? 'FAILED' : this.paused ? 'PAUSED' : 'FINISHED',
        tries: isRetry && !error ? 0 : this.job.tries,
        executedAt: new Date(),
      },
    })) as any;
    _.merge(this.job, job);

    if (!this.paused) {
      await queryProxy.jobExecution.update({
        where: {
          id: this.execution.id,
        },
        data: {
          progress: 100,
        },
      });

      if (job.interval && !error) {
        this.runner.scheduleJob(job, true, this.execution);
      }
    }

    const eventBase = `job.${job.name}`;

    if (error) {
      emitter.emitAsync(`${eventBase}.failed`, job);
      emitter.emitAsync(`${job.storeId}.${eventBase}.failed`, job);
    } else if (this.paused) {
      emitter.emitAsync(`${eventBase}.paused`, job);
      emitter.emitAsync(`${job.storeId}.${eventBase}.paused`, job);
    } else if (this.cancelled) {
      emitter.emitAsync(`${eventBase}.cancelled`, job);
      emitter.emitAsync(`${job.storeId}.${eventBase}.cancelled`, job);
    } else {
      emitter.emitAsync(`${eventBase}.completed`, job);
      emitter.emitAsync(`${job.storeId}.${eventBase}.completed`, job);
    }
  }

  async getResult<R>(step: string): Promise<R | null> {
    if (!this.execution) {
      return null;
    }

    return this.execution.result?.[step] as R | null;
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
}

export interface JobConstructor {
  new(job: JobDetails): Job;
}
