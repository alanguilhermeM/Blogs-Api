const BlogPost = require('../services/blogPost.service');
const Category = require('../services/category.service');
const { validateNewPost } = require('../services/validations/validationsInputValues');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const error = validateNewPost({ title, content, categoryIds });
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  const categoriesCount = await Category.getCategory(categoryIds);
  if (categoriesCount !== categoryIds.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const { status, data } = await BlogPost.createPost(title, content, categoryIds, id);
  return res.status(status).json(data);
};

module.exports = { createPost };