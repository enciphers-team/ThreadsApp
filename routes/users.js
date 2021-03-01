const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user_controller');
const upload = require('../config/muter_upload');
const user = require('../models/user');

router.get('/profile/:id', usersController.profile);

router.post(
  '/update',
  // usersController.isAuth,
  upload,
  usersController.update
);

// router.get('/sign-up', usersController.signUp);
router.post('/login', usersController.signIn);
router.post('/register', usersController.create);
// router.post(
//   '/create-session',
//   passport.authenticate('local', { failureRedirect: '/users/login' }),
//   usersController.createSession
// );
// router.get('/sign-out', usersController.destroySession);
router.get('/get-users', usersController.isAuth, usersController.getUsers);
router.get('/delete', usersController.isAuth, usersController.deleteAccount);
router.get('/', usersController.getUsers2);

router.get('/follow/:id', usersController.isAuth, usersController.followUser);
router.get(
  '/unfollow/:id',
  usersController.isAuth,
  usersController.unFollowUser
);

router.get('/followers/:userId', usersController.getFollowers);
router.get('/following/:userId', usersController.getFollowing);

router.get('/single', usersController.isAuth, usersController.getSingleUser);

router.get('/get-posts', usersController.isAuth, usersController.getAllPosts);

router.post(
  '/management/delete-user',
  usersController.isAuth,
  usersController.deleteUserManagement
);

module.exports = router;
