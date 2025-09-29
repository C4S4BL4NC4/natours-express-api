[[Express Framework]]

==DELETE== 

```JavaScript
app.delete('/api/v1/tours/:id', (req, res) => {
  if (+req.params.id > tours.length) {
    res.status(404).json({
      status: 'fail',
      messasge: 'Invalid ID!',
    });
  }

  res.status(204).json({ // 204 for deleted.
    status: 'success',
    data: null, // to show resource no longer exists.
  });
});
```

status code `500` internal server error.