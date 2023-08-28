const Joi = require('joi');

const insertUser = Joi.object({
  displayName: Joi.string().min(8)
  .message('"displayName" length must be at least 8 characters long'),
  email: Joi.string().email().message('"email" must be a valid email'),
  password: Joi.string().length(6).message('"password" length must be at least 6 characters long'),
});

module.exports = { insertUser };