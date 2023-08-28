const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const { validateNewUser } = require('../services/validations/validationsInputValues');

const secret = process.env.JWT_SECRET || '12345';
module.exports = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const error = validateNewUser({ displayName, email, password });
    if (error) return res.status(400).json({ message: error.message });
    const alreadyExist = await UserService.getByEmail(email);
    if (alreadyExist) return res.status(409).json({ message: 'User already registered' });

    const user = await UserService.createUser({ displayName, email, password, image });

    const token = jwt.sign({ data: { userId: user.id } }, secret);
    res.status(201).json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};
