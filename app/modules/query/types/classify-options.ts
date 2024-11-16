import type { Session } from '~/shopify-api/lib';
import type { ModelNames } from './model-names';
import type { FieldClass } from './field-class';
import type { Actions } from './model';

export interface ClassifyOptions {
  model: ModelNames;
  fields?: string[];
  classes?: Partial<Record<FieldClass, true>>;
  session?: Session;
  action?: Exclude<keyof Actions<any>, 'subscribe' | 'delete'>;
}
