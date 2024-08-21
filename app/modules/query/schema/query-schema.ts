import type { ModelNames } from '../types/model-names';
import { findUnique } from './find-unique.js';
import { aggregate } from './aggregate.js';
import { findMany } from './find-many.js';
import { groupBy } from './group-by.js';
import { count } from './count.js';
import Joi from 'joi';

export type QueryType =
  | 'findMany'
  | 'findFirst'
  | 'findUnique'
  | 'count'
  | 'groupBy'
  | 'aggregate';

export interface QuerySchema<
  M extends ModelNames = ModelNames,
  T extends QueryType = QueryType
> {
  type: T;
  subscribe?: boolean;
  query: Record<string, any>;
  model: M;
  trxId?: string;
}

export const querySchema = Joi.object<QuerySchema>({
  type: Joi.string()
    .required()
    .valid(
      'findMany',
      'findFirst',
      'findUnique',
      'count',
      'aggregate',
      'groupBy'
    ),
  trxId: Joi.string().optional(),
  subscribe: Joi.boolean().optional(),
  query: Joi.when('type', {
    switch: [
      {
        is: 'findUnique',
        then: findUnique,
      },
      {
        is: 'findFirst',
        then: findMany,
      },
      {
        is: 'findMany',
        then: findMany,
      },
      {
        is: 'count',
        then: count,
      },
      {
        is: 'aggregate',
        then: aggregate,
      },
      {
        is: 'groupBy',
        then: groupBy,
      },
    ],
  }),
  model: Joi.string().required(),
});
