import type { Subscription } from '~/modules/query/prisma-extended.server';
import type { QuerySchema } from '~/modules/query/schema/query-schema';
import { QueryException } from '~/modules/query/query-exception';
import type { QueryServer } from '~/modules/query/query.server';
import { prisma } from '~/modules/prisma.server';
import type { Session } from '~/shopify-api/lib';
import crypto from 'crypto';

export class LiveQueryServer<D = Record<string, any> | Record<string, any>[]>
  implements Subscription<D> {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public schema: QuerySchema,
    private readonly server: QueryServer,
    public readonly dependencies: Set<string>,
    public readonly scope?: string,
    public readonly session?: Session,
  ) {
  }

  private readonly loadListeners = new Set<(loading: boolean) => void>();
  private readonly handlers = new Set<(data: any) => any>();
  signature: string | null = null;
  private closed = false;

  private hashData(obj: Record<string, any> | Record<string, any>[]) {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(obj, null, 0))
      .digest('base64');
  }

  async refresh(query?: QuerySchema['query']) {
    if (this.closed) {
      throw new QueryException(
        'This live query has been destroyed.',
        'QUERY_INVALID',
      );
    }

    if (query) {
      this.schema.query = query;
    }

    for (const listener of this.loadListeners) {
      listener(true);
    }

    const data = await (prisma[this.schema.model][this.schema.type] as any)(
      this.schema.query,
    );

    const signature = this.hashData(data);

    if (this.signature === signature) {
      return;
    }

    this.signature = signature;

    for (const handler of this.handlers) {
      handler(data);
    }

    for (const listener of this.loadListeners) {
      listener(false);
    }
  }

  addListener(handler: (data: D) => any) {
    if (this.closed) {
      throw new QueryException(
        'This live query has been destroyed.',
        'QUERY_INVALID',
      );
    }

    this.handlers.add(handler);

    if (!this.signature) {
      this.refresh();
    }

    return this;
  }

  removeListener(handler: (data: D) => any) {
    this.handlers.delete(handler);

    if (this.handlers.size === 0) {
      this.close();
    }

    return this;
  }

  onLoading(callback: (loading: boolean) => void): () => void {
    this.loadListeners.add(callback);

    return () => {
      this.loadListeners.delete(callback);
    };
  }

  close(): void {
    this.handlers.clear();
    this.closed = true;

    for (const dependency of this.dependencies) {
      this.server.liveQueries[dependency].delete(this);
    }
  }
}
