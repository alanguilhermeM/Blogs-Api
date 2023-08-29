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

const getPosts = async (_req, res) => {
  const posts = await BlogPost.getPosts();
  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await BlogPost.getPostById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { title, content } = req.body;
  const { status, data } = await BlogPost.updatePost(id, title, content, userId);
  return res.status(status).json(data);
};

const delet = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { status, data } = await BlogPost.delet(id, userId);
  
  if (data) return res.status(status).json(data);

  return res.status(status).end();
};

module.exports = { createPost, getPosts, getPostById, updatePost, delet };