import Joi from 'joi';

export const findMany = Joi.object({
  where: Joi.object().optional(),
  cursor: Joi.object().optional(),
  distinct: Joi.array().items(Joi.string()).optional(),
  include: Joi.object().optional(),
  select: Joi.object().optional(),
  orderBy: Joi.object().optional(),
  page: Joi.number().optional(),
  pageSize: Joi.number().optional(),
}).required();
