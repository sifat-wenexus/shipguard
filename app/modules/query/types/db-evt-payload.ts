import type { Session } from '~/shopify-api/lib';
import type { ModelTypes } from './model-types';
import type { ModelNames } from './model-names';
import type { Actions } from './model';

export type EventType =
  | Exclude<keyof Actions<any>, 'subscribe' | 'read'>
  | 'beforeUpdate'
  | 'beforeDelete';

export interface DBEvtPayload<
  Model extends ModelNames = ModelNames,
  Type extends EventType = EventType
> {
  type: Type;
  target: Model;
  newData: Type extends 'create' | 'update' ? ModelTypes[Model]['model'] : null;
  oldData: Type extends 'update' | 'delete' | 'beforeUpdate' | 'beforeDelete'
    ? ModelTypes[Model]['model']
    : null;
  session?: Session;
}
