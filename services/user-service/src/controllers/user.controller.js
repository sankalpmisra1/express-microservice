const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const UserRequestDTO = require("../dto/UserRequestDTO");
const UserResponseDTO = require("../dto/UserResponseDTO");
const LoginRequestDTO = require("../dto/LoginRequestDTO");
const LoginResponseDTO = require("../dto/LoginResponseDTO");

const logger = require("../logger");

exports.createUser = async (req, res, next) => {
  try {
    const dto = new UserRequestDTO(req.body);
    dto.validate();
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await UserModel.createUser({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });
    logger.info("User created", { userId: user.id });
    res.status(201).json(new UserResponseDTO(user));
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const dto = new LoginRequestDTO(req.body);
    dto.validate();

    const user = await UserModel.getUserByEmail(dto.email);
    if (!user) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      throw err;
    }

    req.session.userId = user.id;

    const response = new LoginResponseDTO(user);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const users = await UserModel.getAllUsers(limit, offset);
    const totalCount = await UserModel.countUsers();
    const dtos = users.map((u) => new UserResponseDTO(u));
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
exports.getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    res.json(new UserResponseDTO(user));
  } catch (err) {
    next(err);
  }
};
