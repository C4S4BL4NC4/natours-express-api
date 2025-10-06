[[Express Framework]]

an example of a query is done `127.0.0.1:3000/api/v1/tours?duration=5&difficulty=easy` our query is `duration of 5` and `difficulty of easy` express has this data stored as an `object` in the `req.query` method.
```JavaScript
req.query
```

#### The Two Ways of Implementing queries:

1. MongoDB Methods:
```JavaScript
const tours = await Tour.find({
duration: 5,
difficulty: 'easy'
});

// A basic filter would be like

const tours = await Tour.find(req.query);
```

2. Mongoose Methods:
```JavaScript
const tours = await Tour.find().where('duration').equals(5).where('difficutly').equals('easy');
```


# Advanced Filtering:

Now, we want to implement the greater than, less than, less or equal, etc.. and to do that we must write the query in a standardized way `127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy&sort=1&limit=10`
`$gte` (Greater Than Or Equal) A #MongoDB operator that means `>=5`. The expected query object from `req.query` is supposed to look like `{difficulty: 'easy', duration: {$gte: 5} }`. However, the object we receive is `{difficulty: 'easy', duration: {gte: 5} }` to fix it:

```JavaScript
// 1) Stringify the Object
const queryStr = JSON.stringify(queryObj);

// 2) Replace
queryStr.replace(/\b(gte|gt|lte|lt)\b/)

```

