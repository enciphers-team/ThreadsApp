const BookMark = require('../models/BookMark');

const getAllBookMarks = async (id) => {
  const data = await BookMark.find({ user: id }).sort('-createdAt');

  const bookmark = await BookMark.deepPopulate(
    data,
    'post post.user post.comments.user post.likes post.tags post.sharedUser'
  );

  let posts = [];
  for (i of bookmark) {
    let post = i.post.toObject();
    post.bookMarkId = i._id;
    posts.push(post);
  }
  return posts;
};

module.exports.getBookMarks = async (req, res) => {
  try {
    const id = req.user.id;
    const data = await BookMark.find({ user: id }).sort('-createdAt');

    BookMark.deepPopulate(
      data,
      'post post.user post.comments.user post.likes post.tags post.sharedUser',
      function (err, bookmark) {
        let posts = [];
        for (i of bookmark) {
          let post = i.post.toObject();
          post.bookMarkId = i._id;
          posts.push(post);
        }
        res.status(200).json(posts);
      }
    );
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

    res.json({
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
    return res.json({
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
