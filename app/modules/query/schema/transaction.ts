import type { Prisma } from '#prisma-client';
import Joi from 'joi';

export interface TransactionSchema {
  id?: string;
  action: 'start' | 'commit' | 'rollback';
  maxWait?: number;
  timeout?: number;
  isolationLevel?: Prisma.TransactionIsolationLevel;
}

export const transactionSchema = Joi.object({
  action: Joi.string().valid('start', 'commit', 'rollback').required(),
  maxWait: Joi.number().when('action', {
    is: Joi.string().valid('start'),
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
  timeout: Joi.number().when('action', {
    is: Joi.string().valid('start'),
    then: Joi.optional(),
  }),
  isolationLevel: Joi.string()
    .valid('ReadUncommitted', 'ReadCommitted', 'RepeatableRead', 'Serializable')
    .when('action', {
      is: Joi.string().valid('start'),
      then: Joi.optional(),
      otherwise: Joi.forbidden(),
    }),
  id: Joi.number().when('action', {
    is: Joi.string().valid('commit', 'rollback'),
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
});
