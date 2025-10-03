[[Mongoose]]
### Creating a schema and a model:

A model is like a blueprint to create documents and to do CRUD operations. To make a model we need a schema a schema is meant to handle data.


```JavaScript
// in Server.js
const tourSchema = new mongoose.Schema({
  name: {
    tpye: String,
    required: [true, 'A tour must have a name'], // Error string
    unique: true,
  }, // Schema options
  rating: { type: Number, default: 4.5 },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});
// To make a model
const Tour = mongoose.model('Tour', tourSchema);
```

### Using a model:
- Trying to save the same data with the same values is prohibited and will return an error for `dup key`.

```JavaScript
// Creating a document then calling save on the documnet
const newTour = new Tour({})
  newTour.save().then(doc => {}); // Returns a promise
```
Or to create a tour directly use:
```JavaScript
// from tourModel.js called into tourController.js
await Tour.create({}); // Returns a promise
```

```JavaScript
// Using a model
const testTour = new Tour({
  name: 'The Bike Hiker',
  rating: 4.9,
  price: 999,
});
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(`ERROR (╯°□°）╯︵`);
  });
```

```JavaScript
// CODE HERE
```