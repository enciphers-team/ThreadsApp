const express = require('express');
const router = express.Router();

const searchControllers = require('../controllers/search_controllers');

router.post('/', searchControllers.search);

module.exports = router;
