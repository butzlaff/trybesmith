import Joi from 'joi';

const validateProduct = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.string': '"name" must be a string',
    'string.min': '"name" length must be at least 3 characters long',
    'any.required': '"name" is required',
  }),
  price: Joi.string().min(3).required().messages({
    'any.string': '"price" must be a string',
    'string.min': '"price" length must be at least 3 characters long',
    'any.required': '"price" is required',
  }),
  orderId: Joi.number().integer().positive().allow(null),
});

export default validateProduct;