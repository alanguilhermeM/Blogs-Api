const login = require('./controllers/login.controller');
const createUser = require('./controllers/createUser');
const { getAllUsers, getUserById } = require('./controllers/getUsers');

module.exports = {
  login,
  createUser,
  getAllUsers,
  getUserById,
};
