import {
  EventPayload,
  ReplyEventMapClient,
  ReplyPayload,
  RequestPayload,
} from '~/modules/websocket/common';

export class WebsocketClient extends EventTarget {
  constructor() {
    super();
  }

  public readonly messages = new Map<number, Message<any>>();
  public readonly replies = new Map<number, Reply<any>>();
  private readonly subscriptions = new Set<string>();

  private retryTimeoutId: NodeJS.Timeout | null = null;
  private _client: Promise<WebSocket> | null = null;
  private shouldReconnect = true;
  private id = 0;

  async getClient(): Promise<WebSocket> {
    if (this._client) {
      const client = await this._client;

      if (
        client.readyState === WebSocket.OPEN ||
        client.readyState === WebSocket.CONNECTING
      ) {
        return client;
      }
    }

    this._client = fetch('/api/sse-auth', {
      method: 'POST',
    })
      .then((r) => r.json())
      .then((authResult) => {
        const searchParams = new URLSearchParams({
          sessionId: authResult.sessionId,
          token: authResult.token,
          shop: authResult.shop,
        });

        const query = searchParams.toString();

        const url =
          process.env.NODE_ENV === 'development'
            ? `ws://localhost:${globalThis.process?.env.WEBSOCKET_PORT ?? 3001}`
            : `wss://${location.host}`;

        const reconnect = () =>  {
          this.retryTimeoutId = setTimeout(
            () => {
              if (this.shouldReconnect) {
                connect(true);
              }
            },
            2000,
          );
        };

        const connect = (retry = false) =>
          new Promise<WebSocket>((resolve) => {
            if (retry) {
              console.log('Websocket connection lost. Reconnecting...');
            }

            const client = new WebSocket(
              new URL(`${url}/api/websocket?${query}`)
            );

            client.addEventListener('error', () => {
              client.close();
              reconnect();
            });

            client.addEventListener('open', () => {
              resolve(client);

              this.retryTimeoutId = null;

              if (retry) {
                this._client = Promise.resolve(client);

                for (const channel of this.subscriptions) {
                  this.subscribe(channel);
                }

                this.replies.forEach((reply) => {
                  client.send(
                    JSON.stringify({
                      id: reply.id,
                      type: 'request',
                      topic: reply.topic,
                      payload: reply.payload,
                    })
                  );
                });
              }

              client.addEventListener('close', () => {
                console.log('Websocket connection closed');
                reconnect();
              });

              console.log(
                retry ? 'Websocket reconnected' : 'Websocket connection opened'
              );
            });

            client.addEventListener('message', (event) => {
              const message:
                | EventPayload<any>
                | ReplyPayload<any>
                | RequestPayload<any> = JSON.parse(event.data);

              if (message.type === 'event') {
                if (message.topic === 'patch') {
                  this.messages
                    .get(message.payload.id)
                    ?.dispatchEvent(
                      new CustomEvent('patch', { detail: message })
                    );
                } else {
                  this.dispatchEvent(
                    new CustomEvent(message.topic, { detail: message })
                  );
                }
              } else if (message.type === 'request') {
                const messageObject = new Message(message, this);
                this.messages.set(message.id, messageObject);
                this.dispatchEvent(
                  new CustomEvent(message.topic, { detail: messageObject })
                );
              } else if (message.type === 'reply') {
                const reply = this.replies.get(message.id);

                if (!reply) {
                  return;
                }

                if (message.topic === 'data') {
                  reply.push(message);

                  if (message.last) {
                    reply.dispatchEvent(new Event('end'));
                  }
                } else if (message.topic === 'error') {
                  reply?.dispatchEvent(
                    new CustomEvent('error', { detail: message.payload })
                  );
                }
              }
            });
          });

        return connect();
      });

    return this._client;
  }

  async close() {
    this.shouldReconnect = false;

    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }

    const client = await this.getClient();
    client.close();

    for (const message of this.messages.values()) {
      message.disposed = true;
      message.dispatchEvent(new Event('end'));
    }

    for (const reply of this.replies.values()) {
      reply.dispatchEvent(new Event('end'));
    }

    this.messages.clear();
    this.replies.clear();
  }

  addRequestHandler<P = any>(
    topic: string,
    listener: (this: Reply<P>, ev: CustomEvent<Message<P>>) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    return this.addEventListener(topic, listener as any, options);
  }

  async emit(topic: string, payload?: any) {
    const client = await this.getClient();
    client.send(
      JSON.stringify({ id: this.id++, type: 'event', topic, payload })
    );
  }

  async request<P = any>(topic: string, payload: any): Promise<Reply<P>> {
    const client = await this.getClient();
    const id = this.id++;

    client.send(JSON.stringify({ id, type: 'request', topic, payload }));

    const reply = new Reply<P>(id, topic, payload, this);
    this.replies.set(id, reply);

    return reply;
  }

  subscribe(channel: string) {
    this.subscriptions.add(channel);
    return this.request('subscribe', channel);
  }

  unsubscribe(channel: string) {
    this.subscriptions.delete(channel);
    return this.request('unsubscribe', channel);
  }
}

export class Message<P> extends EventTarget {
  constructor(
    public payload: RequestPayload<P>,
    private readonly client: WebsocketClient
  ) {
    super();

    this.addEventListener(
      'end',
      () => this.client.messages.delete(this.payload.id),
      { once: true }
    );
  }

  public disposed = false;

  async reply(payload: any, error = false, last = true) {
    if (this.disposed) {
      return;
    }

    try {
      const client = await this.client.getClient();

      client.send(
        JSON.stringify({
          id: this.payload.id,
          type: 'reply',
          topic: error ? 'error' : 'data',
          last: error ? undefined : last,
          payload,
        })
      );
    } catch (e) {
      this.disposed = true;
      this.dispatchEvent(new Event('end'));
    }

    if (error) {
      await this.end();
    } else if (last) {
      this.disposed = true;
      this.dispatchEvent(new Event('end'));
    }
  }

  end(): Promise<boolean> {
    return new Promise(async (resolve) => {
      if (this.disposed) {
        return true;
      }

      const reply = await this.client.request('end', {
        id: this.payload.id,
        type: 'reply',
      });

      reply.addEventListener(
        'data',
        ({ detail }) => {
          if (detail.payload) {
            this.disposed = true;
            this.dispatchEvent(new Event('end'));
          }

          resolve(!!detail.payload);
        },
        { once: true }
      );
    });
  }
}

export class Reply<P> extends EventTarget {
  constructor(
    public readonly id: number,
    public readonly topic: string,
    public readonly payload: any,
    private readonly client: WebsocketClient
  ) {
    super();

    this.addEventListener(
      'newListener' as any,
      ((event: CustomEvent<string>) => {
        if (event.detail === 'data' && this.buffer.length > 0) {
          for (const payload of this.buffer) {
            this.dispatchEvent(new CustomEvent('data', { detail: payload }));
          }
          this.buffer.length = 0;
        }
      }) as never
    );

    this.addEventListener('end', () => client.replies.delete(this.id), {
      once: true,
    });
  }

  private listenerCount: Record<string, number> = {};
  private readonly buffer: ReplyPayload<P>[] = [];

  addEventListener<K extends keyof ReplyEventMapClient<P>>(
    type: K,
    listener: (this: Reply<P>, ev: ReplyEventMapClient<P>[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    this.listenerCount[type] = (this.listenerCount[type] ?? 0) + 1;
    this.dispatchEvent(new CustomEvent('newListener', { detail: type }));
    return super.addEventListener(type, listener as any, options);
  }

  removeEventListener<K extends keyof ReplyEventMapClient<P>>(
    type: K,
    listener: (this: Reply<P>, ev: ReplyEventMapClient<P>[K]) => any,
    options?: boolean | EventListenerOptions
  ) {
    this.listenerCount[type] = (this.listenerCount[type] ?? 0) - 1;
    return super.removeEventListener(type, listener as any, options);
  }

  push(payload: ReplyPayload<P>) {
    if (!this.listenerCount['data']) {
      this.buffer.push(payload);
    } else {
      this.dispatchEvent(new CustomEvent('data', { detail: payload }));
    }
  }

  patch(payload?: any) {
    return this.client.emit('patch', {
      id: this.id,
      payload,
    });
  }

  end(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const reply = await this.client.request('end', {
        id: this.id,
        type: 'message',
      });

      reply.addEventListener(
        'data',
        ({ detail }) => {
          if (detail.payload) {
            this.dispatchEvent(new Event('end'));
          }

          resolve(!!detail.payload);
        },
        { once: true }
      );
    });
  }
}

// ------------------------------------------------------------ //

export const websocketClient = new WebsocketClient();
websocketClient.getClient().then((client) => {
  client.addEventListener('open', () => {
    console.log('Websocket connection opened');
  });
});
