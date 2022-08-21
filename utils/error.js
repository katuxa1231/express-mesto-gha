const { ErrorName, StatusCode, errorMessage } = require('../constants/api');

module.exports.handleError = (err, res, errorNames) => {
  if (errorNames.includes(ErrorName.CAST_ERROR) && err.name === ErrorName.CAST_ERROR) {
    res.status(StatusCode.NOT_FOUND).send({ message: errorMessage[StatusCode.NOT_FOUND] });
    return;
  }
  if (errorNames.includes(ErrorName.VALIDATION_ERROR) && err.name === ErrorName.VALIDATION_ERROR) {
    res.status(StatusCode.BAD_REQUEST).send({ message: errorMessage[StatusCode.BAD_REQUEST] });
    return;
  }
  res.status(StatusCode.INTERNAL_SERVER_ERROR)
    .send({ message: errorMessage[StatusCode.INTERNAL_SERVER_ERROR] });
};
