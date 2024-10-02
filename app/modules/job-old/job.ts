import type { Job as JobRow, JobStatus, Prisma } from '#prisma-client';
import { prisma } from '../prisma.server';
import _ from 'lodash';

export abstract class Job<R = any> {
  constructor(public readonly row: JobRow) {}

  async updateProgress(progress: number) {
    progress = Math.min(100, Math.max(0, Math.floor(progress)));

    const row = await prisma.job.update({
      where: {
        id: this.row.id,
      },
      data: { progress },
    });

    _.merge(this.row, row);
  }

  private async updateStatus(status: JobStatus) {
    const row = await prisma.job.update({
      where: {
        id: this.row.id,
      },
      data: { status },
    });

    _.merge(this.row, row);
  }

  async run() {
    try {
      const result = await this.execute();

      const row = await prisma.job.update({
        where: {
          id: this.row.id,
        },
        data: {
          status: 'COMPLETED',
          result: result === null ? undefined : result as Prisma.NullableJsonNullValueInput,
          progress: 100,
        },
      });

      _.merge(this.row, row);
    } catch (e) {
      await prisma.job.update({
        where: {
          id: this.row.id,
        },
        data: {
          status: 'FAILED',
          result: (e as any).message ?? e,
        },
      });
    }
  }

  abstract execute(): Promise<R>;
}

export interface JobConstructor {
  new (row: JobRow): Job;
}
