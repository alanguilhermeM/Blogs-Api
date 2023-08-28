const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = (object) => User.create(object);

module.exports = {
  getByEmail,
  createUser,
};