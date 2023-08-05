// add Card model
const Card = require('../models/card');

const { ERROR_MESSAGE } = require('../utils/constants');

const {
  createBadReqError,
  createNotFoundError,
} = require('../errors/customErrors');

// get all cards
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

// post a card
const createCard = (req, res, next) => {
  console.log(req.user._id);

  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((error) => createBadReqError(error, ERROR_MESSAGE.INCORRECT_DATA))
    .catch(next);
};

// delete a card
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((error) => createNotFoundError(error, ERROR_MESSAGE.NOT_FOUND))
    .catch(next);
};

// like a card
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((error) => createNotFoundError(error, ERROR_MESSAGE.NOT_FOUND))
    .catch(next);
};

// dislike a card
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((error) => createNotFoundError(error, ERROR_MESSAGE.NOT_FOUND))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
