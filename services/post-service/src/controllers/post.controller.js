const PostModel = require('../models/post.model');
const PostRequestDTO = require('../dto/PostRequestDTO');
const PostResponseDTO = require('../dto/PostResponseDTO');
const axios = require('axios');
const logger = require('../logger');

exports.createPost = async (req, res, next) => {
  try {
    const dto = new PostRequestDTO(req.body);
    dto.validate();
    // Optional: fetch user info from user-service
    const base = process.env.USER_SERVICE_URL;
    const userResp = await axios.get(`${base}/api/users/${dto.userId}`);
    if (!userResp.data.id) throw Object.assign(new Error('User not found'), { status: 404 });

    const post = await PostModel.createPost(dto);
    logger.info('Post created', { postId: post.id });
    res.status(201).json(new PostResponseDTO(post));
  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.getAllPosts();
    const dtos = posts.map(p => new PostResponseDTO(p));
    res.json(dtos);
  } catch (err) {
    next(err);
  }
};