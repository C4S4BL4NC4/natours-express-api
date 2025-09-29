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
`router.param`  will only be called to the relative file it was called into. e.g. `tourController.js`.

