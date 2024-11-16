import Joi from 'joi';

export const findUnique = Joi.object({
  where: Joi.object()
    .pattern(Joi.string().required(), [
      Joi.string(),
      Joi.number(),
      Joi.boolean(),
      Joi.object().pattern(Joi.string(), [
        Joi.string(),
        Joi.number(),
        Joi.boolean(),
      ]),
    ])
    .keys()
    .min(1)
    .required(),
  include: Joi.object().optional(),
  select: Joi.object().optional(),
}).required();
