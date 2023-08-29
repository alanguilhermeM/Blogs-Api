const { Op } = require('sequelize');
const { Category } = require('../models');

const createCategory = (name) => Category.create({ name });

const getCategories = () => Category.findAll();

// const getCategory = (category) => Category.findOne({ where: category });

const getCategory = async (categories) => {
  const { count } = await Category.findAndCountAll({
    where: {
      id: {
        [Op.in]: categories,
      },
    },
  });
  console.log(count);
  return count;
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
};