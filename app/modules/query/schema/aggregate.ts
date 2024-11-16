import Joi from 'joi';

export const aggregate = Joi.object({
  where: Joi.object().optional(),
  cursor: Joi.object().optional(),
  orderBy: Joi.object().optional(),
  skip: Joi.number().optional(),
  take: Joi.number().optional(),
  _avg: Joi.object().optional(),
  _count: Joi.object().optional(),
  _max: Joi.object().optional(),
  _min: Joi.object().optional(),
  _sum: Joi.object().optional(),
}).required();
