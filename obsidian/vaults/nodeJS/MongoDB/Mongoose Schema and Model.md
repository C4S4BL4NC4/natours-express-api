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
  summary: {
    type: String,
    trim: true, // Remove whitespace at the beginning and end of a String
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

### Mongoose Methods:
refer to this https://mongoosejs.com/docs/queries.html
##### `model.find()`:
In #MongoDB use `model.find()` to find an element of certain traits in a database. Calling `.find()` alone without passing anything into it will return the entire database content as a promise that's must be awaited.
```JavaScript
await Tour.find()
```

#### `model.findById()`:

used to find data that match an `id`. 
```JavaScript
await Tour.findById(req.params.id);
// Tour.findOne({_id: req.params.id}) // Exactly the same
```

#### `model.findByIdAndUpdate`:

```JavaScript
// We also can pass options
const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Returns the new document
      runValidators: true, // Reruns the validators
    });
```