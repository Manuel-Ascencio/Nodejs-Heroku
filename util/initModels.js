const initModels = () => {
  const { Post } = require('../models/post.model');
  const { User } = require('../models/user.model');
  const { Comment } = require('../models/comment.model');

  User.hasMany(Post);
  Post.belongsTo(User);

  Post.hasMany(Comment);
  Comment.belongsTo(Post);

  User.hasMany(Comment);
  Comment.belongsTo(User);
};

module.exports = { initModels };
