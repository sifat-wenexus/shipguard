import type { ModelNames } from '~/modules/query/types/model-names';
import type { Types } from '../../../prisma/client/runtime/library';
import type { Session } from '~/shopify-api/lib';
import { prisma } from '~/modules/prisma.server';
import type { Prisma } from '#prisma-client';

type PaginatedArgs<T> = Omit<T, 'take' | 'skip'> & {
  page: number;
  pageSize: number;
};

interface MutationOptions {
  emitEvents?: boolean;
  session?: Session;
}

export const prismaExtended = prisma.$extends({
  model: {
    $allModels: {
      findUnique<M, T = Prisma.Args<M, 'findUnique'>>(
        this: M,
        args: T,
        session?: Session
      ): Promise<Types.Result.GetResult<Prisma.Payload<M>, T, 'findUnique'>> {
        return {} as any;
      },
      subscribeFindUnique<M, T = Prisma.Args<M, 'findUnique'>>(
        this: M,
        args: T,
        session?: Session
      ): Promise<
        Subscription<Types.Result.GetResult<Prisma.Payload<M>, T, 'findUnique'>>
      > {
        return {} as any;
      },
      findMany<M, T = PaginatedArgs<Prisma.Args<M, 'findMany'>>>(
        this: M,
        args?: T,
        session?: Session
      ): Promise<
        PaginatedResult<
          Types.Result.GetResult<Prisma.Payload<M>, T, 'findMany'>
        >
      > {
        return {} as any;
      },
      subscribeFindMany<M, T = PaginatedArgs<Prisma.Args<M, 'findMany'>>>(
        this: M,
        args?: T,
        session?: Session
      ): Promise<
        SubscriptionWithPaginatedResult<
          Types.Result.GetResult<Prisma.Payload<M>, T, 'findMany'>
        >
      > {
        return {} as any;
      },
      findFirst<M, T = Prisma.Args<M, 'findFirst'>>(
        this: M,
        args?: T,
        session?: Session
      ): Promise<Types.Result.GetResult<Prisma.Payload<M>, T, 'findFirst'>> {
        return {} as any;
      },
      subscribeFindFirst<M, T = Prisma.Args<M, 'findFirst'>>(
        this: M,
        args?: T,
        session?: Session
      ): Promise<
        Subscription<Types.Result.GetResult<Prisma.Payload<M>, T, 'findFirst'>>
      > {
        return {} as any;
      },
      aggregate<M, T = Prisma.Args<M, 'aggregate'>>(
        this: M,
        args: T,
        session?: Session
      ): Promise<Types.Result.GetResult<Prisma.Payload<M>, T, 'aggregate'>> {
        return {} as any;
      },
      subscribeAggregate<M, T = Prisma.Args<M, 'aggregate'>>(
        this: M,
        args: T,
        session?: Session
      ): Promise<
        Subscription<Types.Result.GetResult<Prisma.Payload<M>, T, 'aggregate'>>
      > {
        return {} as any;
      },
      groupBy<M, T = PaginatedArgs<Prisma.Args<M, 'groupBy'>>>(
        this: M,
        args: T,
        session?: Session
      ): Promise<
        PaginatedResult<Types.Result.GetResult<Prisma.Payload<M>, T, 'groupBy'>>
      > {
        return {} as any;
      },
      subscribeGroupBy<M, T = PaginatedArgs<Prisma.Args<M, 'groupBy'>>>(
        this: M,
        args: T,
        session?: Session
      ): Promise<
        SubscriptionWithPaginatedResult<
          Types.Result.GetResult<Prisma.Payload<M>, T, 'groupBy'>
        >
      > {
        return {} as any;
      },
      count<M, T = Prisma.Args<M, 'count'>>(
        this: M,
        args?: T,
        session?: Session
      ): Promise<Types.Result.GetResult<Prisma.Payload<M>, T, 'count'>> {
        return {} as any;
      },
      subscribeCount<M, T = Prisma.Args<M, 'count'>>(
        this: M,
        args?: T,
        session?: Session
      ): Promise<
        Subscription<Types.Result.GetResult<Prisma.Payload<M>, T, 'count'>>
      > {
        return {} as any;
      },
      create<M, T = Prisma.Args<M, 'create'>>(
        this: M,
        args: T,
        options?: MutationOptions
      ): Promise<Types.Result.GetResult<Prisma.Payload<M>, T, 'create'>> {
        return {} as any;
      },
      createMany<M, T = Prisma.Args<M, 'createMany'>>(
        this: M,
        args: T,
        options?: MutationOptions
      ): Promise<Types.Result.GetResult<Prisma.Payload<M>, T, 'createMany'>> {
        return {} as any;
      },
      update<M, T = Prisma.Args<M, 'update'>>(
        this: M,
        args: T,
        options?: MutationOptions
      ): Promise<Types.Result.GetResult<Prisma.Payload<M>, T, 'update'>> {
        return {} as any;
      },
      updateMany<M, T = Prisma.Args<M, 'updateMany'>>(
        this: M,
        args: T,
        options?: MutationOptions
      ): Promise<Types.Result.GetResult<Prisma.Payload<M>, T, 'updateMany'>> {
        return {} as any;
      },
      upsert<M, T = Prisma.Args<M, 'upsert'>>(
        this: M,
        args: T,
        options?: MutationOptions
      ): Promise<Types.Result.GetResult<Prisma.Payload<M>, T, 'upsert'>> {
        return {} as any;
      },
      delete<M, T = Prisma.Args<M, 'delete'>>(
        this: M,
        args: T,
        options?: MutationOptions
      ): Promise<Types.Result.GetResult<Prisma.Payload<M>, T, 'delete'>> {
        return {} as any;
      },
      deleteMany<M, T = Prisma.Args<M, 'deleteMany'>>(
        this: M,
        args: T,
        options?: MutationOptions
      ): Promise<Types.Result.GetResult<Prisma.Payload<M>, T, 'deleteMany'>> {
        return {} as any;
      },
    },
  },
  client: {
    $transaction<M, R>(
      this: M,
      runInTransaction: (trx: Omit<M, '$transaction'>) => Promise<R>,
      options?: Parameters<(typeof prisma)['$transaction']>[1]
    ): Promise<R> {
      return {} as any;
    },
  },
});

export interface PaginatedResult<R> {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;

  refresh(): Promise<R>;

  next(): Promise<R | null>;

  previous(): Promise<R | null>;

  jumpTo(page: number): Promise<R | null>;

  firstPage(): Promise<R>;

  addListener(callback: (data: R) => void): PaginatedResult<R>;

  removeListener(callback: (data: R) => void): PaginatedResult<R>;
}

export interface Subscription<R> {
  addListener(callback: (data: R) => void): Subscription<R>;

  removeListener(callback: (data: R) => void): Subscription<R>;

  close(): void;
}

export interface SubscriptionWithPaginatedResult<R>
  extends Subscription<R>,
    Omit<PaginatedResult<R>, 'addListener' | 'removeListener' | 'refresh'> {}

export type PrismaExtended = Pick<
  typeof prismaExtended,
  ModelNames | '$transaction'
>;
