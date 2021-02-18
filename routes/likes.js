const express = require('express');
const Like = require('./../models/like');
const Post = require('./../models/post');
const router = express.Router();

const likesControllers = require('../controllers/likes_controllers');
const usersController = require('../controllers/user_controller');

router.get('/toggle/:postId', usersController.isAuth, likesControllers);

module.exports = router;
