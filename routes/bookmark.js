const express = require('express');

const router = express.Router();
const userControllers = require('../controllers/user_controller');

const bookmarkControllers = require('../controllers/bookmark_controllers');

router.get(
  '/add/:postId',
  userControllers.isAuth,
  bookmarkControllers.addBookMarks
);
router.get(
  '/delete/:id',
  userControllers.isAuth,
  bookmarkControllers.deleteBookMark
);
router.get('/', userControllers.isAuth, bookmarkControllers.getBookMarks);

module.exports = router;
