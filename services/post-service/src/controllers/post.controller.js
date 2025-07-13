const PostModel = require("../models/post.model");
const PostRequestDTO = require("../dto/PostRequestDTO");
const PostResponseDTO = require("../dto/PostResponseDTO");
const axios = require("axios");
const logger = require("../logger");

exports.createPost = async (req, res, next) => {
  try {
    const dto = new PostRequestDTO(req.body);
    dto.validate();
    // Optional: fetch user info from user-service
    const base = process.env.USER_SERVICE_URL;
    const cookie = req.headers.cookie;
    const userResp = await axios.get(`${base}/api/users/${dto.userId}`, {
      headers: { Cookie: cookie },
    });
    if (!userResp.data.id)
      throw Object.assign(new Error("User not found"), { status: 404 });

    const post = await PostModel.createPost(dto);
    logger.info("Post created", { postId: post.id });
    res.status(201).json(new PostResponseDTO(post));
  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const posts = await PostModel.getAllPosts(limit, offset);
    const totalCount = await PostModel.countPosts();
    const dtos = posts.map((p) => new PostResponseDTO(p));
    res.json({
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      data: dtos,
    });
  } catch (err) {
    next(err);
  }
};
