import type { Subscription as SubscriptionIface } from '~/modules/query/prisma-extended.server';
import { Reply, websocketClient } from '~/modules/websocket/websocket.client';
import type { QueryType } from '~/modules/query/schema/query-schema';
import type { ModelNames } from '~/modules/query/types/model-names';

export class LiveQueryClient<D, R = D> implements SubscriptionIface<R> {
  constructor(
    public readonly model: ModelNames,
    public readonly type: QueryType,
    public query: Record<string, any>,
    public readonly decorator?: (data: D) => R
  ) {}

  private readonly loadListeners = new Set<(loading: boolean) => void>();
  private readonly dataListeners = new Set<(data: R) => void>();
  private _reply: Promise<Reply<R>> | null = null;
  private callLoadListeners = true;
  public data: R | null = null;

  get reply(): Promise<Reply<R>> {
    if (this._reply) {
      return this._reply;
    }

    this._reply = new Promise<Reply<R>>(async (resolve) => {
      const replyStream = await websocketClient.request<R>('query', {
        type: this.type,
        model: this.model,
        query: this.query,
        subscribe: true,
      });

      resolve(replyStream);

      replyStream.addEventListener('end', () => {
        this._reply = null;
      });

      replyStream.addEventListener('data', (e) => {
        const json = e.detail.payload ?? null;
        this.data = this.decorator ? this.decorator(json as any) : json;

        for (const listener of this.dataListeners) {
          listener(this.data!);
        }

        if (this.callLoadListeners) {
          for (const listener of this.loadListeners) {
            listener(false);
          }

          this.callLoadListeners = false;
        }
      });

      return replyStream;
    });

    for (const listener of this.loadListeners) {
      listener(true);
    }

    return this._reply;
  }

  refresh(query?: Record<string, any>) {
    if (!query) {
      return;
    }

    for (const listener of this.loadListeners) {
      listener(true);
    }

    this.callLoadListeners = true;
    this.query = query;

    this.reply.then((reply) => reply.patch(this.query));
  }

  addListener(callback: (data: R) => void) {
    this.dataListeners.add(callback);

    if (this.dataListeners.size === 1 && this.data) {
      callback(this.data);
    }

    this.reply.then((_) => {
      // noop
    });

    return this;
  }

  removeListener(callback: (data: R) => void) {
    this.dataListeners.delete(callback);

    if (this.dataListeners.size === 0) {
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
    this.reply?.then((reply) => reply.end());
  }
}
