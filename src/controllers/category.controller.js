const Category = require('../services/category.service');
const { validateNewCategory } = require('../services/validations/validationsInputValues');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const error = validateNewCategory(name);
    if (error) return res.status(400).json({ message: error.message });

    const category = await Category.createCategory(name);
    res.status(201).json(category);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'error', error: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.getCategories();
    res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'error', error: err.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
};
