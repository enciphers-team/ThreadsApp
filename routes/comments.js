const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const commentControllers = require('../controllers/comment_controllers');
const userController = require('../controllers/user_controller');

router.post('/create', userController.isAuth, commentControllers.createComment);
router.get('/delete/:id', commentControllers.deleteComment);
module.exports = router;
