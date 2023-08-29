const Joi = require('joi');

const insertUser = Joi.object({
  displayName: Joi.string().min(8)
  .message('"displayName" length must be at least 8 characters long'),
  email: Joi.string().email().message('"email" must be a valid email'),
  password: Joi.string().length(6).message('"password" length must be at least 6 characters long'),
});

const insertCategory = Joi.object({
  name: Joi.string().min(1).message('"name" is required"').required(),
});

const insertPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
}).messages({
  'string.empty': 'Some required fields are missing',
  'any.required': 'Some required fields are missing',
});

module.exports = { insertUser, insertCategory, insertPost };