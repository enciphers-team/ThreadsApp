const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { getAllPosts } = require('./utils');

module.exports.createComment = (req, res) => {
  Post.findById(req.body.post_value, (err, post) => {
    if (post) {
      if (req.body.description && req.body.description.length > 200) {
        return res
          .status(400)
          .json({ message: 'Comment should be smaller than 200 character' });
      }

      if (!req.body.description || req.body.description.length == 0) {
        return res.status(400).json({ message: "Comment shouldn't be empty" });
      }

      Comment.create(
        {
          description: req.body.description,
          post: req.body.post_value,
          user: req.user._id,
        },
        async (err, comment) => {
          if (err) {
            console.log(err);
            return res
              .status(400)
              .json({ message: 'Something went wrong in adding comment!' });
          } else {
            await post.comments.push(comment);
            await post.save();
            const allPost = await getAllPosts();
            return res.json(allPost);
          }
        }
      );
    }
  });
};

module.exports.deleteComment = (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    // IDOR
    // Deleting the Comment without checking who is the creator
    if (err) {
      console.log(err);
      return res.status(400).json({ message: 'something went wrong' });
    } else {
      post_id = comment.post;
      comment.remove();
      Post.findByIdAndUpdate(
        post_id,
        { $pull: { comments: req.params.id } },
        async (err, post) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ message: 'something went wrong' });
          }
          const allPost = await getAllPosts();
          return res.json(allPost);
        }
      );
    }
  });
};
