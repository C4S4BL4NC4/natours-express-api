const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require('morgan'); // Middleware lib
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

// View Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Limiting reqs from same ip
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Try again in an hour!',
});

// Global Middleware
app.use(helmet());

// Set Security HTTP
app.use('/api', limiter);

// Body Parser reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Cookie parser, needed to read JWT from cookies
app.use(cookieParser());

// Data sanitization against NOSQL query injection and XSS Attacks
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter polution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingQuantity',
      'maxGroupSize',
      'price',
    ],
  }),
);

// API Routes
app.use('/api/v1/tours', tourRouter); // Tour Router
app.use('/api/v1/users', userRouter); // User Router
app.use('/api/v1/reviews', reviewRouter); // Review Router
app.use('/', viewRouter);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // dev, combined, common, short, tiny
}

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
