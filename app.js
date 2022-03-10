const express = require('express');

const { globalErrorHandler } = require('./controllers/error.controller');

const { AppError } = require('./util/appError');

const { postsRouter } = require('./routes/posts.routes');
const { usersRouter } = require('./routes/users.routes');
const { commentsRouter } = require('./routes/comment.routes');

const app = express();

app.use(express.json());

app.get(
  '/middleware-example',
  (req, res) => {
    console.log('midleware 1');
  },
  (req, res) => {
    console.log('midleware 2');
  },
  (req, res) => {
    console.log('midlaware 3');
  }
);

app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/comments', commentsRouter);

app.use('*', (req, res, next) => {
  next(new AppError(404, `${(req, originalUrl)} not found in this server,`));
});

app.use(globalErrorHandler);

module.exports = { app };
