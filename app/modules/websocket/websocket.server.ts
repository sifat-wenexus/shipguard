import { findOfflineSession } from '~/modules/find-offline-session.server';
import { sseTokenStore } from '~/modules/query/token-store.server';
import { emitter } from '~/modules/emitter.server';
import { Session } from '~/shopify-api/lib';
import EventEmitter from 'events';
import Joi from 'joi';

import {
  EventPayload,
  MessageEventMapServer,
  ReplyEventMapServer,
  ReplyPayload,
  RequestPayload,
} from './common';

import {
  App,
  HttpRequest,
  HttpResponse,
  us_socket_context_t,
  WebSocket,
} from 'uWebSockets.js';

export class WebsocketServer {
  private schema = Joi.object<
    EventPayload<any> | ReplyPayload<any> | RequestPayload<any>
  >({
    id: Joi.number().required(),
    type: Joi.string().valid('event', 'request', 'reply').required(),
    topic: Joi.when('type', {
      is: 'reply',
      then: Joi.string().valid('data', 'error').required(),
      otherwise: Joi.string().required(),
    }),
    payload: Joi.object().optional(),
    last: Joi.when('type', {
      is: 'reply',
      then: Joi.boolean().required(),
      otherwise: Joi.forbidden(),
    }),
  })
    .required()
    .unknown(false);
  private id = 0;

  public readonly app = App()
    .ws<WebsocketCtx>('/api/websocket', {
      maxLifetime: 0,
      idleTimeout: 0,
      maxPayloadLength: /* 128 MB */ 128 * 1024 * 1024,
      maxBackpressure: /* 30 MB */ 30 * 1024 * 1024,
      sendPingsAutomatically: true,
      upgrade: this.upgrade.bind(this),
      open: this.open.bind(this),
      close: this.close.bind(this),
      message: this.message.bind(this),
    })
    .listen(Number(process.env.WEBSOCKET_PORT ?? 3003), (listenSocket) => {
      if (listenSocket) {
        console.log(
          'Websocket server listening on port',
          process.env.WEBSOCKET_PORT ?? 3003
        );
      } else {
        console.error('Failed to listen to port', process.env.WEBSOCKET_PORT);
      }
    });

  private async upgrade(
    res: HttpResponse,
    req: HttpRequest,
    context: us_socket_context_t
  ) {
    const extensions = req.getHeader('sec-websocket-extensions');
    const protocol = req.getHeader('sec-websocket-protocol');
    const key = req.getHeader('sec-websocket-key');

    const query = new URLSearchParams(req.getQuery());
    const sessionId = query.get('sessionId');
    const token = query.get('token');
    const shop = query.get('shop');
    let aborted = false;

    res.onAborted(() => {
      aborted = true;
    });

    if (!sessionId || !token || !shop) {
      res.cork(() => {
        res.writeStatus('400 Bad Request');
        res.end('Missing query parameters');
      });

      return;
    }

    const sseToken = await sseTokenStore.verifyToken(shop, sessionId, token);

    if (aborted) {
      return;
    }

    if (!sseToken) {
      res.cork(() => {
        res.writeStatus('401 Unauthorized');
        res.end('Invalid token');
      });
      return;
    }

    const session = await findOfflineSession(shop);

    if (aborted) {
      return;
    }

    if (!session) {
      res.cork(() => {
        res.writeStatus('401 Unauthorized');
        res.end('Session not found');
      });
      return;
    }

    res.upgrade<WebsocketCtx>(
      {
        session,
        messages: new Map(),
        replies: new Map(),
      },
      key,
      protocol,
      extensions,
      context
    );
  }

  private async open(ws: WebSocket<WebsocketCtx>) {
    emitter.emit('ws.open', ws);
  }

  private async close(
    ws: WebSocket<WebsocketCtx>,
    code: number,
    message: ArrayBuffer
  ) {
    ws.getUserData().messages.forEach((message) => {
      message.disposed = true;
      message.emit('end');
    });
    emitter.emit('ws.close', code, message, ws);
  }

  private async message(
    ws: WebSocket<WebsocketCtx>,
    message: ArrayBuffer,
    isBinary: boolean
  ) {
    if (isBinary) {
      ws.send(
        JSON.stringify({
          type: 'event',
          topic: 'error',
          payload: 'Binary messages are not supported',
        })
      );
      return;
    }

    const { value, error } = this.schema.validate(
      JSON.parse(Buffer.from(message).toString())
    );

    if (error) {
      ws.send(
        JSON.stringify({
          type: 'event',
          topic: 'error',
          payload: error.message,
        })
      );
      return;
    }

    const ctx = ws.getUserData();

    if (value.type === 'event') {
      if (value.topic === 'patch') {
        ctx.messages.get(value.payload.id)?.emit('patch', value);
      } else {
        emitter.emit(`ws.${value.topic}`, value, ws);
      }
    } else if (value.type === 'request') {
      const messageObject = new Message(ws, this, value);

      ctx.messages.set(value.id, messageObject);
      emitter.emit(`ws.${value.topic}`, messageObject, ws);
    } else if (value.type === 'reply') {
      const reply = ctx.replies.get(value.id);

      if (!reply) {
        return;
      }

      if (value.topic === 'data') {
        reply.push(value);

        if (value.last) {
          reply.emit('end');
        }
      } else if (value.topic === 'error') {
        reply.emit('error', value.payload);
      }
    }
  }

  request<P = any>(
    ws: WebSocket<WebsocketCtx>,
    topic: string,
    payload: any
  ): Reply<P> {
    const id = this.id++;

    ws.send(JSON.stringify({ id, type: 'request', topic, payload }));

    const reply = new Reply<P>(id, topic, payload, ws, this);
    ws.getUserData().replies.set(id, reply);

    return reply;
  }

  emit(ws: WebSocket<WebsocketCtx>, topic: string, payload?: any) {
    ws.send(JSON.stringify({ id: this.id++, type: 'event', topic, payload }));
  }

  broadcast(topic: string, payload?: any) {
    this.app.publish(topic, JSON.stringify(payload));
  }
}

export class Message<P> extends EventEmitter<MessageEventMapServer> {
  constructor(
    public readonly ws: WebSocket<WebsocketCtx>,
    private readonly server: WebsocketServer,
    public payload: RequestPayload<P>
  ) {
    super();

    this.once('end', () => {
      this.ws.getUserData().messages.delete(this.payload.id);
    });
  }

  public disposed = false;

  reply(payload: any, error = false, last = true) {
    if (this.disposed) {
      return;
    }

    try {
      this.ws.send(
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
      this.emit('end');
    }

    if (error) {
      this.end();
    } else if (last) {
      this.disposed = true;
      this.emit('end');
    }
  }

  end(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.disposed) {
        return true;
      }

      const reply = this.server.request(this.ws, 'end', {
        id: this.payload.id,
        type: 'reply',
      });

      reply.once('data', ({ payload }) => {
        if (payload) {
          this.disposed = true;
          this.emit('end');
        }

        resolve(!!payload);
      });
    });
  }
}

export class Reply<P> extends EventEmitter<ReplyEventMapServer<P>> {
  constructor(
    public readonly id: number,
    public readonly topic: string,
    public readonly payload: any,
    private readonly ws: WebSocket<WebsocketCtx>,
    private readonly server: WebsocketServer
  ) {
    super();

    this.on('newListener', ((event) => {
      if (event === 'data' && this.buffer.length > 0) {
        for (const payload of this.buffer) {
          this.emit('data', payload);
        }
        this.buffer.length = 0;
      }
    }) as never);

    this.once('end', () => ws.getUserData().replies.delete(this.id));
  }

  private readonly buffer: ReplyPayload<P>[] = [];

  push(payload: ReplyPayload<P>) {
    if (this.listenerCount('data') === 0) {
      this.buffer.push(payload);
    } else {
      this.emit('data', payload);
    }
  }

  end(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const reply = this.server.request(this.ws, 'end', {
        id: this.id,
        type: 'message',
      });

      reply.once('data', ({ payload }) => {
        if (payload) {
          this.emit('end');
        }

        resolve(!!payload);
      });
    });
  }

  patch(payload?: any) {
    return this.server.emit(this.ws, 'patch', {
      id: this.id,
      payload,
    });
  }
}

interface WebsocketCtx {
  session: Session;
  messages: Map<number, Message<any>>;
  replies: Map<number, Reply<any>>;
}


// -----------------------------------------------------------------//

export const websocketServer = new WebsocketServer();

export function addRequestHandler<P = any>(
  topic: string,
  handler: (msg: Message<P>, ws: WebSocket<WebsocketCtx>) => void
) {
  emitter.on(`ws.${topic}`, handler);
}

export function addEventHandler<P = any>(
  topic: string,
  handler: (payload: EventPayload<P>, ws: WebSocket<WebsocketCtx>) => void
) {
  emitter.on(`ws.${topic}`, handler);
}
