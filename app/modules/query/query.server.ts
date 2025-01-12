import type { PermissionDefinition as UpdatePermission } from './types/update-permission';
import type { PermissionDefinition as DeletePermission } from './types/delete-permission';
import type { PermissionDefinition as CreatePermission } from './types/create-permission';
import { LiveQueryPaginatedServer } from '~/modules/query/live-query-paginated.server';
import type { PermissionDefinition as ReadPermission } from './types/read-permission';
import type { FKeyHolder, Relation, RelationAnalyzed } from './types/relation';
import { NormalQueryPaginated } from '~/modules/query/normal-query-paginated';
import type { MutationSchema, MutationType } from './schema/mutation-schema';
import type { PrismaField } from '~/modules/query/types/prisma-model';
import { LiveQueryServer } from '~/modules/query/live-query.server';
import { QueryException } from '~/modules/query/query-exception';
import type { ClassifyOptions } from './types/classify-options';
import type { ClassifyResult } from './types/classify-result';
import { prismaUtils } from '~/modules/prisma-utils.server';
import type { Prisma, PrismaClient } from '#prisma-client';
import type { QuerySchema } from './schema/query-schema';
import type { Mutation, Parent } from './types/mutation';
import { models } from '~/modules/query/models.server';
import type { FieldClass } from './types/field-class';
import type { ModelNames } from './types/model-names';
import type { Actions, Model } from './types/model';
import { Transaction } from './transaction.server';
import { emitter } from '~/modules/emitter.server';
import { prisma } from '~/modules/prisma.server';
import type { Session } from '~/shopify-api/lib';
import * as uuid from 'uuid';
import _ from 'lodash';

type Permission<T extends keyof Actions<any>> = T extends 'read'
  ? ReadPermission<any>
  : T extends 'create'
    ? CreatePermission<any>
    : T extends 'update'
      ? UpdatePermission<any>
      : T extends 'delete'
        ? DeletePermission<any>
        : true | void;

export class QueryServer {
  readonly models = models;
  private readonly orderByNestedFields = [
    '_count',
    '_sum',
    '_avg',
    '_min',
    '_max',
  ];
  readonly liveQueries: Record<
    string,
    Set<LiveQueryServer<any> | LiveQueryPaginatedServer<any>>
  > = _.mapValues(models, () => new Set());

  readonly transactions: Record<string, Transaction> = {};

  private classifyFields<O extends ClassifyOptions>(
    options: O
  ): ClassifyResult<O> {
    const modelFields = prismaUtils.fields[options.model];

    if (!modelFields) {
      throw new QueryException(
        `Model "${options.model}" doesn't exist.`,
        'QUERY_INVALID'
      );
    }

    const fields = options.fields ?? Object.keys(modelFields);
    const classifications: Partial<Record<FieldClass, string[]>> = {};

    if (options.classes) {
      const classesKeys = Object.keys(options.classes) as FieldClass[];
      const classesLength = classesKeys.length;

      for (let i = 0; i < classesLength; i++) {
        classifications[classesKeys[i]] = [];
      }
    } else {
      classifications.special = [];
      classifications.operator = [];
      classifications.scalar = [];
      classifications.object = [];
      classifications.array = [];
      classifications.relation = [];
      classifications.unknown = [];
      classifications.allowed = [];
      classifications.notAllowed = [];
      classifications.relationAllowed = [];
      classifications.relationNotAllowed = [];
    }

    const fieldsLength = fields.length;
    for (let i = 0; i < fieldsLength; i++) {
      const field = fields[i];

      if (
        field === '_count' ||
        field === '_relevance' ||
        field === '_all' ||
        field === '_sum' ||
        field === '_avg' ||
        field === '_min' ||
        field === '_max'
      ) {
        if (classifications.special) {
          classifications.special.push(field);
        }

        continue;
      }

      if (field === 'OR' || field === 'AND' || field === 'NOT') {
        if (classifications.operator) {
          classifications.operator.push(field);
        }

        continue;
      }

      const modelField = modelFields[field];

      if (!modelField) {
        if (classifications.unknown) {
          classifications.unknown.push(field);
        }

        continue;
      }

      if (
        modelField.kind === 'scalar' ||
        modelField.kind === 'enum' ||
        modelField.kind === 'unsupported'
      ) {
        if (classifications.scalar) {
          classifications.scalar.push(field);
        }

        continue;
      }

      if (modelField.kind === 'object') {
        if (classifications.relation) {
          classifications.relation.push(field);
        }

        if (classifications.array && modelField.isList) {
          classifications.array.push(field);
        } else if (classifications.object) {
          classifications.object.push(field);
        }
      }
    }

    // No need to check for allowed and notAllowed fields, because they are not in the classifications object.
    if (!options.action) {
      return classifications as ClassifyResult<O>;
    }

    if (
      classifications.relation &&
      (classifications.relationAllowed || classifications.relationNotAllowed)
    ) {
      const fieldsLength = classifications.relation.length;
      for (let i = 0; i < fieldsLength; i++) {
        const field = classifications.relation[i];
        const modelField = modelFields[field];
        const modelName = prismaUtils.modelsNameMap[modelField.type];

        // Get permission for model
        const permissionModel = this.models[modelName];

        if (!permissionModel) {
          throw new QueryException(
            `You don't have permission to access the model "${modelName}" or it doesn't exist.`,
            'PERMISSION_DENIED'
          );
        }

        try {
          // Get permission for read action
          const permission = QueryServer.getActionPermission(
            'read',
            modelName,
            permissionModel,
            options.session
          );

          if (
            permission === true ||
            permission.fields === true ||
            permission.fields.size > 0
          ) {
            if (classifications.relationAllowed) {
              classifications.relationAllowed.push(field);
            }
          }
        } catch (e) {
          if (classifications.relationNotAllowed) {
            classifications.relationNotAllowed.push(field);
          }
        }
      }
    }

    if (
      !classifications.scalar ||
      (!classifications.allowed && !classifications.notAllowed)
    ) {
      return classifications as ClassifyResult<O>;
    }

    // Get permission model
    const permissionModel = this.models[options.model];

    if (!permissionModel) {
      throw new QueryException(
        `You don't have permission to access model "${options.model}".`,
        'PERMISSION_DENIED'
      );
    }

    // Get action permission
    const permission = QueryServer.getActionPermission(
      options.action,
      options.model,
      permissionModel,
      options.session
    );

    // Check permission for scalar fields
    if (permission === true || permission.fields === true) {
      classifications.allowed = classifications.scalar;
    } else {
      const length = classifications.scalar.length;
      for (let i = 0; i < length; i++) {
        const field = classifications.scalar[i];

        if (!permission.fields.has(field)) {
          if (classifications.notAllowed) {
            classifications.notAllowed.push(field);
          }

          continue;
        }

        if (classifications.allowed) {
          classifications.allowed.push(field);
        }
      }
    }

    return classifications as ClassifyResult<O>;
  }

  private static getActionPermission<T extends keyof Actions<any>>(
    action: T,
    modelName: ModelNames,
    permissionModel: Model<any>,
    session?: Session
  ): Permission<T> | true {
    let permissions = !session ? true : permissionModel.permissions;

    if (!permissions) {
      throw new QueryException(
        `You don't have permission to perform any action on model "${modelName}".`,
        'PERMISSION_DENIED'
      );
    }

    if (permissions === true) {
      return true;
    }

    const actionPermission = permissions[action];

    if (!actionPermission) {
      throw new QueryException(
        `You don't have permission to perform action "${action}" on model "${modelName}".`,
        'PERMISSION_DENIED'
      );
    }

    return actionPermission as any;
  }

  private addDefaultSelects(
    queue: (MutationSchema | QuerySchema)[],
    baseQuery: MutationSchema | QuerySchema,
    modelFields: Record<string, PrismaField>,
    session?: Session
  ): void {
    // User did not specify any fields to select, so we will select default fields
    baseQuery.query.select = {};

    // Add included fields to queue if exists
    if (baseQuery.query.include) {
      const fields = this.classifyFields({
        model: baseQuery.model,
        fields: Object.keys(baseQuery.query.include),
        classes: {
          relation: true,
          unknown: true,
        },
      });

      if (session) {
        QueryServer.checkFieldPermissions(baseQuery.model, fields);
      }

      // Add fields to queue
      const relationLength = fields.relation.length;
      for (let i = 0; i < relationLength; i++) {
        const relation = fields.relation[i];
        const modelField = modelFields[relation];

        if (typeof baseQuery.query.include[relation] === 'boolean') {
          baseQuery.query.include[relation] = {};
        }

        queue.push({
          type: baseQuery.type,
          model: prismaUtils.modelsNameMap[modelField.type],
          query: baseQuery.query.include[relation],
        });
      }
    }

    const fields = this.classifyFields({
      session,
      action: 'read',
      classes: {
        scalar: true,
        allowed: true,
      },
      model: baseQuery.model,
    });

    const query = baseQuery.query;

    if (fields.scalar.length === fields.allowed.length) {
      // User has access to all fields
      // Add all scalar fields

      if (_.isEmpty(query.include)) {
        delete query.select;
        delete query.include;
        return;
      }

      const fieldsLength = fields.scalar.length;
      for (let i = 0; i < fieldsLength; i++) {
        const field = fields.scalar[i];
        query.select[field] = true;
      }
    } else {
      // User has access to some fields
      // Add only permitted fields

      const fieldsLength = fields.allowed.length;
      for (let i = 0; i < fieldsLength; i++) {
        const field = fields.allowed[i];
        query.select[field] = true;
      }
    }

    if (query.include) {
      Object.assign(query.select, query.include);
      delete query.include;
    }
  }

  private addDefaultCountSelects(
    baseQuery: MutationSchema | QuerySchema,
    session?: Session
  ): void {
    const fields = this.classifyFields({
      session,
      action: 'read',
      model: baseQuery.model,
      classes: {
        relation: true,
        relationAllowed: true,
      },
    });

    const { select } = baseQuery.query;

    if (fields.relation.length === 0) {
      select._count = true;
      return;
    }

    const permissionModel = this.models[baseQuery.model];
    const modelFields = prismaUtils.fields[baseQuery.model];

    if (!modelFields || !permissionModel) {
      throw new QueryException(
        `You don't have access to model ${baseQuery.model} or it doesn't exist`,
        'PERMISSION_DENIED'
      );
    }

    if (
      fields.relationAllowed.length === 0 ||
      fields.relationAllowed.length === fields.relation.length
    ) {
      select._count = true;
      return;
    }

    if (select._count === true) {
      select._count = {
        select: {},
      };
    }

    if (!select._count.select) {
      select._count.select = {};
    }

    const length = fields.relationAllowed.length;
    for (let i = 0; i < length; i++) {
      select._count.select[fields.relationAllowed[i]] = true;
    }
  }

  private checkCountSelects(
    baseQuery: MutationSchema | QuerySchema,
    session?: Session
  ): void {
    const fields = this.classifyFields({
      session,
      action: 'read',
      model: baseQuery.model,
      fields: Object.keys(baseQuery.query.select._count.select),
      classes: {
        relation: true,
        relationAllowed: true,
        relationNotAllowed: true,
        unknown: true,
      },
    });

    if (fields.relationNotAllowed.length > 0) {
      throw new QueryException(
        `You don't have permission to count "${fields.relationNotAllowed.join(
          `, `
        )}" on "${baseQuery.model}".`,
        'QUERY_INVALID'
      );
    }

    if (fields.unknown.length > 0) {
      throw new QueryException(
        `Relation(s) "${fields.unknown.join(`, `)}" don't exist on "${
          baseQuery.model
        }".`,
        'QUERY_INVALID'
      );
    }
  }

  private checkWhere(
    rootWhere: { model: ModelNames; where: Record<string, any> },
    session?: Session
  ): void {
    const queue: (typeof rootWhere)[] = [rootWhere];

    for (let q = 0; q < queue.length; q++) {
      const where = queue[q];

      if (!where) {
        continue;
      }

      const permissionModel = this.models[where.model];
      const modelFields = prismaUtils.fields[where.model];

      if (!permissionModel || !modelFields) {
        // Permission for this model is not defined
        throw new QueryException(
          `Model "${where.model}" doesn't exist`,
          'QUERY_INVALID'
        );
      }

      const specifiedFields = this.classifyFields({
        session,
        model: where.model,
        action: 'read',
        fields: Object.keys(where.where),
        classes: {
          scalar: true,
          object: true,
          array: true,
          allowed: true,
          notAllowed: true,
          unknown: true,
          operator: true,
        },
      });

      if (session) {
        QueryServer.checkFieldPermissions(where.model, specifiedFields);
      }

      // Add object fields to the queue
      const objectLength = specifiedFields.object.length;
      for (let i = 0; i < objectLength; i++) {
        const field = specifiedFields.object[i];

        queue.push({
          model: prismaUtils.modelsNameMap[modelFields[field].type],
          where: where.where[field],
        });
      }

      // Add array fields to the queue
      const arrayLength = specifiedFields.array.length;
      for (let i = 0; i < arrayLength; i++) {
        const field = specifiedFields.array[i];

        // Array filters may contain "some", "every", "none", "is", and isNot
        const arrayFilter = where.where[field];
        const arrayFilterKeys = Object.keys(arrayFilter);
        const arrayFilterLength = arrayFilterKeys.length;

        for (let j = 0; j < arrayFilterLength; j++) {
          queue.push({
            model: prismaUtils.modelsNameMap[modelFields[field].type],
            where: arrayFilter[arrayFilterKeys[j]],
          });
        }
      }

      // Add "OR", "AND" and "NOT" operators to the queue
      const otherLength = specifiedFields.operator.length;
      for (let i = 0; i < otherLength; i++) {
        const field = specifiedFields.operator[i];

        if (field === 'OR' || field === 'AND' || field === 'NOT') {
          if (Array.isArray(where.where[field])) {
            const length = where.where[field].length;

            for (let j = 0; j < length; j++) {
              queue.push({
                model: where.model,
                where: where.where[field][j],
              });
            }
          } else {
            queue.push({
              model: where.model,
              where: where.where[field],
            });
          }
        } else {
          throw new QueryException(
            `Field "${field}" doesn't exist on model "${where.model}".`,
            'QUERY_INVALID'
          );
        }
      }
    }
  }

  private static checkFieldPermissions(
    model: ModelNames,
    fields: ClassifyResult<any>
  ): void {
    if (fields.unknown?.length) {
      throw new QueryException(
        `Field(s) "${fields.unknown.join(
          `, `
        )}" don't exist on model "${model}".`,
        'QUERY_INVALID'
      );
    }

    if (fields.notAllowed?.length) {
      throw new QueryException(
        `Field(s) "${fields.notAllowed.join(
          `, `
        )}" are not allowed on model "${model}".`,
        'QUERY_INVALID'
      );
    }
  }

  private async applyPermissions(
    action: Exclude<keyof Actions<any>, 'subscribe' | 'create'>,
    session: Session,
    baseQuery: (QuerySchema & { noWhere?: boolean }) | MutationSchema,
    permissionModel: Model<any>
  ): Promise<boolean> {
    const permission = QueryServer.getActionPermission(
      action,
      baseQuery.model,
      permissionModel,
      session
    );

    if (permission === true) {
      return true;
    }

    if (!permission.permission) {
      return true;
    }

    let permissionQuery: any;

    if (typeof permission.permission === 'function') {
      permissionQuery = await permission.permission(session, baseQuery.query);
    } else {
      permissionQuery = _.cloneDeep(permission.permission);
    }

    if (!permissionQuery) {
      throw new QueryException(
        `You don't have permission to perform "${action}" on "${baseQuery.model}".`,
        'PERMISSION_DENIED'
      );
    }

    if (
      permissionQuery &&
      action === 'read' &&
      (baseQuery as QuerySchema & { noWhere?: boolean }).noWhere
    ) {
      return true;
    }

    if (permissionQuery === true) {
      return true;
    }

    const baseWhere = baseQuery.query.where;

    if (!baseWhere) {
      baseQuery.query.where = permissionQuery;
      return true;
    }

    baseQuery.query.where = {
      AND: [permissionQuery, baseWhere],
    };

    return true;
  }

  private checkOrderBy(baseQuery: QuerySchema, session?: Session): void {
    const orderBys = Array.isArray(baseQuery.query.orderBy)
      ? baseQuery.query.orderBy
      : [baseQuery.query.orderBy];
    const queue: { model: ModelNames; fields: Record<string, any> }[] = [];

    const orderByLength = orderBys.length;
    for (let i = 0; i < orderByLength; i++) {
      const orderBy = orderBys[i];

      queue.push({
        model: baseQuery.model,
        fields: orderBy,
      });
    }

    for (let q = 0; q < queue.length; q++) {
      const orderBy = queue[q];

      const fieldSetToCheck: string[][] = [Object.keys(orderBy.fields)];

      if (orderBy.fields._relevance) {
        if (typeof orderBy.fields._relevance.fields === 'string') {
          fieldSetToCheck.push([orderBy.fields._relevance.fields]);
        } else if (Array.isArray(orderBy.fields._relevance.fields)) {
          fieldSetToCheck.push(orderBy.fields._relevance.fields);
        }
      }

      const onfLength = this.orderByNestedFields.length;
      for (let i = 0; i < onfLength; i++) {
        const onf = this.orderByNestedFields[i];

        if (orderBy.fields[onf]) {
          fieldSetToCheck.push(Object.keys(orderBy.fields[onf]));
        }
      }

      const fields = this.classifyFields({
        session,
        action: 'read',
        model: orderBy.model,
        fields: Array.from(new Set(fieldSetToCheck.flat())),
        classes: {
          scalar: true,
          relation: true,
          unknown: true,
          notAllowed: true,
          special: true,
        },
      });

      if (session) {
        QueryServer.checkFieldPermissions(orderBy.model, fields);
      }

      if (fields.relation.length) {
        const length = fields.relation.length;
        for (let i = 0; i < length; i++) {
          const relation = fields.relation[i];
          const permissionModel = this.models[orderBy.model];
          const modelFields = prismaUtils.fields[orderBy.model];

          if (!modelFields || !permissionModel) {
            throw new QueryException(
              `You don't have access to "${orderBy.model}" model or it doesn't exist.`,
              'PERMISSION_DENIED'
            );
          }

          const modelField = modelFields[relation];

          queue.push({
            model: prismaUtils.modelsNameMap[modelField.type],
            fields: orderBy.fields[relation],
          });
        }
      }
    }
  }

  private processSelect(
    queue: (MutationSchema | (QuerySchema & { noWhere?: boolean }))[],
    baseQuery: MutationSchema | QuerySchema,
    modelFields: Record<string, PrismaField>,
    session?: Session
  ): void {
    // Classify fields
    const fields = this.classifyFields({
      session,
      classes: {
        scalar: true,
        allowed: true,
        notAllowed: true,
        unknown: true,
        relation: true,
      },
      model: baseQuery.model,
      fields: Object.keys(baseQuery.query.select),
      action: 'read',
    });

    // Check if user has permission to read these fields
    if (session) {
      QueryServer.checkFieldPermissions(baseQuery.model, fields);
    }

    // Handle _count special field
    const countQuery = baseQuery.query.select._count;

    if (countQuery) {
      if (countQuery === true) {
        this.addDefaultCountSelects(baseQuery, session);
      } else if (typeof countQuery === 'object' && !Array.isArray(countQuery)) {
        if (_.isEmpty(countQuery.select)) {
          this.addDefaultCountSelects(baseQuery, session);
        } else {
          this.checkCountSelects(baseQuery, session);
        }
      } else {
        throw new QueryException(
          `Invalid count query "${countQuery}"`,
          'QUERY_INVALID'
        );
      }
    }

    // Add relational fields to queue
    const fieldsLength = fields.relation.length;
    for (let i = 0; i < fieldsLength; i++) {
      const field = fields.relation[i];
      const modelField = modelFields[field];

      if (
        !baseQuery.query.select[field] ||
        Array.isArray(baseQuery.query.select[field]) ||
        typeof baseQuery.query.select[field] !== 'object'
      ) {
        baseQuery.query.select[field] = {};
      }

      const relation = this.analyzeRelation(modelField);

      queue.push({
        type: baseQuery.type,
        model: prismaUtils.modelsNameMap[modelField.type],
        query: baseQuery.query.select[field],
        noWhere: relation.right.type === 'one',
      });
    }
  }

  private analyzeRelation(leftField: PrismaField): RelationAnalyzed {
    const rightModelName = prismaUtils.modelsNameMap[leftField.type];
    const rightModel = prismaUtils.models[rightModelName];

    if (!rightModel) {
      throw new QueryException(
        `You don't have access to model "${rightModelName}" or it doesn't exist.`,
        'PERMISSION_DENIED'
      );
    }

    if (!leftField.relationName) {
      throw new Error(`Relation name is missing for field "${leftField.name}"`);
    }

    const rightField =
      prismaUtils.relations[rightModelName]?.[leftField.relationName];

    if (!rightField) {
      throw new Error('Something went wrong, please contact support.');
    }

    const left: RelationAnalyzed['left'] = {
      target: prismaUtils.modelsNameMap[rightField.type],
      type: rightField.isList ? 'many' : 'one',
      field: leftField,
      model: prismaUtils.modelsOriginal[rightField.type],
    };

    const right: RelationAnalyzed['right'] = {
      target: prismaUtils.modelsNameMap[leftField.type],
      type: leftField.isList ? 'many' : 'one',
      field: rightField,
      model: rightModel,
    };

    let fKeyHolder: FKeyHolder;
    let nonFKeyHolder: Relation;

    if (
      leftField.relationFromFields?.length ||
      leftField.relationToFields?.length
    ) {
      fKeyHolder = left as FKeyHolder;
      fKeyHolder.fieldsFrom = leftField.relationFromFields ?? [];
      fKeyHolder.fieldsTo = leftField.relationToFields ?? [];
      nonFKeyHolder = right;
    } else {
      fKeyHolder = right as FKeyHolder;
      fKeyHolder.fieldsFrom = rightField.relationFromFields ?? [];
      fKeyHolder.fieldsTo = rightField.relationToFields ?? [];
      nonFKeyHolder = left;
    }

    return {
      left,
      right,
      fKeyHolder,
      nonFKeyHolder,
    };
  }

  private static flattenUniqueWhere<
    T extends Record<string, any> = Record<string, any>
  >(where: T): T {
    const flattenWhere: Record<string, any> = { ...where };

    for (const field of Object.keys(flattenWhere)) {
      if (_.isObject(flattenWhere[field])) {
        _.merge(flattenWhere, flattenWhere[field]);
        delete flattenWhere[field];
      }
    }

    return flattenWhere as T;
  }

  private checkUniqueWhere(
    where: Record<string, any>,
    modelName: ModelNames,
    session?: Session
  ): Record<string, any> {
    const model = prismaUtils.models[modelName];

    if (!model) {
      throw new QueryException(
        `You don't have access to model "${modelName}" or it doesn't exist.`,
        'PERMISSION_DENIED'
      );
    }

    const flattenWhere = QueryServer.flattenUniqueWhere(where);
    const fields = Object.keys(flattenWhere);

    for (const field of fields) {
      if (model.primaryKey.includes(field)) {
        continue;
      }

      if (model.uniqueFields.some((uf) => uf.includes(field))) {
        continue;
      }

      throw new QueryException(
        `"${field}" is not a unique field in model "${modelName}" or it doesn't exist.`,
        'QUERY_INVALID'
      );
    }

    if (session) {
      const specifiedFields = this.classifyFields({
        session,
        model: modelName,
        action: 'read',
        fields: Object.keys(flattenWhere),
        classes: {
          scalar: true,
          allowed: true,
          notAllowed: true,
          unknown: true,
        },
      });
      QueryServer.checkFieldPermissions(modelName, specifiedFields);
    }

    return flattenWhere;
  }

  private async applyPreset(
    mutation: Mutation<'create' | 'update' | 'updateMany' | 'upsert'>,
    session: Session
  ): Promise<void> {
    const createPermission = mutation.permission.create;
    const updatePermission = mutation.permission.update;
    const createData =
      mutation.type === 'upsert' ? mutation.query.create : mutation.query.data;
    const updateData =
      mutation.type === 'upsert' ? mutation.query.update : mutation.query.data;

    if (createPermission && createPermission !== true) {
      if (typeof createPermission.preset === 'function') {
        _.merge(createData, await createPermission.preset(session, createData));
      } else if (typeof createPermission.preset === 'object') {
        _.merge(createData, createPermission.preset);
      }
    }

    if (updatePermission && updatePermission !== true) {
      if (typeof updatePermission.preset === 'function') {
        _.merge(updateData, await updatePermission.preset(session, updateData));
      } else if (typeof updatePermission.preset === 'object') {
        _.merge(updateData, updatePermission.preset);
      }
    }
  }

  private async applyValidation(
    mutation: Mutation<'create' | 'update' | 'upsert'>,
    session: Session,
    trx: PrismaClient | Prisma.TransactionClient
  ): Promise<void> {
    const permission =
      mutation.type === 'create' || mutation.type === 'update'
        ? mutation.permission[mutation.type]
        : !mutation.oldData
          ? mutation.permission.create
          : mutation.permission.update;

    if (permission && permission !== true && permission.validation) {
      let validationQuery: Record<string, any> | boolean;

      if (typeof permission.validation === 'function') {
        validationQuery = await permission.validation(session, mutation.query);
      } else {
        validationQuery = permission.validation;
      }

      if (!validationQuery) {
        throw new QueryException(
          `Validation failed for model "${mutation.target}" while creating`,
          'VALIDATION_FAILED'
        );
      }

      if (validationQuery !== true) {
        const item = await (trx[mutation.target] as any).findFirst({
          where: {
            AND: [
              _.pick(mutation.newData, mutation.model.primaryKey),
              validationQuery,
            ],
          },
        });

        if (!item) {
          throw new QueryException(
            `Validation failed for model "${mutation.target}" while creating`,
            'VALIDATION_FAILED'
          );
        }
      }
    }
  }

  private static async findItemToMutate(
    mutation: Mutation<'delete' | 'update' | 'upsert'>,
    trx: PrismaClient | Prisma.TransactionClient
  ): Promise<void> {
    const findQuery: Record<string, any> = {
      where: {
        AND: [],
      },
    };

    if (mutation.query.where) {
      if (mutation.model.primaryKey.length > 1) {
        findQuery.where.AND.push(
          mutation.query.where[mutation.model.primaryKey.join('_')]
        );
      } else {
        findQuery.where.AND.push(mutation.query.where);
      }
    }

    if (mutation.parents) {
      for (const parent of mutation.parents) {
        const where: Record<string, any> = {};
        const length = parent.relation.fKeyHolder.fieldsFrom.length;

        if (parent.relation.right === parent.relation.fKeyHolder) {
          for (let i = 0; i < length; i++) {
            where[parent.relation.fKeyHolder.fieldsFrom[i]] =
              parent.mutation.newData?.[parent.relation.fKeyHolder.fieldsTo[i]];
          }
        } else {
          for (let i = 0; i < length; i++) {
            where[parent.relation.fKeyHolder.fieldsTo[i]] =
              parent.mutation.newData?.[
                parent.relation.fKeyHolder.fieldsFrom[i]
                ];
          }
        }

        findQuery.where.AND.push(where);
      }
    }

    mutation.oldData = await (trx[mutation.target] as any).findFirst(findQuery);

    if (mutation.oldData) {
      mutation.query.where = {};
      let where: Record<string, any> = mutation.query.where;

      if (mutation.model.primaryKey.length > 1) {
        where = {};
        mutation.query.where[mutation.model.primaryKey.join('_')] = where;
      }

      for (const key of mutation.model.primaryKey) {
        where[key] = mutation.oldData[key];
      }
    }
  }

  private static connectMutationParent(
    mutation: Mutation<'create' | 'upsert'>
  ): void {
    if (mutation.parents) {
      const data =
        mutation.type === 'upsert'
          ? mutation.query.create
          : mutation.query.data;

      for (const parent of mutation.parents) {
        const length = parent.relation.fKeyHolder.fieldsFrom.length;

        for (let i = 0; i < length; i++) {
          data[parent.relation.fKeyHolder.fieldsFrom[i]] =
            parent.mutation.newData?.[parent.relation.fKeyHolder.fieldsTo[i]];
        }
      }
    }
  }

  private static validateMutationData(
    mutation: Mutation<'create' | 'upsert'>
  ): void {
    if (mutation.schema) {
      const data: Record<string, any> =
        mutation.type === 'upsert'
          ? mutation.query.create
          : mutation.query.data;

      const validation = mutation.schema.validate(data, {
        abortEarly: true,
        allowUnknown: true,
      });

      if (validation.error) {
        throw new QueryException(validation.error.message, 'VALIDATION_FAILED');
      }
    }
  }

  private async processMutation<M extends MutationType = MutationType>(
    mutation: MutationSchema<M>,
    session: Session | undefined,
    prisma: PrismaClient | Prisma.TransactionClient,
    parents?: Parent[]
  ): Promise<{ current: Mutation<M>[]; all: Mutation<M>[] }> {
    const model = prismaUtils.models[mutation.model];
    const permissionModel = this.models[mutation.model];
    const modelFields = prismaUtils.fields[mutation.model];

    if (!model || !permissionModel || !modelFields) {
      throw new QueryException(
        `You don't have access to model "${mutation.model}" or it doesn't exist.`,
        'PERMISSION_DENIED'
      );
    }

    /** Handle delete mutation */
    if (mutation.type === 'delete' || mutation.type === 'deleteMany') {
      const permission = QueryServer.getActionPermission(
        'delete',
        mutation.model,
        permissionModel,
        session
      );

      if (mutation.query.where) {
        if (mutation.type === 'delete') {
          mutation.query.where = this.checkUniqueWhere(
            mutation.query.where,
            mutation.model,
            session
          );
        } else {
          this.checkWhere(
            {
              model: mutation.model,
              where: mutation.query.where,
            },
            session
          );
        }
      }

      if (session) {
        await this.applyPermissions(
          'delete',
          session,
          mutation,
          permissionModel
        );
      }

      const _delete: Mutation = {
        type: mutation.type,
        target: mutation.model,
        permission: {
          delete: permission,
        },
        oldData: null,
        newData: null,
        query: mutation.query,
        parents,
        model,
      };

      return {
        current: [_delete as Mutation<M>],
        all: [_delete as Mutation<M>],
      };
    }
    /** -------- End -------- */

    type Action = Exclude<ClassifyOptions['action'], 'read' | undefined>;
    type DataObj<T extends Action = Action> = {
      action: T;
      data: Record<string, any>;
      mutation: Mutation<Exclude<MutationType, 'delete' | 'deleteMany'>>;
      permission: Permission<T> | true;
      fields?: ClassifyResult<any>;
    };

    const mutations: Mutation<M>[] = [];
    const dataObjs: DataObj[] = [];
    const classes: ClassifyOptions['classes'] = {
      scalar: true,
      notAllowed: true,
      unknown: true,
      relation: true,
    };

    /** Extract data from mutation */
    if (mutation.type === 'upsert') {
      dataObjs.push({
        action: 'create',
        data: mutation.query.create,
      } as DataObj);

      dataObjs.push({
        action: 'update',
        data: mutation.query.update,
      } as DataObj);
    } else {
      const dataArr = Array.isArray(mutation.query.data)
        ? mutation.query.data
        : [mutation.query.data];

      for (const data of dataArr) {
        dataObjs.push({
          action:
            mutation.type === 'createMany'
              ? 'create'
              : mutation.type === 'updateMany'
                ? 'update'
                : mutation.type,
          data,
        } as DataObj);
      }
    }
    /** -------- End -------- */

    /** Check permission for each data object and classify fields */
    for (const dataObj of dataObjs) {
      dataObj.permission = QueryServer.getActionPermission(
        dataObj.action,
        mutation.model,
        permissionModel,
        session
      );

      if (!dataObj.data) {
        continue;
      }

      const fields = this.classifyFields({
        session,
        classes,
        action: dataObj.action,
        model: mutation.model,
        fields: Object.keys(dataObj.data),
      });

      if (mutation.type === 'updateMany' && fields.relation.length) {
        throw new QueryException(
          'You can not update relations in updateMany mutation',
          'PERMISSION_DENIED'
        );
      }

      if (session) {
        // Check fields permissions
        QueryServer.checkFieldPermissions(mutation.model, fields);
      }

      dataObj.fields = fields;
    }
    /** -------- End -------- */

    /** Create mutation for each data object */
    if (mutation.type === 'upsert') {
      const createObj = dataObjs.find((obj) => obj.action === 'create');
      const updateObj = dataObjs.find((obj) => obj.action === 'update');

      if (!createObj || !updateObj) {
        throw new Error('Something went wrong, please contact support');
      }

      const query: Record<string, any> = {};

      if (createObj.fields) {
        query.create = _.pick(createObj.data, createObj.fields.scalar);
      }

      if (updateObj.fields) {
        query.update = _.pick(updateObj.data, updateObj.fields.scalar);
      }

      // Check where
      if (mutation.query.where) {
        mutation.query.where = this.checkUniqueWhere(
          mutation.query.where,
          mutation.model,
          session
        );

        query.where = mutation.query.where;
      }

      if (session) {
        // Apply permission
        await this.applyPermissions(
          'update',
          session,
          mutation,
          permissionModel
        );
      }

      const mutationObj: Mutation<'upsert'> = {
        type: 'upsert',
        target: mutation.model,
        permission: {
          create: createObj.permission as Permission<'create'>,
          update: updateObj.permission as Permission<'update'>,
        },
        schema: permissionModel.schema,
        oldData: null,
        newData: null,
        query,
        parents,
        model,
      };

      // Validate schema
      QueryServer.validateMutationData(mutationObj);

      if (session) {
        // Apply preset
        await this.applyPreset(mutationObj, session);
      }

      mutations.push(mutationObj as Mutation<M>);
      createObj.mutation = mutationObj;
      updateObj.mutation = mutationObj;
    } else {
      for (const dataObj of dataObjs) {
        const query: Record<string, any> = {};

        if (dataObj.fields) {
          query.data = _.pick(dataObj.data, dataObj.fields.scalar);
        }

        if (mutation.query.where) {
          if (mutation.type === 'update') {
            mutation.query.where = this.checkUniqueWhere(
              mutation.query.where,
              mutation.model,
              session
            );
          } else if (mutation.type === 'updateMany') {
            this.checkWhere(
              {
                model: mutation.model,
                where: mutation.query.where,
              },
              session
            );
          }

          query.where = mutation.query.where;
        }

        // Apply permission
        if (
          (mutation.type === 'update' || mutation.type === 'updateMany') &&
          session
        ) {
          await this.applyPermissions(
            'update',
            session,
            mutation,
            permissionModel
          );
        }

        if (mutation.query.where) {
          query.where = mutation.query.where;
        }

        const mutationObj: Mutation<'create' | 'update' | 'updateMany'> = {
          type: mutation.type === 'createMany' ? 'create' : mutation.type,
          target: mutation.model,
          permission: {
            [dataObj.action]: dataObj.permission as Permission<Action>,
          },
          oldData: null,
          newData: null,
          schema: permissionModel.schema,
          query,
          parents,
          model,
        };

        if (mutationObj.type === 'create') {
          // Validate schema
          QueryServer.validateMutationData(mutationObj as Mutation<'create'>);
        }

        if (session) {
          // Apply preset
          await this.applyPreset(mutationObj, session);
        }

        mutations.push(mutationObj as Mutation<M>);
        dataObj.mutation = mutationObj;
      }
    }
    /** -------- End -------- */

    /** Create mutation for each relation */
    for (const dataObj of dataObjs) {
      const mutationObj = dataObj.mutation;
      const data =
        mutationObj.type === 'upsert'
          ? mutationObj.query[dataObj.action]
          : mutationObj.query.data;

      if (!dataObj.fields || !dataObj.data) {
        continue;
      }

      for (const relationField of dataObj.fields.relation) {
        const modelField = modelFields[relationField];
        const fieldData = dataObj.data[relationField];
        const relation = this.analyzeRelation(modelField);
        const relPermModel = this.models[relation.right.target];

        if (!relPermModel) {
          throw new QueryException(
            `You don't have access to model "${relation.right.target}" or it doesn't exist.`,
            'PERMISSION_DENIED'
          );
        }

        /** Handle create */
        const creates: Record<string, any>[] = [];

        if (_.isObject(fieldData.create)) {
          creates.push(
            ...(Array.isArray(fieldData.create)
              ? fieldData.create
              : [fieldData.create])
          );
        }

        if (_.isObject(fieldData.createMany) && fieldData.createMany.data) {
          creates.push(
            ...(Array.isArray(fieldData.createMany.data)
              ? fieldData.createMany.data
              : [fieldData.createMany.data])
          );
        }

        if (relation.right.type !== 'many' && creates.length > 1) {
          throw new QueryException(
            `Invalid mutation, "${relationField}" is not a many relation.`,
            'INVALID_MUTATION'
          );
        }

        for (const create of creates) {
          if (!_.isObject(create)) {
            throw new QueryException(
              `Invalid create data for relation "${relationField}"`,
              'QUERY_INVALID'
            );
          }

          if (relation.right.type === 'many') {
            /** One-to-many */
            const _mutations = await this.processMutation(
              {
                type: 'create',
                model: relation.right.target,
                query: {
                  data: create,
                },
              },
              session,
              prisma,
              [
                {
                  mutation: mutationObj,
                  relation,
                },
              ]
            );

            mutations.push(...(_mutations.all as Mutation<M>[]));
          } else {
            /** One-to-one/Many-to-one */

            const _mutations = await this.processMutation(
              {
                type: 'create',
                model: relation.right.target,
                query: {
                  data: create,
                },
              },
              session,
              prisma,
              relation.right === relation.fKeyHolder
                ? [
                  {
                    mutation: mutationObj,
                    relation,
                  },
                ]
                : undefined
            );

            if (relation.right === relation.fKeyHolder) {
              mutations.push(...(_mutations.all as Mutation<M>[]));
            } else {
              if (!mutationObj.parents) {
                mutationObj.parents = [];
              }

              mutationObj.parents.push({
                mutation: _mutations.current[0],
                relation,
              });

              // Add parent mutations before the current mutation
              mutations.splice(
                mutations.indexOf(mutationObj as Mutation<M>),
                0,
                ...(_mutations.all as Mutation<M>[])
              );
            }
          }
          /** -------- End -------- */
        }
        /** -------- End -------- */

        /** Handle connect */
        if (_.isObject(fieldData.connect)) {
          const connects: Record<string, any>[] = Array.isArray(
            fieldData.connect
          )
            ? fieldData.connect
            : [fieldData.connect];

          for (const connect of connects) {
            if (!_.isObject(connect)) {
              throw new QueryException(
                `Invalid connect data for relation "${relationField}"`,
                'QUERY_INVALID'
              );
            }

            /** One-to-many or One-to-one where right side is the foreign-key holder */
            if (
              relation.left.type === 'one' &&
              relation.fKeyHolder === relation.right
            ) {
              const flattenWhere = this.checkUniqueWhere(
                connect,
                relation.fKeyHolder.target,
                session
              );

              if (session) {
                QueryServer.checkFieldPermissions(
                  relation.fKeyHolder.target,
                  this.classifyFields({
                    session,
                    action: 'update',
                    model: relation.fKeyHolder.target,
                    fields: relation.fKeyHolder.fieldsFrom,
                    classes: {
                      scalar: true,
                      notAllowed: true,
                      unknown: true,
                    },
                  })
                );
              }

              const mutationSchema: MutationSchema = {
                type: 'update',
                model: relation.fKeyHolder.target,
                query: {
                  data: {},
                  where: flattenWhere,
                },
              };

              if (session) {
                // Apply permission
                await this.applyPermissions(
                  'update',
                  session,
                  mutationSchema,
                  relPermModel
                );
              }

              const update: Mutation<'update'> = {
                type: 'update',
                model: relation.fKeyHolder.model,
                target: relation.fKeyHolder.target,
                query: mutationSchema.query,
                parents: [
                  {
                    mutation: mutationObj,
                    relation,
                  },
                ],
                oldData: null,
                newData: null,
                schema: relPermModel.schema,
                permission: {
                  update: QueryServer.getActionPermission(
                    'update',
                    relation.fKeyHolder.target,
                    relPermModel,
                    session
                  ),
                },
              };

              if (session) {
                // Apply preset
                await this.applyPreset(update, session);
              }

              mutations.push(update as Mutation<M>);

              continue;
            }
            /** -------- End -------- */

            /** Many-to-one or One-to-one where left side is the foreign-key holder */
            if (
              relation.left === relation.fKeyHolder &&
              relation.right.type === 'one'
            ) {
              this.checkUniqueWhere(connect, relation.right.target, session);

              if (session) {
                QueryServer.checkFieldPermissions(
                  relation.left.target,
                  this.classifyFields({
                    session,
                    action: dataObj.action,
                    model: relation.left.target,
                    fields: relation.fKeyHolder.fieldsFrom,
                    classes: {
                      scalar: true,
                      notAllowed: true,
                    },
                  })
                );
              }

              const query: Record<string, any> = {
                where: connect,
                select: {},
              };

              const length = relation.fKeyHolder.fieldsTo.length;

              for (let i = 0; i < length; i++) {
                const fieldTo = relation.fKeyHolder.fieldsTo[i];
                query.select[fieldTo] = true;
              }

              const oneItem = await (
                prisma[relation.right.target] as any
              ).findUnique(query);

              if (!oneItem) {
                throw new QueryException(
                  `Invalid connect data for relation "${relationField}"`,
                  'QUERY_INVALID'
                );
              }

              for (let i = 0; i < length; i++) {
                const fieldTo = relation.fKeyHolder.fieldsTo[i];
                const fieldFrom = relation.fKeyHolder.fieldsFrom[i];

                data[fieldFrom] = oneItem[fieldTo];
              }
            }
            /** -------- End -------- */

            /** Many-to-many
             *
             * Explicit many-to-many is already handled in the above code
             *
             * */
          }
        }
        /** -------- End -------- */

        /** Handle connectOrCreate */
        if (_.isObject(fieldData.connectOrCreate)) {
          const connects: Record<string, any>[] = Array.isArray(
            fieldData.connectOrCreate
          )
            ? fieldData.connectOrCreate
            : [fieldData.connectOrCreate];

          for (const connectOrCreate of connects) {
            if (!connectOrCreate || connectOrCreate.constructor !== Object) {
              throw new QueryException(
                `Invalid connect data for relation "${relationField}"`,
                'QUERY_INVALID'
              );
            }

            /** One-to-many or One-to-one where right side is the foreign-key holder */
            if (
              relation.left.type === 'one' &&
              relation.fKeyHolder === relation.right
            ) {
              const flattenWhere = QueryServer.flattenUniqueWhere(
                connectOrCreate.where
              );

              if (!connectOrCreate.create) {
                connectOrCreate.create = {};
              }

              for (const key of Object.keys(flattenWhere)) {
                if (!relation.fKeyHolder.fieldsFrom.includes(key)) {
                  connectOrCreate.create[key] = flattenWhere[key];
                }
              }

              mutations.push(
                ...(
                  await this.processMutation<M>(
                    {
                      type: 'upsert' as M,
                      model: relation.fKeyHolder.target,
                      query: {
                        create: connectOrCreate.create,
                        where: connectOrCreate.where,
                        update: {},
                      },
                    },
                    session,
                    prisma,
                    [
                      {
                        mutation: mutationObj,
                        relation,
                      },
                    ]
                  )
                ).all
              );

              continue;
            }
            /** -------- End -------- */

            /** Many-to-one or One-to-one where left side is the foreign-key holder */
            if (
              relation.left === relation.fKeyHolder &&
              relation.right.type === 'one'
            ) {
              this.checkUniqueWhere(
                connectOrCreate,
                relation.right.target,
                session
              );

              if (session) {
                QueryServer.checkFieldPermissions(
                  relation.left.target,
                  this.classifyFields({
                    session,
                    action: dataObj.action,
                    model: relation.left.target,
                    fields: relation.fKeyHolder.fieldsFrom,
                    classes: {
                      scalar: true,
                      notAllowed: true,
                      unknown: true,
                    },
                  })
                );
              }

              const query: Record<string, any> = {
                where: connectOrCreate.where,
                select: {},
              };

              const length = relation.fKeyHolder.fieldsTo.length;

              for (let i = 0; i < length; i++) {
                const fieldTo = relation.fKeyHolder.fieldsTo[i];
                query.select[fieldTo] = true;
              }

              const oneItem = await (
                prisma[relation.right.target] as any
              ).findUnique(query);

              if (oneItem) {
                for (let i = 0; i < length; i++) {
                  const fieldTo = relation.fKeyHolder.fieldsTo[i];
                  const fieldFrom = relation.fKeyHolder.fieldsFrom[i];

                  data[fieldFrom] = oneItem[fieldTo];
                }
              } else {
                if (!connectOrCreate.create) {
                  connectOrCreate.create = {};
                }

                const _mutations = await this.processMutation(
                  {
                    type: 'create',
                    model: relation.right.target,
                    query: {
                      data: connectOrCreate.create,
                    },
                  },
                  session,
                  prisma
                );

                if (!mutationObj.parents) {
                  mutationObj.parents = [];
                }

                mutationObj.parents.push({
                  mutation: _mutations.current[0],
                  relation,
                });

                // Add parent mutations before the current mutation
                mutations.splice(
                  mutations.indexOf(mutationObj as Mutation<M>),
                  0,
                  ...(_mutations.all as Mutation<M>[])
                );
              }
            }
            /** -------- End -------- */

            /** Many-to-many
             *
             * Explicit many-to-many is already handled in the above code
             * TODO: Support implicit many-to-many
             *
             * */
          }
        }
        /** -------- End -------- */

        /** Handle disconnect/set */
        if (!relation.left.field.isRequired) {
          /** Disconnect */
          if (
            fieldData.disconnect === true &&
            relation.left === relation.fKeyHolder
          ) {
            for (const fieldFrom of relation.fKeyHolder.fieldsFrom) {
              data[fieldFrom] = null;
            }
          } else if (_.isObject(fieldData.disconnect)) {
            const disconnects: Record<string, any>[] = Array.isArray(
              fieldData.disconnect
            )
              ? fieldData.disconnect
              : [fieldData.disconnect];

            for (const disconnect of disconnects) {
              if (!disconnect || disconnect.constructor !== Object) {
                throw new QueryException(
                  `Invalid disconnect data for relation "${relationField}"`,
                  'QUERY_INVALID'
                );
              }

              const flattenWhere = this.checkUniqueWhere(
                disconnect,
                relation.right.target,
                session
              );

              if (session) {
                QueryServer.checkFieldPermissions(
                  relation.left.target,
                  this.classifyFields({
                    session,
                    action: 'update',
                    model: relation.fKeyHolder.target,
                    fields: relation.fKeyHolder.fieldsFrom,
                    classes: {
                      scalar: true,
                      notAllowed: true,
                      unknown: true,
                    },
                  })
                );
              }

              const mutationSchema: MutationSchema = {
                type: 'update',
                model: relation.fKeyHolder.target,
                query: {
                  where: flattenWhere,
                  data: {},
                },
              };

              if (session) {
                // Apply permission
                await this.applyPermissions(
                  'update',
                  session,
                  mutationSchema,
                  relPermModel
                );
              }

              for (const fieldFrom of relation.fKeyHolder.fieldsFrom) {
                mutationSchema.query.data[fieldFrom] = null;
              }

              const update: Mutation<'update'> = {
                query: mutationSchema.query,
                type: 'update',
                model: relation.fKeyHolder.model,
                target: relation.fKeyHolder.target,
                parents: [
                  {
                    mutation: mutationObj,
                    relation,
                  },
                ],
                newData: null,
                oldData: null,
                schema: relPermModel.schema,
                permission: {
                  update: QueryServer.getActionPermission(
                    'update',
                    relation.fKeyHolder.target,
                    relPermModel,
                    session
                  ),
                },
              };

              if (session) {
                // Apply preset
                await this.applyPreset(update, session);
              }

              mutations.push(update as Mutation<M>);
            }
          }
          /** --- End --- */

          /** Set */
          if (
            Array.isArray(fieldData.set) &&
            relation.right === relation.fKeyHolder
          ) {
            if (session) {
              QueryServer.checkFieldPermissions(
                relation.right.target,
                this.classifyFields({
                  session,
                  action: 'update',
                  model: relation.right.target,
                  fields: relation.fKeyHolder.fieldsFrom,
                  classes: {
                    scalar: true,
                    notAllowed: true,
                    unknown: true,
                  },
                })
              );
            }

            const permission = QueryServer.getActionPermission(
              'update',
              relation.right.target,
              relPermModel,
              session
            );

            const mutationSchema: MutationSchema = {
              type: 'update',
              model: relation.right.target,
              query: {
                where: {},
                data: {},
              },
            };

            for (const fieldFrom of relation.fKeyHolder.fieldsFrom) {
              mutationSchema.query.data[fieldFrom] = null;
            }

            if (session) {
              // Apply permission
              await this.applyPermissions(
                'update',
                session,
                mutationSchema,
                relPermModel
              );
            }

            const updateMany: Mutation<'updateMany'> = {
              model: relation.right.model,
              target: relation.right.target,
              type: 'updateMany',
              newData: null,
              oldData: null,
              parents: [
                {
                  mutation: mutationObj,
                  relation,
                },
              ],
              schema: relPermModel.schema,
              permission: {
                update: permission,
              },
              query: mutationSchema.query,
            };

            if (session) {
              // Apply preset
              await this.applyPreset(updateMany, session);
            }

            mutations.push(updateMany as Mutation<M>);

            for (const set of fieldData.set) {
              if (!set || set.constructor !== Object) {
                throw new QueryException(
                  `Invalid set data for relation "${relationField}"`,
                  'QUERY_INVALID'
                );
              }

              const flattenWhere = this.checkUniqueWhere(
                set,
                relation.right.target,
                session
              );

              const mutationSchema: MutationSchema = {
                type: 'update',
                model: relation.right.target,
                query: {
                  where: flattenWhere,
                  data: {},
                },
              };

              if (session) {
                // Apply permission
                await this.applyPermissions(
                  'update',
                  session,
                  mutationSchema,
                  relPermModel
                );
              }

              const update: Mutation<'update'> = {
                model: relation.right.model,
                target: relation.right.target,
                type: 'update',
                newData: null,
                oldData: null,
                parents: [
                  {
                    mutation: mutationObj,
                    relation,
                  },
                ],
                schema: relPermModel.schema,
                permission: {
                  update: permission,
                },
                query: mutationSchema.query,
              };

              if (session) {
                // Apply preset
                await this.applyPreset(update, session);
              }

              mutations.push(update as Mutation<M>);
            }
          } else if (fieldData.set !== undefined) {
            throw new QueryException(
              `Invalid set data for relation "${relationField}"`,
              'QUERY_INVALID'
            );
          }
          /** --- End --- */
        } else if (
          !(relation.left.type === 'many' && relation.right.type === 'many') &&
          (fieldData.disconnect || fieldData.set)
        ) {
          throw new QueryException(
            `Cannot disconnect relation "${relationField}" because it is required`,
            'QUERY_INVALID'
          );
        }
        /** -------- End -------- */

        /** Handle update */
        if (fieldData.update) {
          const updates = Array.isArray(fieldData.update)
            ? fieldData.update
            : [fieldData.update];

          for (const update of updates) {
            if (!update || update.constructor !== Object) {
              throw new QueryException(
                `Invalid update data for relation "${relationField}"`,
                'QUERY_INVALID'
              );
            }

            let query: Record<string, any> = {};

            if (relation.right.type === 'many') {
              query = update;
            } else {
              query.data = update;
            }

            if (relation.right.type === 'many' && !query.where) {
              query.where = {};
            }

            const _mutations = await this.processMutation<M>(
              {
                model: relation.right.target,
                type: 'update' as M,
                query,
              },

              session,
              prisma,
              [
                {
                  mutation: mutationObj,
                  relation,
                },
              ]
            );

            mutations.push(..._mutations.all);
          }
        }
        /** -------- End -------- */

        /** Handle upsert */
        if (fieldData.upsert) {
          const upserts = Array.isArray(fieldData.upsert)
            ? fieldData.upsert
            : [fieldData.upsert];

          for (const upsert of upserts) {
            if (!upsert || upsert.constructor !== Object) {
              throw new QueryException(
                `Invalid upsert data for relation "${relationField}"`,
                'QUERY_INVALID'
              );
            }

            if (!upsert.create) {
              upsert.create = {};
            }

            if (!upsert.update) {
              upsert.update = {};
            }

            /** One-to-many or One-to-one where right side is the foreign-key holder */
            if (
              relation.left.type === 'one' &&
              relation.fKeyHolder === relation.right
            ) {
              if (!upsert.where) {
                upsert.where = {};
              }

              const _mutations = await this.processMutation<M>(
                {
                  model: relation.right.target,
                  type: 'upsert' as M,
                  query: upsert,
                },

                session,
                prisma,
                [
                  {
                    mutation: mutationObj,
                    relation,
                  },
                ]
              );

              mutations.push(..._mutations.all);
            } else {
              /** One-to-one/Many-to-one */

              delete upsert.where;

              const _mutations = await this.processMutation(
                {
                  model: relation.right.target,
                  type: 'upsert',
                  query: upsert,
                },
                session,
                prisma
              );

              if (!mutationObj.parents) {
                mutationObj.parents = [];
              }

              mutationObj.parents.push({
                mutation: _mutations.current[0],
                relation,
              });

              // Add parent mutations before the current mutation
              mutations.splice(
                mutations.indexOf(mutationObj as Mutation<M>),
                0,
                ...(_mutations.all as Mutation<M>[])
              );
            }
          }
        }
        /** -------- End -------- */

        /** Handle updateMany */
        if (relation.right.type === 'many' && fieldData.updateMany) {
          const updates = Array.isArray(fieldData.updateMany)
            ? fieldData.updateMany
            : [fieldData.updateMany];

          for (const update of updates) {
            if (!update || update.constructor !== Object) {
              throw new QueryException(
                `Invalid updateMany data for relation "${relationField}"`,
                'QUERY_INVALID'
              );
            }

            const _mutations = await this.processMutation<M>(
              {
                model: relation.right.target,
                type: 'updateMany' as M,
                query: update,
              },

              session,
              prisma,
              [
                {
                  mutation: mutationObj,
                  relation,
                },
              ]
            );

            mutations.push(..._mutations.all);
          }
        } else if (fieldData.updateMany) {
          throw new QueryException(
            `Cannot updateMany relation "${relationField}"`,
            'QUERY_INVALID'
          );
        }
        /** -------- End -------- */

        /** Handle delete */
        if (fieldData.delete) {
          if (
            relation.left === relation.fKeyHolder &&
            relation.left.field.isRequired
          ) {
            throw new QueryException(
              `Cannot delete relation "${relationField}" because it is required`,
              'QUERY_INVALID'
            );
          }

          // TODO: Handle circular relations

          const deletes = Array.isArray(fieldData.delete)
            ? fieldData.delete
            : [fieldData.delete];

          for (const deleteData of deletes) {
            if (!deleteData || deleteData.constructor !== Object) {
              throw new QueryException(
                `Invalid delete data for relation "${relationField}"`,
                'QUERY_INVALID'
              );
            }

            const _mutations = await this.processMutation<M>(
              {
                model: relation.right.target,
                type: 'delete' as M,
                query: {
                  where: deleteData,
                },
              },

              session,
              prisma,
              [
                {
                  mutation: mutationObj,
                  relation,
                },
              ]
            );

            mutations.push(..._mutations.all);
          }
        }
        /** -------- End -------- */

        /** Handle deleteMany */
        if (relation.right.type === 'many' && fieldData.deleteMany) {
          const deletes = Array.isArray(fieldData.deleteMany)
            ? fieldData.deleteMany
            : [fieldData.deleteMany];

          for (const deleteData of deletes) {
            if (!deleteData || deleteData.constructor !== Object) {
              throw new QueryException(
                `Invalid deleteMany data for relation "${relationField}"`,
                'QUERY_INVALID'
              );
            }

            const _mutations = await this.processMutation<M>(
              {
                model: relation.right.target,
                type: 'deleteMany' as M,
                query: {
                  where: deleteData,
                },
              },

              session,
              prisma,
              [
                {
                  mutation: mutationObj,
                  relation,
                },
              ]
            );

            mutations.push(..._mutations.all);
          }
        } else if (fieldData.deleteMany) {
          throw new QueryException(
            `Cannot deleteMany relation "${relationField}"`,
            'QUERY_INVALID'
          );
        }
        /** -------- End -------- */
      }
    }
    /** -------- End -------- */

    return {
      all: mutations,
      current: (mutation.type === 'upsert'
        ? [dataObjs[0].mutation]
        : dataObjs.map((d) => d.mutation)) as Mutation<M>[],
    };
  }

  private refreshLiveQueries(mutations: Mutation[], scope?: string) {
    const refreshed = new Set<LiveQueryServer | LiveQueryPaginatedServer>();

    for (let m = 0; m < mutations.length; m++) {
      for (const liveQuery of this.liveQueries[mutations[m].target]) {
        if (refreshed.has(liveQuery)) {
          continue;
        }

        if (liveQuery.scope === scope || !scope) {
          liveQuery.refresh();
          refreshed.add(liveQuery);
        }
      }
    }
  }

  async processQuery(
    rootQuery: QuerySchema,
    session?: Session,
  ): Promise<{
    query: QuerySchema;
    queue: (QuerySchema & { noWhere?: boolean })[];
  }> {
    const queue: (QuerySchema & { noWhere?: boolean })[] = [rootQuery];

    for (let q = 0; q < queue.length; q++) {
      const baseQuery = queue[q];

      if (!baseQuery) {
        continue;
      }

      const permissionModel = this.models[baseQuery.model];
      const modelFields = prismaUtils.fields[baseQuery.model];

      if (!permissionModel || !modelFields) {
        // Permission for this model is not defined
        throw new QueryException(
          `You don't have access to model "${baseQuery.model}" or it doesn't exist.`,
          'PERMISSION_DENIED'
        );
      }

      // Check if user has permission to subscribe to this model
      if (
        session &&
        baseQuery.subscribe &&
        !QueryServer.getActionPermission(
          'subscribe',
          baseQuery.model,
          permissionModel,
          session
        )
      ) {
        throw new QueryException(
          `You don't have access to subscribe to model "${baseQuery.model}".`,
          'PERMISSION_DENIED'
        );
      }

      if (baseQuery.query.select) {
        this.processSelect(queue, baseQuery, modelFields, session);
      } else {
        // Add default fields to select
        this.addDefaultSelects(queue, baseQuery, modelFields, session);
      }

      if (baseQuery.query.orderBy) {
        this.checkOrderBy(baseQuery, session);
      }

      // Check permission for orderBy and cursor fields
      const objClauses = ['cursor', '_sum', '_avg', '_min', '_max'];
      const arrClauses = ['distinct', 'by'];
      const fieldSetToCheck: string[][] = [];

      const objLength = objClauses.length;
      for (let i = 0; i < objLength; i++) {
        const clause = objClauses[i];
        if (baseQuery.query[clause]) {
          fieldSetToCheck.push(Object.keys(baseQuery.query[clause]));
        }
      }

      const arrLength = arrClauses.length;
      for (let i = 0; i < arrLength; i++) {
        const clause = arrClauses[i];
        if (!baseQuery.query[clause]) {
          continue;
        }

        if (typeof baseQuery.query[clause] === 'string') {
          fieldSetToCheck.push([baseQuery.query[clause]]);
        } else if (Array.isArray(baseQuery.query[clause])) {
          fieldSetToCheck.push(baseQuery.query[clause]);
        }
      }

      if (session && fieldSetToCheck.length) {
        QueryServer.checkFieldPermissions(
          baseQuery.model,
          this.classifyFields({
            session,
            action: 'read',
            model: baseQuery.model,
            fields: Array.from(new Set(fieldSetToCheck.flat())),
            classes: {
              scalar: true,
              notAllowed: true,
              unknown: true,
            },
          })
        );
      }

      // Check permission for fields specified in where clause
      if (baseQuery.query.where) {
        this.checkWhere(
          {
            model: baseQuery.model,
            where: baseQuery.query.where,
          },
          session
        );
      }

      if (baseQuery.query.having) {
        this.checkWhere(
          {
            model: baseQuery.model,
            where: baseQuery.query.having,
          },
          session
        );
      }

      // Add permission query to base query
      if (session) {
        await this.applyPermissions(
          'read',
          session,
          baseQuery,
          permissionModel
        );
      }
    }

    return {
      query: rootQuery,
      queue,
    };
  }

  async find(
    rootQuery: QuerySchema,
    session?: Session,
    trxOrId?: PrismaClient | Prisma.TransactionClient | string
  ): Promise<
    | LiveQueryServer<Record<string, any>>
    | LiveQueryPaginatedServer<Record<string, any>[]>
    | NormalQueryPaginated<Record<string, any>[]>
    | Record<string, any>
    | Record<string, any>[]
  > {
    const trx =
      typeof trxOrId === 'string' ? this.transactions[trxOrId]?.trx : trxOrId;
    const processResult = await this.processQuery(rootQuery, session);

    rootQuery = processResult.query;

    if (rootQuery.subscribe) {
      const dependencies = new Set<string>();

      for (const query of processResult.queue) {
        dependencies.add(query.model);
      }

      let liveQuery: LiveQueryServer | LiveQueryPaginatedServer;

      if (rootQuery.type === 'findMany' || rootQuery.type === 'groupBy') {
        const count = await (prisma[rootQuery.model] as any).count({
          where: rootQuery.query.where,
        });

        liveQuery = new LiveQueryPaginatedServer(
          count,
          rootQuery as QuerySchema,
          this,
          dependencies,
          session?.storeId,
          session
        );
      } else {
        liveQuery = new LiveQueryServer(
          rootQuery as QuerySchema,
          this,
          dependencies,
          session?.storeId,
          session
        );
      }

      for (const dependency of dependencies) {
        this.liveQueries[dependency].add(liveQuery);
      }

      return liveQuery;
    }

    const _prisma = trx ?? prisma;

    if (rootQuery.type === 'findMany' || rootQuery.type === 'groupBy') {
      const count = await (_prisma[rootQuery.model] as any).count({
        where: rootQuery.query.where,
      });

      return new NormalQueryPaginated(count, rootQuery, _prisma);
    }

    const query = rootQuery.query;

    return await (_prisma[rootQuery.model][rootQuery.type] as any)(query);
  }

  async create(
    mutation: Mutation<'create'>,
    trx: PrismaClient | Prisma.TransactionClient,
    session?: Session,
    emitEvents = true
  ): Promise<void> {
    // Connect parent
    QueryServer.connectMutationParent(mutation);

    mutation.newData = await (trx[mutation.target] as any).create(
      mutation.query
    );

    if (session) {
      // Apply validation
      await this.applyValidation(mutation, session, trx);
    }

    const eventPayload = _.pick(
      mutation,
      'newData',
      'oldData',
      'target',
      'type'
    );

    if (session) {
      (eventPayload as any).session = session;
    }

    if (emitEvents) {
      emitter.emitAsync(`db.${mutation.target}.create`, eventPayload);
    }
  }

  async update(
    mutation: Mutation<'update'>,
    trx: PrismaClient | Prisma.TransactionClient,
    session?: Session,
    emitEvents = true
  ): Promise<Record<string, any> | void> {
    // Find item to update
    await QueryServer.findItemToMutate(mutation, trx);

    if (!mutation.oldData) {
      return;
    }

    if (emitEvents) {
      await emitter.emitAsync(`db.${mutation.target}.beforeUpdate`, {
        type: 'beforeUpdate',
        target: mutation.target,
        session,
        newData: null,
        oldData: mutation.oldData,
      });
    }

    let originalSelection: Set<string> | undefined;

    // Add the scalar fields to the selection
    if (mutation.query.select) {
      originalSelection = new Set(Object.keys(mutation.query.select));

      for (const field of mutation.model.scalarFields) {
        mutation.query.select[field] = true;
      }
    } else if (mutation.query.include) {
      // No selection specified, but include is specified

      mutation.query.select = {};

      for (const field of mutation.model.scalarFields) {
        mutation.query.select[field] = true;
      }
    }

    mutation.newData = await (trx[mutation.target] as any).update(
      mutation.query
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newData = mutation.newData!;

    const scalarData = _.pick(newData, mutation.model.scalarFields);

    // Do joi validation
    if (mutation.schema) {
      try {
        await mutation.schema.validateAsync(scalarData, {
          abortEarly: true,
          allowUnknown: true,
        });
      } catch (e) {
        throw new QueryException((e as any).message, 'VALIDATION_FAILED');
      }
    }

    if (session) {
      // Apply validation
      await this.applyValidation(mutation, session, trx);
    }

    const eventPayload = _.pick(mutation, 'oldData', 'target', 'type');

    if (session) {
      (eventPayload as any).session = session;
    }

    (eventPayload as any).newData = scalarData;

    if (emitEvents) {
      emitter.emitAsync(`db.${mutation.target}.update`, eventPayload);
    }

    if (!originalSelection && mutation.query.include) {
      // Delete all fields that were not selected
      for (const field of mutation.model.scalarFields) {
        delete newData[field];
      }
    } else if (originalSelection) {
      // Remove the scalar fields we added to the selection if they were not selected
      for (const field of Object.keys(newData)) {
        if (
          mutation.model.scalarFieldsSet.has(field) ||
          !originalSelection.has(field)
        ) {
          delete newData[field];
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return mutation.newData!;
  }

  async delete(
    mutation: Mutation<'delete'>,
    trx: PrismaClient | Prisma.TransactionClient,
    session?: Session,
    emitEvents = true
  ): Promise<Record<string, any> | void> {
    // Find item to update
    await QueryServer.findItemToMutate(mutation, trx);

    if (!mutation.oldData) {
      return;
    }

    if (emitEvents) {
      await emitter.emitAsync(`db.${mutation.target}.beforeDelete`, {
        type: 'beforeDelete',
        target: mutation.target,
        session,
        newData: null,
        oldData: mutation.oldData,
      });
    }

    const item = await (trx[mutation.target] as any).delete(mutation.query);

    const eventPayload = _.pick(
      mutation,
      'newData',
      'oldData',
      'target',
      'type'
    );

    if (session) {
      (eventPayload as any).session = session;
    }

    if (emitEvents) {
      emitter.emitAsync(`db.${mutation.target}.delete`, eventPayload);
    }

    return item;
  }

  async upsert(
    mutation: Mutation<'upsert'>,
    trx: PrismaClient | Prisma.TransactionClient,
    session?: Session,
    emitEvents = true
  ): Promise<void> {
    // Find item to update
    await QueryServer.findItemToMutate(mutation, trx);

    if (!mutation.oldData) {
      QueryServer.connectMutationParent(mutation);

      mutation.newData = await (trx[mutation.target] as any).create({
        data: mutation.query.create,
      });

      if (session) {
        // Apply validation
        await this.applyValidation(mutation, session, trx);
      }

      const eventPayload = _.pick(
        mutation,
        'newData',
        'oldData',
        'target',
        'type'
      );

      if (session) {
        (eventPayload as any).session = session;
      }

      (eventPayload as any).type = 'create';

      if (emitEvents) {
        emitter.emitAsync(`db.${mutation.target}.create`, eventPayload);
      }

      return;
    }

    if (emitEvents) {
      await emitter.emitAsync(`db.${mutation.target}.beforeUpdate`, {
        type: 'beforeUpdate',
        target: mutation.target,
        session,
        newData: null,
        oldData: mutation.oldData,
      });
    }

    mutation.newData = await (trx[mutation.target] as any).update({
      where: mutation.query.where,
      data: mutation.query.update,
    });

    // Do joi validation
    if (mutation.schema) {
      try {
        await mutation.schema.validateAsync(mutation.newData, {
          abortEarly: true,
          allowUnknown: true,
        });
      } catch (e) {
        throw new QueryException((e as any).message, 'VALIDATION_FAILED');
      }
    }

    if (session) {
      // Apply validation
      await this.applyValidation(mutation, session, trx);
    }

    const eventPayload = _.pick(
      mutation,
      'newData',
      'oldData',
      'target',
      'type'
    );

    if (session) {
      (eventPayload as any).session = session;
    }

    (eventPayload as any).type = 'update';
    if (emitEvents) {
      emitter.emitAsync(`db.${mutation.target}.update`, eventPayload);
    }
  }

  async updateManyOrDeleteMany(
    mutation: Mutation<'updateMany' | 'deleteMany'>,
    trx: PrismaClient | Prisma.TransactionClient,
    session?: Session,
    emitEvents = true
  ): Promise<Record<string, any>> {
    const batchSize = 10;
    const findQuery: Record<string, any> = {
      where: mutation.query.where,
      select: {},
      orderBy: [],
      take: batchSize + 1,
    };

    for (const pKey of mutation.model.primaryKey) {
      findQuery.select[pKey] = true;
      findQuery.orderBy.push({
        [pKey]: 'asc',
      });
    }

    const pKeyWrapper = mutation.model.primaryKey.join('_');
    const cursor: Record<string, any> = {};
    let cursorInner: Record<string, any> = cursor;

    if (mutation.model.primaryKey.length > 1) {
      cursor[pKeyWrapper] = {};
      cursorInner = cursor[pKeyWrapper];
    }

    const results: Record<string, any> = [];
    let batch = 0;

    while (true) {
      if (batch > 0) {
        findQuery.cursor = cursor;
      }

      batch++;
      const items = await (trx[mutation.target] as any).findMany(findQuery);
      const mutations: Mutation<'delete' | 'update'>[] = [];

      if (items.length === 0) {
        // No more items to delete
        break;
      }

      // Create delete mutations, excluding the last item
      for (const item of items.slice(0, batchSize)) {
        const mutationQuery: Record<string, any> = {
          where: {},
        };

        // Note: Deep clone to avoid mutating the original

        // Add selection if exists
        if (mutation.query.select) {
          mutationQuery.select = _.cloneDeep(mutation.query.select);
        }

        // Add include if exists
        if (mutation.query.include) {
          mutationQuery.include = _.cloneDeep(mutation.query.include);
        }

        // Add data if exists
        if (mutation.query.data) {
          mutationQuery.data = _.cloneDeep(mutation.query.data);
        }

        // Build where clause
        if (mutation.model.primaryKey.length > 1) {
          // Complex primary key
          mutationQuery.where[pKeyWrapper] = {};

          for (const pKey of mutation.model.primaryKey) {
            mutationQuery.where[pKeyWrapper][pKey] = item[pKey];
          }
        } else {
          // Simple primary key
          mutationQuery.where[mutation.model.primaryKey[0]] =
            item[mutation.model.primaryKey[0]];
        }

        mutations.push({
          type: mutation.type === 'updateMany' ? 'update' : 'delete',
          model: mutation.model,
          target: mutation.target,
          permission: mutation.permission,
          oldData: null,
          newData: null,
          parents: mutation.parents,
          query: mutationQuery,
        });
      }

      const mutatedItems = await Promise.all(
        mutations.map((m) => this[m.type](m as any, trx, session, emitEvents))
      );

      results.push(...mutatedItems);

      if (items.length < batchSize) {
        // Last batch
        break;
      }

      // Update cursor
      for (const pKey of mutation.model.primaryKey) {
        cursorInner[pKey] = items[items.length - 1][pKey];
      }
    }

    return results;
  }

  transaction(
    session?: Session,
    maxWait = 2,
    timeout = 3000,
    isolationLevel?: Prisma.TransactionIsolationLevel
  ): Promise<string> {
    const trxId = uuid.v4().toString();

    prisma
      .$transaction(
        (trx) => {
          const promise = new Promise<any>((resolve, reject) => {
            this.transactions[trxId] = new Transaction(trx, resolve, reject);
          });

          promise.then(() => {
            delete this.transactions[trxId];
          });

          return promise;
        },
        { maxWait, timeout, isolationLevel }
      )
      .catch((e) => {
        const transaction = this.transactions[trxId];

        if (transaction) {
          if (!transaction.completed) {
            transaction.rollback(e as any);
          }

          delete this.transactions[trxId];
        }

        console.error(e);

        throw new QueryException(
          'Failed to start transaction',
          'TRANSACTION_FAILED'
        );
      });

    return Promise.resolve(trxId);
  }

  async mutate(
    mutation: MutationSchema,
    session?: Session,
    emitEvents = true,
    trxOrId?: string | Prisma.TransactionClient
  ): Promise<any> {
    let select: Record<string, any> | null = null;
    let include: Record<string, any> | null = null;

    if (mutation.query.select || mutation.query.include) {
      // Process select and include
      const selectQueue: MutationSchema[] | null = [mutation];

      for (let q = 0; q < selectQueue.length; q++) {
        const baseQuery = selectQueue[q];
        const modelFields = prismaUtils.fields[baseQuery.model];
        const permissionModel = this.models[baseQuery.model];

        if (!modelFields || !permissionModel) {
          // Permission for this model is not defined
          throw new QueryException(
            `You don't have access to model "${baseQuery.model}" or it doesn't exist.`,
            'PERMISSION_DENIED'
          );
        }

        if (baseQuery.query.select) {
          this.processSelect(selectQueue, baseQuery, modelFields, session);
        } else {
          // Add default fields to select
          this.addDefaultSelects(selectQueue, baseQuery, modelFields, session);
        }
      }

      // Backup root query's selections
      select = mutation.query.select;
      include = mutation.query.include;
      delete mutation.query.select;
      delete mutation.query.include;
    }

    const trx =
      typeof trxOrId === 'string'
        ? this.transactions[trxOrId].trx ?? null
        : trxOrId ?? null;

    // Process mutations
    const mutations = await this.processMutation(
      mutation,
      session,
      trx ?? prisma
    )
      .then((mutations) => mutations)
      .catch((err: QueryException) => {
        throw err;
      });

    if (!mutations) {
      return;
    }

    // Add select and include to root query when mutation type is one of the following
    // - delete
    // - deleteMany
    // - updateMany
    if (
      mutation.type === 'delete' ||
      mutation.type === 'deleteMany' ||
      mutation.type === 'updateMany'
    ) {
      if (select) {
        for (const mutation of mutations.current) {
          mutation.query.select = select;
        }
      }

      if (include) {
        for (const mutation of mutations.current) {
          mutation.query.include = include;
        }
      }
    }

    if (mutation.type === 'delete') {
      const item = await this.delete(
        mutations.current[0] as Mutation<'delete'>,
        trx ?? prisma,
        session,
        emitEvents
      );

      if (!item) {
        throw new QueryException(
          `Item to delete is not found`,
          'RECORD_NOT_FOUND'
        );
      }

      this.refreshLiveQueries(mutations.all, session?.storeId);

      return item;
    }

    const trxConfig = {
      timeout: process.env.NODE_ENV === 'development' ? 600000 : 600000, // 30 seconds or 10 minutes
      maxWait: process.env.NODE_ENV === 'development' ? 600000 : 600000, // 30 seconds or 10 minutes
    };

    if (mutation.type === 'deleteMany' || mutation.type === 'updateMany') {
      const run = async (trx: PrismaClient | Prisma.TransactionClient) => {
        return (
          await Promise.all(
            mutations.all.map((mutation) =>
              this.updateManyOrDeleteMany(
                mutation as Mutation<'deleteMany' | 'updateMany'>,
                trx,
                session,
                emitEvents
              )
            )
          )
        ).flat();
      };

      const result = trx
        ? await run(trx)
        : await prisma.$transaction(run, trxConfig);

      this.refreshLiveQueries(mutations.all, session?.storeId);

      return result;
    }

    const run = async (trx: PrismaClient | Prisma.TransactionClient) => {
      for (const mutation of mutations.all) {
        await this[mutation.type as 'create' | 'upsert' | 'update'](
          mutation as any,
          trx,
          session,
          emitEvents
        );
      }
    };

    if (trx) {
      await run(trx);
    } else {
      await prisma.$transaction(async (trx) => {
        for (const mutation of mutations.all) {
          await this[mutation.type as 'create' | 'upsert' | 'update'](
            mutation as any,
            trx,
            session,
            emitEvents
          );
        }
      }, trxConfig);
    }

    this.refreshLiveQueries(mutations.all, session?.storeId);

    if (!select && !include) {
      if (mutation.type === 'createMany') {
        return mutations.current.map((m) => m.newData);
      }

      return mutations.current[0].newData;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const model = prismaUtils.models[mutation.model]!;
    const query: Record<string, any> = {
      where: {},
    };

    if (select) {
      query.select = select;
    }

    if (include) {
      query.include = include;
    }

    if (mutation.type === 'createMany') {
      if (model.primaryKey.length > 1) {
        query.where[model.primaryKey[0]] = {
          in: mutations.current.map((m) => m.newData?.[model.primaryKey[0]]),
        };
      } else {
        query.where.OR = [];

        for (const m of mutations.current) {
          query.where.OR.push(_.pick(m.newData, model.primaryKey));
        }
      }

      return await ((trx ?? prisma)[mutation.model] as any).findMany(query);
    }

    query.where = _.pick(mutations.current[0].newData, model.primaryKey);
    return await ((trx ?? prisma)[mutation.model] as any).findFirst(query);
  }
}

export const queryServer = new QueryServer();
