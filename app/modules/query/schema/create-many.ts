import Joi from 'joi';

export const createMany = Joi.object({
  include: Joi.object().optional(),
  select: Joi.object().optional(),
  data: [Joi.object(), Joi.array().has(Joi.object())],
  // TODO: Support skipDuplicates
}).required();
