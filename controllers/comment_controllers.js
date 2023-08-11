const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { getAllPosts } = require('./utils');

module.exports.createComment = async (req, res) => {
  try {
    if (req.body.description && req.body.description.length > 200) {
      return res
        .status(400)
        .json({ message: 'Comment should be smaller than 200 character' });
    }

    if (!req.body.description || req.body.description.length == 0) {
      return res.status(400).json({ message: "Comment shouldn't be empty" });
    }

    const post = await Post.findById(req.body.post_value);

    if (post) {
      const comment = await Comment.create(
        {
          description: req.body.description,
          post: req.body.post_value,
          user: req.user._id,
        }
      );
      await post.comments.push(comment);
      await post.save();
      const allPost = await getAllPosts();
      
      return res.status(200).json(allPost);
    } else {
      return res
        .status(404)
        .json({ message: 'Looks like post does not exist!' });
    }
  } catch (error) {
    console.log(error)
    return res
    .status(400)
    .json({ message: 'Something went wrong in adding comment!', error });
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    // IDOR
    // Deleting the Comment without checking who is the creator
      const comment = await Comment.findById(req.params.id);
      
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      const post_id = comment.post;
  
      // Remove the comment using deleteOne or findByIdAndDelete
      await Comment.deleteOne({ _id: req.params.id });
  
      await Post.findByIdAndUpdate(
        post_id,
        { $pull: { comments: req.params.id } }
      );
  
      const allPost = await getAllPosts(); // Define the implementation of getAllPosts function
      return res.status(200).json(allPost);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Something went wrong' });
    }
};
