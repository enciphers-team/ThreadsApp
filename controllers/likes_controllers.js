const Like = require('./../models/like');
const Post = require('./../models/post');

const { getAllPosts } = require('./utils');

module.exports = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    const existingLike = await Like.findOne({
      postId: postId,
      user: userId,
    });

    let deleted = false;

    if (existingLike) {
      post.likes.pull(existingLike._id);
      await post.save();
      await existingLike.remove();
      deleted = true;
    } else {
      const newLike = await Like.create({
        user: userId,
        postId: postId,
      });
      post.likes.push(newLike._id);
      await post.save();
    }

    let allposts = await getAllPosts();
    return res.status(200).json(allposts);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'something went wrong in liking post! Try again later',
    });
  }
};
