[[Mongoose]]


#### Document Middleware

Just like #express mongoose also has middleware function that are defined inside the schema file

```JavaScript
// in tourModel.js
// Document Middleware: runs before .save() and .create() only.
// Its called Pre Save Hook or Pre Save Middleware
tourSchema.pre('save', function(next){
// Body
next();
})

// runs after all the prior middleware are ran through.
// .post does not have access to next()
tourSchema.post('save', function (doc) {
// Body

});

```

#### Query Middleware

e.g. Creating a VIP tour in the schema file.

```JavaScript
// in tourModel.js
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`=> qRT: ${Date.now() - this.start}ms`);
  next();
});
```


#### Aggregation Middleware

e.g. hide that VIP tour from the statistical calculations

```JavaScript
// in tourModel.js
// Aggregation Middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  next();
});
```