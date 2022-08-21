const { ErrorName, StatusCode, errorMessage } = require('../constants/api');
const NotFound = require('../errors/not-found');

module.exports.handleError = (err, res) => {
  if (err instanceof NotFound) {
    res.status(StatusCode.NOT_FOUND).send(err);
    return;
  }
  if (err.name === ErrorName.CAST_ERROR || err.name === ErrorName.VALIDATION_ERROR) {
    res.status(StatusCode.BAD_REQUEST).send({ message: errorMessage[StatusCode.BAD_REQUEST] });
    return;
  }
  res.status(StatusCode.INTERNAL_SERVER_ERROR)
    .send({ message: errorMessage[StatusCode.INTERNAL_SERVER_ERROR](err.message) });
};
