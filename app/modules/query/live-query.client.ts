import type { Subscription as SubscriptionIface } from '~/modules/query/prisma-extended.server';
import type { QueryType } from '~/modules/query/schema/query-schema';
import type { ModelNames } from '~/modules/query/types/model-names';

export class LiveQueryClient<D, R = D> implements SubscriptionIface<R> {
  constructor(
    public readonly model: ModelNames,
    public readonly type: QueryType,
    public readonly query: Record<string, any>,
    public readonly decorator?: (data: D) => R
  ) {
    this.ready = this.setupEventSource();
  }

  static authResult: Record<'token' | 'shop' | 'sessionId', string> | null =
    null;
  private listeners = new Set<(data: R) => void>();
  private eventSource: EventSource | null = null;
  public data: R | null = null;
  public ready: Promise<R>;

  setupEventSource(): Promise<R> {
    return new Promise<R>(async (resolve) => {
      this.eventSource?.close();

      if (!LiveQueryClient.authResult) {
        LiveQueryClient.authResult = await fetch('/api/sse-auth', {
          method: 'POST',
        }).then((r) => r.json());
      }

      const searchParams = new URLSearchParams({
        sessionId: LiveQueryClient.authResult!.sessionId,
        token: LiveQueryClient.authResult!.token,
        shop: LiveQueryClient.authResult!.shop,
        query: JSON.stringify({
          type: this.type,
          model: this.model,
          query: this.query,
          subscribe: true,
        }),
      });

      this.eventSource = new EventSource(
        `/api/query?${searchParams.toString()}`,
        {
          withCredentials: true,
        }
      );

      this.eventSource.addEventListener('message', (e) => {
        const json = JSON.parse(e.data);
        this.data = this.decorator ? this.decorator(json) : json;

        if (this.listeners.size === 0) {
          return resolve(this.data!);
        }

        this.listeners.forEach((listener) => listener(this.data!));
        resolve(this.data!);
      });
    });
  }

  addListener(callback: (data: R) => void) {
    if (
      !this.eventSource ||
      this.eventSource.readyState === EventSource.CLOSED
    ) {
      this.setupEventSource();
    }

    this.listeners.add(callback);

    if (this.listeners.size === 1 && this.data) {
      callback(this.data);
    }

    return this;
  }

  removeListener(callback: (data: R) => void) {
    this.listeners.delete(callback);

    if (this.listeners.size === 0) {
      this.close();
    }

    return this;
  }

  close(): void {
    this.eventSource?.close();
    this.eventSource = null;
  }
}
