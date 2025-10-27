[[Data Modeling]]


#### Natours Data Model

![[NatoursDataModel.png]]

#### Embedding in MongoDB

To Embed first in our example we want to embed the `guides` of a tour into the `tours` 

```JavaScript
// We first must add the guides as type of array in the schema
// in TourModel.js
guides: Array
```

```JavaScript
// Then we make a pre save middleware that looks like this
// in TourModel.js and importing UserModel.js
// Embedding
tourSchema.pre('save', async function (next) {
const guidesProm = this.guides.map(async (id) => await User.findById(id));
this.guides = Promise.all(guidesProm);
next();
});
```

#### Child Referencing in MongoDB

Meaning in this case that `tours` and `users` will always be their separate documents and we will only keep the `id`s of the  of the tour guides in a `tour` document. And when we query the tour we get access to the tour guides without them being actually saved on the tour document.

```JavaScript
// in TourModel.js
// Refrencing
guides: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
```

Now the data is actually reference and all ready for the data to be embedded into a single object. In order to do that we must use `.populate()` method e.g.  

```JavaScript
// in TourController.js in getTourById funciton
const tour = await Tour.findById(req.params.id).populate({
path: 'guides',
select: '-__v -passwordChangedAt',
});
```

**NOTE:  Behind the scenes `.populate()` is actually making an extra query so it might affect the performance.**