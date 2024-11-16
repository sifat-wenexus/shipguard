import type { UpdatePermission } from './update-permission';
import type { CreatePermission } from './create-permission';
import type { DeletePermission } from './delete-permission';
import type { ReadPermission } from './read-permission';
import type { ModelNames } from './model-names';
import type { ModelTypes } from './model-types';
import type { ObjectSchema } from 'joi';

export interface Actions<N extends ModelNames> {
  read?: ReadPermission<N>;
  create?: CreatePermission<N>;
  update?: UpdatePermission<N>;
  delete?: DeletePermission<N>;
  subscribe?: boolean;
}

export interface Model<N extends ModelNames> {
  schema?: ObjectSchema<ModelTypes[N]['model']>;
  permissions: Actions<N> | boolean;
}
