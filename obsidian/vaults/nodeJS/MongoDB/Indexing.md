[[MongoDB]]

Indexing is done for the main purpose of speeding up the process of reading the most used queries/most visited locations of an application. However, indexing is not recommend for high *write rate* query.

```JavaScript
// in tourModel.js
tourSchema.index({ price: 1 }); // Unique Index
tourSchema.index({ price: 1, ratingsAverage: -1 }); // Compound Index
```

*NOTE: Setting a property to `unique` will automatically create an index for it.*
