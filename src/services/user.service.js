const { User } = require('../models');

const getByUserId = (userId) => User.findByPk(userId);

const getUsers = () => User.findAll({
  attributes: { exclude: ['password'] },
});
const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = (object) => User.create(object);

module.exports = {
  getByEmail,
  createUser,
  getByUserId,
  getUsers,
};