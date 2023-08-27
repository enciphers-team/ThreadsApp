const Post = require("../models/post");
const { getAllPosts } = require("./utils");
const Comment = require("../models/comment");
const BookMark = require("../models/BookMark");
const getPageMetadata = require("../util/helper_functions");

module.exports.sharePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (post.isShared) {
      return res.status(400).json({ message: "post already shared type" });
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
      message: "Internal Server Error! Try again ",
    });
  }
};

module.exports.createPost = async (req, res) => {
  req.body.tags = JSON.parse(req.body.tags);
  if (req.body.content.length <= 0) {
    // req.flash('error', 'You need to add text to create post');
    return res
      .status(400)
      .json({ message: "You need to add text to create post" });
  }

  // return;
  if (req.body.content && req.body.content.length > 200) {
    return res
      .status(400)
      .json({ message: "Post should be smaller than 200 character" });
  }

  // return;
  //if url exist
  if (req.body.post_url) {
    const post_url = req.body.post_url;
    try {
      const data = await getPageMetadata(post_url);
      const { error, result } = data;

      if (error || !result) {
        return res.status(400).json({ message: "Invalid url" });
      } else {
        let postData = {
          description: req.body.content,
          user: req.user._id,
          urlTitle: result.og.title || result.meta.title,
          urlImage: result.og.image
            ? result.og.image
            : result.images[0]
            ? result.images[0]["src"]
            : post_url,
          url: result.og.url ? result.og.url : post_url,
          tags: req.body.tags ? req.body.tags : [],
          isShared: false,
        };

        if (req.file) {
          postData.postImage = req.file.location;
        }

        await Post.create(postData);

        let posts = await getAllPosts();

        return res.status(201).json(posts);
      }
    } catch (err) {
      console.error("Caught error:", err);
      return res
        .status(400)
        .json({ message: "Error in creating post! Try again" });
    }
  } else {
    if (req.file) {
      try {
        await Post.create({
          description: req.body.content,
          user: req.user._id,
          postImage: req.file.location,
          tags: req.body.tags ? req.body.tags : [],
          isShared: false,
        });

        let result = await getAllPosts();
        return res.status(201).json(result);
      } catch {
        return res
          .status(400)
          .json({ message: "Error in creating post ! Try again" });
      }
    } else {
      try {
        await Post.create({
          description: req.body.content,
          user: req.user._id,
          tags: req.body.tags ? req.body.tags : [],
          isShared: false,
        });

        let result = await getAllPosts();
        return res.status(201).json(result);
      } catch {
        return res
          .status(400)
          .json({ message: "Error in creating post ! Try again" });
      }
    }
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const deleteBookMark = await BookMark.deleteMany({ post: req.params.id });

    const post = Post.findById(req.params.id);
    // IDOR
    // Deleting the post without checking who is the creator
    if (!post) {
      return res
        .status(400)
        .json({ message: "Error in creating post ! Try again" });
    } else {
      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });

      const posts = await getAllPosts();
      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error in creating post ! Try again" });
  }
};
