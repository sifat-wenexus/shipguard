import type { ModelNames } from '~/modules/query/types/model-names';
import { Prisma } from '#prisma-client';

import type {
  PrismaField,
  PrismaModel,
} from '~/modules/query/types/prisma-model';

class PrismaUtils {
  constructor() {
    const models = this.getModels();

    for (const model of models) {
      const camelCaseModelName = (model.name.charAt(0).toLowerCase() +
        model.name.slice(1)) as ModelNames;
      this.models[camelCaseModelName] = model;
      this.modelsOriginal[model.name] = model;
      this.modelsNameMap[model.name] = camelCaseModelName;

      if (model.dbName) {
        this.modelsByDbName[model.dbName] = model;
      }

      for (const field of model.fields) {
        const fields = this.fields[camelCaseModelName] ?? {};
        this.fields[camelCaseModelName] = fields;

        fields[field.name] = field;

        if (field.relationName) {
          const relations = this.relations[camelCaseModelName] ?? {};
          this.relations[camelCaseModelName] = relations;

          relations[field.relationName] = field;
        }
      }
    }
  }

  public models: Partial<Record<ModelNames, PrismaModel>> = {};
  public modelsOriginal: Record<string, PrismaModel> = {};
  public modelsByDbName: Partial<Record<string, PrismaModel>> = {};
  public modelsNameMap: Record<string, ModelNames> = {};
  public fields: Partial<Record<ModelNames, Record<string, PrismaField>>> = {};
  public relations: Partial<Record<ModelNames, Record<string, PrismaField>>> =
    {};

  private getModels(): PrismaModel[] {
    return Prisma.dmmf.datamodel.models.map((model) => {
      const primaryKey: string[] = [];
      const uniqueFields: string[][] = [];
      const scalarFields: string[] = [];

      // Find the primary key
      if (model.primaryKey) {
        for (const pKey of model.primaryKey.fields) {
          primaryKey.push(pKey);
        }
      }

      // Find the unique fields
      if (model.uniqueFields.length > 0) {
        for (const uniqueFieldGroup of model.uniqueFields) {
          const group: string[] = [];

          for (const uniqueField of uniqueFieldGroup) {
            group.push(uniqueField);
          }

          uniqueFields.push(group);
        }
      }

      for (const field of model.fields) {
        if (field.isUnique) {
          uniqueFields.push([field.name]);
        }

        if (field.isId) {
          primaryKey.push(field.name);
        }

        if (field.kind === 'scalar') {
          scalarFields.push(field.name);
        }
      }

      return {
        name: model.name as string,
        dbName: model.dbName as string | null,
        fields: model.fields as any,
        scalarFieldsSet: new Set(scalarFields),
        scalarFields,
        uniqueFields,
        primaryKey,
      };
    });
  }
}

export const prismaUtils = new PrismaUtils();
