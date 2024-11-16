import type { PermissionReturn } from './permission-return';
import type { Session } from '~/shopify-api/lib';
import type { ModelTypes } from './model-types';
import type { ModelNames } from './model-names';

export interface PermissionDefinition<
  N extends ModelNames,
  P = Record<string, any>,
  I = Partial<ModelTypes[N]['whereInput']>,
  Model = ModelTypes[N]['model'],
  PermissionFn = (session: Session, query: P) => PermissionReturn<I>,
  ValidationFn = (session: Session, query: P) => PermissionReturn<I>,
  PresetFields = Partial<Model>,
  Preset =
    | ((
        session: Session,
        data: PresetFields
      ) => PresetFields | Promise<PresetFields> | void)
    | PresetFields
> {
  fields: true | Set<keyof Model>;
  permission?: PermissionFn | I;
  preset?: Preset;
  validation?: ValidationFn | I;
}

export type UpdatePermission<N extends ModelNames> =
  | boolean
  | PermissionDefinition<N>;
