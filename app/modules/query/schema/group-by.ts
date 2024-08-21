import Joi from 'joi';

export const groupBy = Joi.object({
  where: Joi.object().optional(),
  cursor: Joi.object().optional(),
  by: Joi.array().items(Joi.string()).optional(),
  orderBy: Joi.object().required(),
  page: Joi.number().optional(),
  pageSize: Joi.number().optional(),
  having: Joi.object().optional(),
  _avg: Joi.object().optional(),
  _count: Joi.object().optional(),
  _max: Joi.object().optional(),
  _min: Joi.object().optional(),
  _sum: Joi.object().optional(),
}).required();
