const BookMark = require('../models/BookMark');
const Post = require('../models/post');

// Helper function to populate additional fields of 'post'
async function populatePostFields(post) {
  if (!post) {
    return null;
  }

  const populatedPost = await Post.populate(post, [
    { path: 'user' },
    { path: 'comments.user' },
    { path: 'likes' },
    { path: 'tags' },
    { path: 'sharedUser' },
  ]);

  return populatedPost;
}

async function populateBookmarkedPosts(bookmarks) {
  const populatedBookmarks = [];

  for (const bookmark of bookmarks) {
    const populatedBookmark = await BookMark.populate(bookmark, {
      path: 'post',
      populate: {
        path: 'user comments.user likes tags sharedUser',
      }
    });

    populatedBookmarks.push(populatedBookmark);
  }

  return populatedBookmarks;
}

const getAllBookMarks = async (id) => {
  const data = await BookMark.find({ user: id }).sort('-createdAt');

  const bookmarkIds = data.map(item => item._id);
  const populatedBookmarks = await populateBookmarkedPosts(data);

  const posts = populatedBookmarks.map((bookmark, index) => {
    const post = bookmark.post;
    const populatedPost = {
      ...post.toObject(), // Convert to plain object
      bookMarkId: bookmarkIds[index]
    };
    return populatedPost;
  });
  return posts;
};

module.exports.getBookMarks = async (req, res) => {
  try {
    const id = req.user.id;
    let bookmarks = await BookMark.find({ user: id })
      .sort('-createdAt')
      .populate('post')
      .lean();

  for (const bookmark of bookmarks) {
    const populatedPost = await populatePostFields(bookmark.post);
    bookmark.post = populatedPost;
    bookmark.post.bookMarkId = bookmark._id;
  }

  bookmarks = bookmarks.map((b) => ({...b, ...b.post}))

  res.status(200).json(bookmarks);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Internal Server Error! Try again' });
  }
};

module.exports.addBookMarks = async (req, res) => {
  try {
    const id = req.user.id;
    const postId = req.params.postId;

    let bookMark = await BookMark.findOne({ post: postId, user: id });

    if (bookMark) {
      return res.status(400).json({ message: 'Post already bookmarked' });
    }

    const data = {
      post: req.params.postId,
      user: id,
    };

    const saveBookMark = await BookMark.create(data);
    const allBookmarks = await getAllBookMarks(req.user.id);

    res.status(201).json({
      message: 'Post Bookmarked successfully',
      bookmarks: allBookmarks,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Internal Server Error! Try again ' });
  }
};

module.exports.deleteBookMark = async (req, res) => {
  try {
    const id = req.params.id;

    const bookMarkDeleteResult = await BookMark.deleteOne({
      _id: id,
    });


    const allBookmarks = await getAllBookMarks(req.user.id);

    // return;
    return res.status(200).json({
      bookmarks: allBookmarks,
      message: 'bookmark removed succesfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Internal Server Error! Try again ',
    });
  }
};
