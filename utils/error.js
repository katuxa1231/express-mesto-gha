const mongoose = require('mongoose');
const { StatusCode, errorMessage } = require('../constants/api');
const NotFound = require('../errors/not-found');

module.exports.handleError = (err, res) => {
  if (err instanceof NotFound) {
    res.status(StatusCode.NOT_FOUND).send(err);
    return;
  }
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    res.status(StatusCode.BAD_REQUEST).send({ message: errorMessage[StatusCode.BAD_REQUEST] });
    return;
  }
  res.status(StatusCode.INTERNAL_SERVER_ERROR)
    .send({ message: errorMessage[StatusCode.INTERNAL_SERVER_ERROR](err.message) });
};
