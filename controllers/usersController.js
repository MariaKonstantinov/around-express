// add User model
const User = require('../models/user');

const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

// get all users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res
        .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
    })
    .catch(next);
};

// get user by id
const getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.user_id })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send(ERROR_MESSAGE.NOT_FOUND);
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_DATA);
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
      }
    })
    .catch(next);
};

// create a new user
const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_DATA);
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
      }
    })
    .catch(next);
};

// update user profile
const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send(ERROR_MESSAGE.NOT_FOUND);
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_DATA);
      } else if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_DATA);
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
      }
    })
    .catch(next);
};

// update user avatar
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send(ERROR_MESSAGE.NOT_FOUND);
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_DATA);
      } else if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_DATA);
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
