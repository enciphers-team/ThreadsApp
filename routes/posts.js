const express = require('express');
const router = express.Router();

const uploadS3 = require('../config/multer_s3');

const postControllers = require('../controllers/post_controllers');
const userControllers = require('../controllers/user_controller');

router.get('/share/:postId', userControllers.isAuth, postControllers.sharePost);
router.post(
  '/create',
  userControllers.isAuth,
  uploadS3,
  postControllers.createPost
);
router.get('/delete/:id', postControllers.deletePost);
module.exports = router;
