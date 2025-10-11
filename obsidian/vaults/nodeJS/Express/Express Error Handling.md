[[Express Framework]]

#### Unhandled URLs

In `app.js` where our express app lies we can write this snippet to handle all the routes that are unaccounted for using `app.all()` meaning all CRUD operations `get, post, del, patch` passing it at the end of all middleware functions.

```JavaScript
// Error Handling: Unhabdled urls
// Make sure to add it at the end of the middlewares.
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
  next();
});
```


#### Error Handling Overview

![[errorHandling.png]]

#### Global Error Handling

Passing anything into `next(anything)` would assume that it's an error and will skip all the other middleware functions in the stack and go straight to the error handler.

And to make a global error handler done by giving a callback 4 arguments then express would recognize it automatically as an error handler middleware.

```JavaScript
// in app.js
// Unhandled Routes Example
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err); // Passing err to next()
});

// Global Error Handler Funciton
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
});
```