const express = require('express');
const morgan = require('morgan'); // Middleware lib
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Global Middleware
app.use(express.json()); // Body Parser
app.use('/api/v1/tours', tourRouter); // Router
app.use('/api/v1/users', userRouter); // Router

// console.log(`PROCCESS.env: ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // dev, combined, common, short, tiny
}
app.use(express.static(`${__dirname}/public`));

// Error Handling: Unhabdled urls
// Make sure to add it at the end of the middlewares.
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404); // Passing anything into next would assume that it's an error and will skip all the other middlewares in the stack and go straight to the error handler
});

// Error Handling: Express's Global Error Handling
app.use(globalErrorHandler);

app.use((req, res, next) => {
  if (!req) next();
  req.requestTime = new Date().toISOString();
  next();
});

module.exports = app;
