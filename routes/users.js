const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers, getUser, updateUserInfo, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');
const { validationModel, validationParam } = require('../constants/validation');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', celebrate({
  params: {
    userId: validationParam.id,
  },
}), getUser);
router.patch('/users/me', celebrate({
  body: {
    name: validationModel.user.name,
    about: validationModel.user.about,
  },
}), updateUserInfo);
router.patch('/users/me/avatar', celebrate({
  body: {
    avatar: validationModel.user.avatar,
  },
}), updateUserAvatar);

module.exports = router;
