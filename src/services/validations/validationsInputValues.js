const { insertUser, insertCategory, insertPost } = require('../schemas');

const validateNewUser = ({ displayName, email, password }) => {
  const { error } = insertUser
    .validate({ displayName, email, password });
  if (error) return { status: 400, message: error.message };
};

const validateNewCategory = (name) => {
  const { error } = insertCategory
    .validate({ name });
    console.log(error);
  if (error) {
    return { status: 400, message: error.message };
  }
};

const validateNewPost = ({ title, content, categoryIds }) => {
  const { error } = insertPost
    .validate({ title, content, categoryIds });
  if (error) {
    return { status: 400, message: error.details[0].message };
  }
};

const validateUpdatePost = (title, content) => {
  const { error } = insertPost
    .validate({ title, content });
  if (error) {
    return { status: 400, message: error.details[0].message };
  }
};

module.exports = {
  validateNewUser,
  validateNewCategory,
  validateNewPost,
  validateUpdatePost,
};