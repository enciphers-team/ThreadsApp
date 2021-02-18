const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.home = async (req, res) => {
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

  return res.render('home', {
    layout: 'layout',
    name: 'shivam',
    posts: posts,
  });
};
module.exports;
