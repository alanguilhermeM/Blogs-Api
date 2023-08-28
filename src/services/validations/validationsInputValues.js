const { insertUser, insertCategory } = require('../schemas');

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

module.exports = {
  validateNewUser,
  validateNewCategory,
};