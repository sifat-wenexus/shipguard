import type { PrismaField, PrismaModel } from './prisma-model';
import type { ModelNames } from './model-names';

export interface Relation {
  type: 'one' | 'many';
  target: ModelNames;
  model: PrismaModel;
  field: PrismaField;
}

export interface FKeyHolder extends Relation {
  fieldsTo: string[];
  fieldsFrom: string[];
}

export interface RelationAnalyzed {
  left: Relation;
  right: Relation;
  fKeyHolder: FKeyHolder;
  nonFKeyHolder: Relation;
}
