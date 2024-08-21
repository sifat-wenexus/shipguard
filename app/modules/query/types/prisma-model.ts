import type { DMMF } from '~/../prisma/client/runtime/library';

export interface PrismaField {
  kind: DMMF.FieldKind;
  name: string;
  isList: boolean;
  isRequired: boolean;
  type: string;
  relationFromFields?: string[];
  relationToFields?: any[];
  relationName?: string;
}


export interface PrismaModel {
  name: string;
  dbName: string | null;
  fields: PrismaField[];
  uniqueFields: string[][];
  primaryKey: string[];
  scalarFields: string[];
  scalarFieldsSet: Set<string>;
}
