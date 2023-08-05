// add User model
const User = require('../models/user');

const { ERROR_MESSAGE } = require('../utils/constants');

const {
  createNotFoundError,
  createBadReqError,
  errorHandler,
} = require('../errors/customErrors');

// get all users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => {
      console.log('Error happened in getUsers', error);
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

// get user by id
const getUserById = (req, res, next) => {
  User.findOne(req.params._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => createNotFoundError(error, ERROR_MESSAGE.USER_NOT_FOUND))
    .catch(next);
};

// create a new user
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      console.log('Error happened in createUser', error);
      res.status(500).send({ message: 'An error has occurred on the server' });
      createBadReqError(error, ERROR_MESSAGE.INCORRECT_DATA).catch(next);
    });
};

// update user profile
const updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) =>
      errorHandler(
        error,
        ERROR_MESSAGE.INCORRECT_DATA,
        ERROR_MESSAGE.USER_NOT_FOUND
      )
    )
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
      upsert: true,
    }
  )
    .orFail()
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch((error) =>
      errorHandler(
        error,
        ERROR_MESSAGE.INCORRECT_DATA,
        ERROR_MESSAGE.USER_NOT_FOUND
      )
    )
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
