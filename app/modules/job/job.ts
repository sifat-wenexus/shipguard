import { findOfflineSessionByStoreId } from '~/modules/find-offline-session.server';
import { bulkOperationManager } from '~/modules/bulk-operation-manager.server';
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
    public readonly job: JobDetails<P>
  ) {}

  private execution: Pick<JobExecution, 'id' | 'status' | 'step' | 'progress' | 'updatedAt'> | null = null;
  private executionCancelled = false;
  private executionPaused = false;
  steps: string[] = ['execute'];

  pauseExecution(result?: any) {
    this.executionPaused = true;

    return result;
  }

  cancelExecution(result?: any) {
    this.executionCancelled = true;

    return result;
  }

  execute(): any {
    throw new Error('No execute method defined, or steps array is empty');
  }

  async performShopifyBulkQuery(query: string, storeId = this.job.storeId) {
    if (!storeId) {
      throw new Error('No storeId provided');
    }

    const session = await findOfflineSessionByStoreId(storeId);

    if (!session) {
      throw new Error('Session not found');
    }

    const operation = await bulkOperationManager.query(session, query, false);

    await queryProxy.job.update({
      select: {
        id: true,
      },
      where: {
        id: this.job.id,
      },
      data: {
        bulkOperationId: operation.id,
      },
    });
  }

  //

  async performShopifyBulkMutation(
    mutation: string,
    variables: any[],
    storeId = this.job.storeId
  ) {
    if (!storeId) {
      throw new Error('No storeId provided');
    }

    const session = await findOfflineSessionByStoreId(storeId);

    const operation = await bulkOperationManager.mutation(
      session,
      mutation,
      variables,
      false
    );

    await queryProxy.job.update({
      select: {
        id: true,
      },
      where: {
        id: this.job.id,
      },
      data: {
        bulkOperationId: operation.id,
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
      select: { id: true, progress: true },
    });

    _.merge(this.execution, execution);
  }

  async run() {
    console.log(`[Job] started, id: ${this.job.id}`);

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
          select: {
            id: true,
            status: true,
            step: true,
            progress: true,
            updatedAt: true,
          },
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

      console.log(
        `[Job] was already running, resuming from step: ${this.execution.step}, jobId: ${this.job.id}, executionId: ${this.execution.id}`
      );
    } else if (lastExecution?.status === 'PAUSED') {
      // Continue the paused execution
      this.execution = await queryProxy.jobExecution.update({
        select: {
          id: true,
          status: true,
          step: true,
          progress: true,
          updatedAt: true,
        },
        where: {
          id: lastExecution.id,
        },
        data: {
          status: 'RUNNING',
        },
      });

      console.log(
        `[Job] was paused, resuming from step: ${this.execution.step}, jobId: ${this.job.id}, executionId: ${this.execution.id}`
      );
    } else if (lastExecution?.status === 'FAILED') {
      // Retry the execution

      this.execution = await queryProxy.jobExecution.update({
        select: {
          id: true,
          status: true,
          step: true,
          progress: true,
          updatedAt: true,
        },
        where: {
          id: lastExecution.id,
        },
        data: {
          status: 'RUNNING',
        },
      });

      console.log(
        `[Job] was failed, retrying from step: ${this.execution.step}, jobId: ${this.job.id}, executionId: ${this.execution.id}`
      );
    } else {
      // Start a new execution

      this.execution = await queryProxy.jobExecution.create({
        data: {
          jobId: this.job.id,
          status: 'RUNNING',
          step: !lastExecution?.step ? this.steps[0] : this.steps[this.steps.indexOf(lastExecution.step) + 1],
        },
      });

      console.log(
        `[Job] started a new execution, jobId: ${this.job.id}, executionId: ${this.execution.id}`
      );
    }

    let error: any = null;

    if (typeof (this as any).beforeRun === 'function') {
      console.log(
        `[Job] running beforeRun, jobId: ${this.job.id}, executionId: ${this.execution.id}`
      );

      try {
        await (this as any).beforeRun();
      } catch (e) {
        console.error(e);
      }
    }

    for (
      let i = this.steps.indexOf(this.execution.step);
      i < this.steps.length;
      i++
    ) {
      let result: any = null;

      const currentStep = this.steps[i];
      const nextStep = this.steps[i + 1];

      console.log(
        `[Job] running step: ${currentStep}, jobId: ${this.job.id}, executionId: ${this.execution.id}`
      );

      try {
        result = await this[currentStep]();
      } catch (e) {
        error = e;
        console.error(e);
      }

      console.log(
        `[Job] finished step: ${currentStep}, jobId: ${this.job.id}, executionId: ${this.execution.id}`
      );

      const executionUpdate: Record<string, any> = {
        status: error
          ? 'FAILED'
          : this.executionCancelled
            ? 'CANCELLED'
            : this.executionPaused && nextStep
              ? 'PAUSED'
              : 'SUCCEEDED',
        result: error
          ? _.isEmpty(JSON.parse(JSON.stringify(error)))
            ? { message: error?.message, stack: error?.stack }
            : error
          : result,
        executedAt: new Date(),
      };

      const execution = await queryProxy.jobExecution.update({
        select: {
          id: true,
          status: true,
          step: true,
          progress: true,
          updatedAt: true,
        },
        where: {
          id: this.execution.id,
        },
        data: executionUpdate,
      });
      _.merge(this.execution, execution);

      if (error || this.executionPaused || this.executionCancelled) {
        break;
      }

      if (nextStep) {
        this.execution = await queryProxy.jobExecution.create({
          data: {
            jobId: this.job.id,
            status: 'RUNNING',
            step: nextStep,
          },
        });
      }
    }

    const shouldReschedule =
      !!job.interval &&
      !this.executionPaused &&
      (!error || job.tries >= (job.maxRetries || 10));

    job = (await queryProxy.job.update({
      where: {
        id: this.job.id,
      },
      data: {
        status: this.executionPaused
          ? 'PAUSED'
          : this.executionCancelled || shouldReschedule
            ? 'FINISHED'
            : error
              ? 'FAILED'
              : 'FINISHED',
        tries: isRetry && !error ? 0 : this.job.tries,
        executedAt: new Date(),
      },
    })) as any;
    _.merge(this.job, job);

    console.log(
      `[Job] finished, jobId: ${this.job.id}, status: ${this.job.status}`
    );

    if (!this.executionPaused) {
      await queryProxy.jobExecution.update({
        select: { id: true },
        where: {
          id: this.execution.id,
        },
        data: {
          progress: 100,
        },
      });

      if (shouldReschedule) {
        console.log(`[Job] rescheduling, jobId: ${this.job.id}`);

        this.runner.scheduleJob(job, true, this.execution);
      }
    }

    const eventBase = `job.${job.name}`;

    if (error) {
      emitter.emitAsync(`${eventBase}.failed`, job);
      emitter.emitAsync(`${job.storeId}.${eventBase}.failed`, job);
    } else if (this.executionPaused) {
      emitter.emitAsync(`${eventBase}.paused`, job);
      emitter.emitAsync(`${job.storeId}.${eventBase}.paused`, job);
    } else if (this.executionCancelled) {
      emitter.emitAsync(`${eventBase}.cancelled`, job);
      emitter.emitAsync(`${job.storeId}.${eventBase}.cancelled`, job);
    } else {
      emitter.emitAsync(`${eventBase}.completed`, job);
      emitter.emitAsync(`${job.storeId}.${eventBase}.completed`, job);
    }

    if (shouldReschedule) {
      emitter.emitAsync(`${eventBase}.rescheduled`, job);
      emitter.emitAsync(`${job.storeId}.${eventBase}.rescheduled`, job);
    }

    if (typeof (this as any).afterRun === 'function') {
      console.log(`[Job] running afterRun, jobId: ${this.job.id}`);

      try {
        await (this as any).afterRun();
      } catch (e) {
        console.error(e);
      }
    }
  }

  async getResult<R>(step: string): Promise<R | null> {
    const execution = await prisma.jobExecution.findFirst({
      where: {
        jobId: this.job.id,
        step,
      },
      select: {
        result: true,
      },
      orderBy: {
        id: 'desc',
      }
    });

    return execution?.result as R | null;
  }

  async updatePayload(payload: P) {
    return queryProxy.job.update({
      select: { id: true },
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
  new (job: JobDetails): Job;
}
