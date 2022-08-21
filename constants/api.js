const StatusCode = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const errorMessage = {
  [StatusCode.NOT_FOUND]: 'Данные по указанному _id не найдены',
  [StatusCode.BAD_REQUEST]: 'Переданы некорректные данные',
  [StatusCode.INTERNAL_SERVER_ERROR]: (err) => `На сервере произошла ошибка: ${err}`,
};

const ErrorName = {
  CAST_ERROR: 'CastError',
  VALIDATION_ERROR: 'ValidationError',
};

module.exports = { StatusCode, ErrorName, errorMessage };
