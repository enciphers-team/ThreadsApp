const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
// Show public feed
router.get('/home', homeController.home);
router.get('/management', (req, res) => {
  res.render('managementLogin', { layout: 'management' });
});
router.get('/managementUser', (req, res) => {
  res.render('managementUser', { layout: 'management' });
});
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comment', require('./comments'));
router.use('/search', require('./search'));
router.use('/like', require('./likes'));
router.use('/bookmark', require('./bookmark'));

module.exports = router;
