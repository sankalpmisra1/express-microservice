const UserModel = require('../models/user.model');
const UserRequestDTO = require('../dto/UserRequestDTO');
const UserResponseDTO = require('../dto/UserResponseDTO');
const logger = require('../logger');

exports.createUser = async (req, res, next) => {
    try {
      const dto = new UserRequestDTO(req.body);
      dto.validate();
      const user = await UserModel.createUser(dto);
      logger.info('User created', { userId: user.id });
      res.status(201).json(new UserResponseDTO(user));
    } catch (err) {
      next(err);
    }
  };

  exports.getUsers = async (req, res, next) => {
    try {
      const users = await UserModel.getAllUsers();
      const dtos = users.map(u => new UserResponseDTO(u));
      res.json(dtos);
    } catch (err) {
      next(err);
    }
  };
  exports.getUserById = async (req, res, next) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
      }
      res.json(new UserResponseDTO(user));
    } catch (err) {
      next(err);
    }
  };