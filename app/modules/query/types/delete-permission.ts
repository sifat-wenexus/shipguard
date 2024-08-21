import type { PermissionDefinition as UpdatePermission } from './update-permission';
import type { ModelNames } from './model-names';

export type PermissionDefinition<
  N extends ModelNames
> = Pick<UpdatePermission<N>, 'permission'>;

export type DeletePermission<
  N extends ModelNames
> = boolean | PermissionDefinition<N>;
