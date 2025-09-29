const { create } = require('domain');
const express = require('express');

const morgan = require('morgan'); // Middleware lib
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use(morgan('dev')); // dev, combined, common, short, tiny
app.use(express.json());

app.use((req, res, next) => {
  if (!req) next();
  req.requestTime = new Date().toISOString();
  next();
});

module.exports = app;
