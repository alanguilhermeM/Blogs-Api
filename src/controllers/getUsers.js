const UserService = require('../services/user.service');

const getAllUsers = async (_req, res) => {
  try {
    const users = await UserService.getUsers();

    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar usuários no banco', error: err.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserService.getByUserId(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar usuários no banco', error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
};