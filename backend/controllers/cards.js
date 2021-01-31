const Card = require('../models/card');
const WrongDataError = require('../errors/wrong-data-err');
const SystemError = require('../errors/system-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError('Переданы некорректные данные для создания карточки'));
      } else {
        next(new SystemError('Произошла ошибка'));
      }
    });
};

module.exports.sendCardsData = (req, res, next) => {
  Card.find({})
    .then((cardList) => res.send({ data: cardList }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndRemove({ _id: req.params.cardId, owner: req.user._id })
    .orFail(new NotFoundError('У вас нет карточки с таким id'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};
