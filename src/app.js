const express = require('express');
const morgan = require('morgan'); // Middleware lib

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// console.log(`PROCCESS.env: ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // dev, combined, common, short, tiny
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  if (!req) next();
  req.requestTime = new Date().toISOString();
  next();
});

module.exports = app;
