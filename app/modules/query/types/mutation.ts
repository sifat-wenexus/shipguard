import type { PermissionDefinition as CreatePermission } from './create-permission';
import type { PermissionDefinition as UpdatePermission } from './update-permission';
import type { PermissionDefinition as DeletePermission } from './delete-permission';
import type { MutationType } from '../schema/mutation-schema';
import type { RelationAnalyzed } from './relation';
import type { PrismaModel } from './prisma-model';
import type { ModelNames } from './model-names';
import type { ObjectSchema } from 'joi';

export interface Parent {
  relation: RelationAnalyzed;
  mutation: Mutation<Exclude<MutationType, 'delete' | 'deleteMany'>>;
}

export interface Mutation<M extends MutationType = MutationType> {
  type: M;
  target: ModelNames;
  model: PrismaModel;
  permission: {
    create?: CreatePermission<any> | true;
    update?: UpdatePermission<any> | true;
    delete?: DeletePermission<any> | true;
  };
  query: Record<string, any>;
  oldData: Record<string, any> | null;
  newData: Record<string, any> | null;
  schema?: ObjectSchema;
  parents?: Parent[];
}
