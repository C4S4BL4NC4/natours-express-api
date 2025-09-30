[[Express Framework]]

Everything in #ExpressJS is a middleware; and its basically defined with the notation:

```JavaScript
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // Adding time property to the request.
  next();
});
```

There is something called the `middleware stack` and the execution ends with the `res.end()`
also, the order of the middleware definition functions affects the execution order. So, those at the top get executed first.

### Param Middleware: 

A middleware with a certain parameter we specify e.g. `id`:
```JavaScript
router.param('id', (req, res, next, val) => {});
```
- `router.param`  will only be called to the relative file it was called into. e.g. `tourController.js`  
- `val` is the value of the parameter in question `id`.
- `ERROR: Can't send headers after request` This error is likely related to the absence of a `return` statement Prior to the the `response` statement.

-Example:
  ```JavaScript
  // This function is passed as a callback to the param middleware above.
  exports.checkID = (req, res, next, val) => {
  if (val > tours.length) {
    return res.status(404).json({ // RETURN MUST BE HERE
      status: 'fail',
      message: 'Invalid ID.',
    });
  }
  next();
};
  ```


### Chaining Middleware functions: 

Middleware chaining is done like this.
```JavaScript
// Passing multiple arguments to the route method
.post(tourController.checkBody, tourController.createTour);
```

