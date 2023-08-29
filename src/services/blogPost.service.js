const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

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

module.exports = {
  createPost,
  getPosts,
  getPostById,
};