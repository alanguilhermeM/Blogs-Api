const { BlogPost, PostCategory, sequelize } = require('../models');

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

module.exports = {
  createPost,
};