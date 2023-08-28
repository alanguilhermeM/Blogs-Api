const { insertUser } = require('../schemas');

const validateNewUser = ({ displayName, email, password }) => {
  const { error } = insertUser
    .validate({ displayName, email, password });
  if (error) return { status: 400, message: error.message };
};

module.exports = {
  validateNewUser,
};