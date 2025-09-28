[[Express Framework]]

==PUT== and ==PATCH== are #ExpressJS methods that are used to update data of an object.

With `app.put()` we expect our application to **receive the entire** new update object. However, with `app.patch()` we expect **the only the properties** we want to update in an object.

So usually we use patch for the sake of it being easy to handle.

```JavaScript
app.patch('/api/v1/tours/:id', (req, res) => {

// Primitive failsafe
  if (+req.params.id > tours.length) {
    res.status(404).json({
      status: 'fail',
      messasge: 'Invalid ID!',
    });
  }
  
// Didn't implement logic
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour>',
    },
  });
});
```
