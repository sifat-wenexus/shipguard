import type { ModelNames } from '~/modules/query/types/model-names';
import EventEmitter from 'eventemitter2';
import _ from 'lodash';

import type {
  DBEvtPayload,
  EventType,
} from '~/modules/query/types/db-evt-payload';

export const emitter = new EventEmitter();

export function onDBEvt<T extends ModelNames>(
  model: T,
  events: EventType[],
  listener: (payload: DBEvtPayload<T>) => void
) {
  for (const event of events) {
    emitter.on(`db.${model}.${event}`, listener);
  }
}

export function onDBEvtBuffered<T extends ModelNames>(
  model: T,
  events: EventType[],
  windowMs: number,
  listener: (payloads: _.Dictionary<DBEvtPayload<T>[]>) => void
) {
  const timeoutIds: NodeJS.Timeout[] = [];
  const buffer: DBEvtPayload<T>[] = [];

  for (const event of events) {
    emitter.on(`db.${model}.${event}`, (payload) => {
      buffer.push(payload);

      timeoutIds.push(
        setTimeout(() => {
          if (buffer.length === 0) {
            return;
          }

          const groups = _.groupBy(
            buffer,
            (payload) => payload.session?.storeId
          );

          listener(groups);
          buffer.length = 0;

          for (const timeoutId of timeoutIds) {
            clearTimeout(timeoutId);
          }
        }, windowMs)
      );
    });
  }
}
