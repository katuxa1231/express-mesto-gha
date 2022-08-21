const Card = require('../models/card');
const { handleError } = require('../utils/error');
const { ErrorName } = require('../constants/api');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(err, res, [ErrorName.VALIDATION_ERROR]));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res, [ErrorName.VALIDATION_ERROR]));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res, [ErrorName.VALIDATION_ERROR, ErrorName.CAST_ERROR]));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res, [ErrorName.VALIDATION_ERROR, ErrorName.CAST_ERROR]));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(() => res.send())
    .catch((err) => handleError(err, res, [ErrorName.VALIDATION_ERROR]));
};
