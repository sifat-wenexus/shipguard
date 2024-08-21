import type { ModelNames } from './types/model-names';
import type { Model } from './types/model';

export function defineModels<
  N extends ModelNames = ModelNames,
  M = Partial<{ [K in N]: Model<K> }>,
  R = M | (() => M)
>(models: R): M {
  return typeof models === 'function' ? models() : models;
}
