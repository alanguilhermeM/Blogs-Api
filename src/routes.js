const login = require('./controllers/login.controller');
const createUser = require('./controllers/createUser');
const { getAllUsers, getUserById } = require('./controllers/getUsers');
const { createCategory, getCategories } = require('./controllers/category.controller');
const { createPost, getPosts, getPostById, updatePost, delet } = require('./controllers/blogPost');

module.exports = {
  login,
  createUser,
  getAllUsers,
  getUserById,
  createCategory,
  getCategories,
  createPost,
  getPosts,
  getPostById,
  updatePost,
  delet,
};
