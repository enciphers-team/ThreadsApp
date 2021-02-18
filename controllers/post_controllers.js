const Post = require('../models/post');
const { getAllPosts } = require('./utils');
const Comment = require('../models/comment');
const ogs = require('open-graph-scraper');
const BookMark = require('../models/BookMark');

module.exports.sharePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (post.isShared) {
      return res.status(400).json({ message: 'post already shared type' });
    }
    if (req.user._id.equals(post.user)) {
      return res.status(400).json({ message: "You can't share your own post" });
    }

    let newPost = {
      comments: [],
      likes: [],
      tags: post.tags,
      description: post.description,
      user: post.user,
      postImage: post.postImage,
      urlTitle: post.urlTitle,
      url: post.url,
      urlImage: post.urlImage,
      isShared: true,
      sharedUser: req.user._id,
    };

    const postCreate = await Post.create(newPost);

    const allPost = await getAllPosts();

    res.status(200).json(allPost);
  } catch (error) {
    return res.status(400).json({
      message: 'Internal Server Error! Try again ',
    });
  }
};

module.exports.createPost = async (req, res) => {
  req.body.tags = JSON.parse(req.body.tags);
  if (req.body.content.length <= 0) {
    // req.flash('error', 'You need to add text to create post');
    return res
      .status(400)
      .json({ message: 'You need to add text to create post' });
  }

  // return;
  if (req.body.content && req.body.content.length > 200) {
    return res
      .status(400)
      .json({ message: 'Post should be smaller than 200 character' });
  }

  // return;
  //if url exist
  if (req.body.post_url) {
    const options = { url: req.body.post_url };
    ogs(options, (error, result, response) => {
      // if url is wrong
      if (error) {
        console.log(error);
        return res.status(400).json({ message: 'Invalid url' });
      } else {
        if (req.file) {
          Post.create(
            {
              description: req.body.content,
              user: req.user._id,
              postImage: req.file.location,
              urlTitle: result.ogTitle,
              url: result.ogUrl ? result.ogUrl : result.requestUrl,
              urlImage: result.ogImage ? result.ogImage.url : null,
              tags: req.body.tags ? req.body.tags : [],
              isShared: false,
            },
            async (err, post) => {
              if (err) {
                return res
                  .status(400)
                  .json({ message: 'Error in creating post ! Try again' });
              } else {
                let result = await getAllPosts();
                return res.json(result);
              }
            }
          );
        } else {
          Post.create(
            {
              description: req.body.content,
              user: req.user._id,
              urlTitle: result.ogTitle,
              urlImage: result.ogImage ? result.ogImage.url : null,
              url: result.ogUrl ? result.ogUrl : result.requestUrl,
              tags: req.body.tags ? req.body.tags : [],
              isShared: false,
            },
            async (err, post) => {
              if (err) {
                console.log(err);

                return res
                  .status(400)
                  .json({ message: 'Error in creating post ! Try again' });
              } else {
                let result = await getAllPosts();
                res.json(result);
              }
            }
          );
        }
      }
    });
  } else {
    if (req.file) {
      Post.create(
        {
          description: req.body.content,
          user: req.user._id,
          postImage: req.file.location,
          tags: req.body.tags ? req.body.tags : [],
          isShared: false,
        },
        async (err, post) => {
          if (err) {
            console.log(err);

            return res
              .status(400)
              .json({ message: 'Error in creating post ! Try again' });
          } else {
            let result = await getAllPosts();
            return res.json(result);
          }
        }
      );
    } else {
      Post.create(
        {
          description: req.body.content,
          user: req.user._id,
          tags: req.body.tags ? req.body.tags : [],
          isShared: false,
        },
        async (err, post) => {
          if (err) {
            console.log(err);

            return res
              .status(400)
              .json({ message: 'Error in creating post ! Try again' });
          } else {
            let result = await getAllPosts();
            return res.json(result);
          }
        }
      );
    }
  }
};

module.exports.deletePost = async (req, res) => {
  const deleteBookMark = await BookMark.deleteMany({ post: req.params.id });

  Post.findById(req.params.id, async (err, post) => {
    // IDOR
    // Deleting the post without checking who is the creator
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: 'Error in creating post ! Try again' });
    } else {
      await post.remove();
      Comment.deleteMany({ post: req.params.id }, async (err) => {
        let posts = await getAllPosts();
        return res.status(200).json(posts);
      });
    }
  });
};
