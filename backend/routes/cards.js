const { celebrate, Joi } = require('celebrate');
const cardRouter = require('express').Router();

const {
  createCard, sendCardsData, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards.js');

cardRouter.post('/cards', celebrate({
  query: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
}), createCard);

cardRouter.get('/cards', sendCardsData);

cardRouter.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), deleteCard);

cardRouter.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), likeCard);

cardRouter.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = cardRouter;
