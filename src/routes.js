const login = require('./controllers/login.controller');
const createUser = require('./controllers/createUser');
const { getAllUsers, getUserById } = require('./controllers/getUsers');
const { createCategory } = require('./controllers/category.controller');

module.exports = {
  login,
  createUser,
  getAllUsers,
  getUserById,
  createCategory,
};
