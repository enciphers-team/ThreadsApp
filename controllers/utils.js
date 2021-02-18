const Post = require('../models/post');
const User = require('../models/user');

module.exports.getAllPosts = async () => {
  const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    .populate({
      path: 'likes',
    })
    .populate({
      path: 'tags',
    })
    .populate({
      path: 'sharedUser',
    });
  return posts;
};

module.exports.getSingleUser = async (id) => {
  const user = await User.findOne({ _id: id });

  return user;
};
