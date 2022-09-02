const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../constants/keys');
const { StatusCode, errorMessage } = require('../constants/api');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  try {
    payload = jwt.verify(token, PRIVATE_KEY);
  } catch (err) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .send({ message: errorMessage[StatusCode.UNAUTHORIZED] });
  }

  req.user = payload;

  next();
};
