const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

const secret = process.env.JWT_SECRET || '12345';

const isBodyValid = (email, password) => email && password;
const validateField = (user, password) => {
  if (!user || user.password !== password) {
    return false;
  }
};

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isBodyValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await UserService.getByEmail(email);
    // console.log(user);
    const validate = validateField(user, password);
    if (validate === false) {
      // console.log(validate);
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = jwt.sign({ data: { userId: user.id } }, secret);

    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};