const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();
const {
  getUserList, getUser, updateProfile, updateAvatar, getProfile,
} = require('../controllers/users.js');

userRouter.get('/users', getUserList);
userRouter.get('/users/me', getProfile);
userRouter.get('/users/:id', getUser);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*#?$/),
  }),
}), updateAvatar);

module.exports = userRouter;
