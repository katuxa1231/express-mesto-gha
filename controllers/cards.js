const Card = require('../models/card');
const { handleError } = require('../utils/error');
const NotFound = require('../errors/not-found');
const { errorMessage, StatusCode } = require('../constants/api');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFound(errorMessage[StatusCode.NOT_FOUND]);
      }
      res.send({ data: card });
    })
    .catch((err) => handleError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFound(errorMessage[StatusCode.NOT_FOUND]);
      }
      res.send({ data: card });
    })
    .catch((err) => handleError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound(errorMessage[StatusCode.NOT_FOUND]);
      }
      res.send(card);
    })
    .catch((err) => handleError(err, res));
};
