const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');
// const { validateUpdatePost } = require('./validations/validationsInputValues');

const createPost = async (title, content, categoryIds, userId) => {
  const response = await sequelize.transaction(async (t) => {
    const blogPost = await BlogPost
      .create({ title, content, userId }, { transaction: t });
    await PostCategory
      .bulkCreate([...categoryIds.map((id) => ({ categoryId: id, postId: blogPost.id }))], {
        transaction: t,
      });
    return blogPost;
  });
  const post = await BlogPost.findOne({ where: { id: response.id } });
  return { status: 201, data: post };
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user', // O apelido da inclusão, você pode usar esse apelido para acessar os dados
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories', // O apelido da inclusão, você pode usar esse apelido para acessar os dados
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });
  return posts;
};

const getPostById = async (id) => {
  const posts = await BlogPost.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'user', // O apelido da inclusão, você pode usar esse apelido para acessar os dados
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories', // O apelido da inclusão, você pode usar esse apelido para acessar os dados
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });
  return posts;
};

const updatePost = async (id, title, content, userId) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (post.userId !== userId) return ({ status: 401, data: { message: 'Unauthorized user' } });

  // const error = validateUpdatePost(title, content);
  // if (error) return ({ status: 400, data: { message: 'Some required fields are missing' } });
  if (!title || !content) {
    return ({ status: 400, data: { message: 'Some required fields are missing' } });
  }

  await BlogPost.update({ title, content }, { where: { id } });
  const updatedPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 200, data: updatedPost };
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
};