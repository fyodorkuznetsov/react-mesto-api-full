const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');
const NotFoundError = require('./errors/not-found-err');
const { auth } = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  login, createUser,
} = require('./controllers/users.js');

const corsOptions = {
  origin: ['https://smith.students.nomoredomains.monster', 'http://smith.students.nomoredomains.monster'],
  credentials: true,
};

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

/*  Тут возможно, не стоило проверять пароль на валидность по длине, но пусть будет */
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}!!1!1`);
});
