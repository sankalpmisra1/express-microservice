const express = require('express');
const router = express.Router();
const controller = require('../controllers/post.controller');
const isAuthenticated = require('../middlewares/auth.middleware');

router.use(isAuthenticated);
router.post('/posts', controller.createPost);
router.get('/posts', controller.getPosts);
module.exports = router;