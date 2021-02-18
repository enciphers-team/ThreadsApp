const User = require('../models/user');
const Post = require('../models/post');
const Like = require('../models/like');
const Comment = require('../models/comment');
const BookMark = require('../models/BookMark');

const deleteUser = async (id) => {
  try {
    // delete all comment of posts
    const posts = await Post.find({ $or: [{ user: id }, { sharedUser: id }] });

    for (postResult of posts) {
      let deleteBookMark = await BookMark.deleteMany({ post: postResult._id });

      for (commentId of postResult.comments) {
        const deleteCommentResult = await Comment.deleteOne({ _id: commentId });
      }
      const deleteLikesResult = await Like.deleteMany({
        postId: postResult._id,
      });
      let deleteComment = await Comment.deleteMany({ post: postResult._id });
    }

    const deleteCommentResult = await Comment.deleteMany({ user: id });
    let deleteBookMark = await BookMark.deleteMany({ user: id });

    const deletePostResult = await Post.deleteMany({
      $or: [{ user: id }, { sharedUser: id }],
    });
    const deleteLike = await Like.deleteMany({ user: id });
    const deleteAccountResult = await User.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteUser;
