export interface ReplyEventMapClient<P> {
  data: CustomEvent<ReplyPayload<P>>;
  error: CustomEvent;
  end: Event;
}

export interface ReplyEventMapServer<P> {
  data: [ReplyPayload<P>];
  error: [any];
  end: [];
}

export interface MessageEventMapClient {
  patch: CustomEvent<EventPayload<any>>;
  end: Event;
}

export interface MessageEventMapServer {
  patch: [EventPayload<any>]
  end: [];
}

export interface Payload {
  id: number;
  type: 'event' | 'request' | 'reply';
  topic: string;
}

export interface ReplyPayload<P> extends Payload {
  type: 'reply';
  topic: 'data' | 'error';
  payload?: P;
  last: boolean;
}

export interface EventPayload<P> extends Payload {
  type: 'event';
  payload?: P;
}

export interface RequestPayload<P> extends Payload {
  type: 'request';
  payload?: P;
}
