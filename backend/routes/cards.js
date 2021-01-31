const { celebrate, Joi } = require('celebrate');
const cardRouter = require('express').Router();

const {
  createCard, sendCardsData, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards.js');

cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().pattern(/^https?:\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*#?$/),
    name: Joi.string().required().min(2).max(30),
  }),
}), createCard);

cardRouter.get('/cards', sendCardsData);

cardRouter.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCard);

cardRouter.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), likeCard);

cardRouter.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), dislikeCard);

module.exports = cardRouter;
