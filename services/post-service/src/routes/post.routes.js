const express = require('express');
const router = express.Router();
const controller = require('../controllers/post.controller');
router.post('/posts', controller.createPost);
router.get('/posts', controller.getPosts);
module.exports = router;