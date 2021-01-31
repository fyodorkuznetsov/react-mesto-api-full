const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const DuplicateDataError = require('../errors/duplicate-data-err');
const WrongDataError = require('../errors/wrong-data-err');
const SystemError = require('../errors/system-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');

require('dotenv').config();

const { JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    password,
    email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .select('-password')
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'MongoError' && !!err.keyValue.email) {
        next(new DuplicateDataError('Пользователь с таким e-mail уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new WrongDataError('Переданы некорректные данные для создания пользователя'));
      } else {
        next(new SystemError('Произошла ошибка'));
      }
    });
};

module.exports.getUserList = (req, res, next) => {
  User.find({})
    .then((userList) => res.send({ data: userList }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user !== null) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Нет пользователя с таким id');
      }
    })
    .catch(next);
};

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user !== null) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Ваш профиль не найден');
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user !== null) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Ваш пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError('Переданы некорректные данные для создания пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user !== null) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Ваш пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError('Переданы некорректные данные для создания пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: 3600000,
        httpOnly: true,
      })
        .send({});
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};
