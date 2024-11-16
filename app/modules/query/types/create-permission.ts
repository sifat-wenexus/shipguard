import type { PermissionDefinition as UpdatePermission } from './update-permission';
import type { ModelNames } from './model-names';

export type PermissionDefinition<
  N extends ModelNames,
> = Omit<UpdatePermission<N>, 'permission'>;

export type CreatePermission<
  N extends ModelNames,
> = boolean | PermissionDefinition<N>;
