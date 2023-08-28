const UserService = require('../services/user.service');

module.exports = async (_req, res) => {
  try {
    const users = await UserService.getUsers();

    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar usuários no banco', error: err.message });
  }
};