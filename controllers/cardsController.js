// add Card model
const Card = require('../models/card');

const { errorHandler } = require('../errors/customErrors');

// get all cards
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

// post a card
const createCard = (req, res, next) => {
  console.log(req.user._id);

  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// delete a card
const deleteCard = (req, res, next) => {
  const { cards_id } = req.params;

  Card.findByIdAndRemove(cards_id)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// like a card
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    cards_id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

// dislike a card
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    cards_id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
