const User = require('../models/user');
const Card = require('../models/user');
const { ErrorName } = require('../constants/api');
const { handleError } = require('../utils/error');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(err, res, [ErrorName.VALIDATION_ERROR]));
};

module.exports.getUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res, [ErrorName.CAST_ERROR]));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res, [ErrorName.VALIDATION_ERROR]));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  Card.findByIdAndUpdate(req.user._id, { $addToSet: { name, about } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res, [ErrorName.VALIDATION_ERROR, ErrorName.CAST_ERROR]));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  Card.findByIdAndUpdate(req.user._id, { $addToSet: { avatar } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res, [ErrorName.VALIDATION_ERROR, ErrorName.CAST_ERROR]));
};
