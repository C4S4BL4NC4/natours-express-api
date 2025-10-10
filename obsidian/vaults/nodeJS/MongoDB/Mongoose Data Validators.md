[[Mongoose]]

`required:`, `maxLength: (str)`, `minLength: (str)` , `min: max: (val and dates)`, `enum`  These validators are the most used for the most part



#### Custom Validators

We can also build our own validators.

```JavaScript
...
priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
// this only points to currect doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price.',
      },
    },
...
```
