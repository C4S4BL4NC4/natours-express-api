[[Express Framework]]

an example of a query is done `127.0.0.1:3000/api/v1/tours?duration=5&difficulty=easy` our query is `duration of 5` and `difficulty of easy` express has this data stored as an `object` in the `req.query` method.
```JavaScript
req.query
```

#### The Two Ways of Implementing queries

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


## Advanced Filtering

Now, we want to implement the greater than, less than, less or equal, etc.. and to do that we must write the query in a standardized way `127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy&sort=1&limit=10`
`$gte` (Greater Than Or Equal) A #MongoDB operator that means `>=5`. The expected query object from `req.query` is supposed to look like `{difficulty: 'easy', duration: {$gte: 5} }`. However, the object we receive is `{difficulty: 'easy', duration: {gte: 5} }` to fix it:

```JavaScript
// 1) Stringify the Object
let queryStr = JSON.stringify(queryObj);

// 2) Replace take callback function of a match
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/, match => `$${match}`);

// 3) Reparse it to get a modified query
 const query = Tour.find(JSON.parse(queryStr));

```

## MongoDB Query Operators

There are many query operators that can be used to compare and reference document fields.

### Comparison

The following operators can be used in queries to compare values:

- `$eq`: Values are equal
- `$ne`: Values are not equal
- `$gt`: Value is greater than another value
- `$gte`: Value is greater than or equal to another value
- `$lt`: Value is less than another value
- `$lte`: Value is less than or equal to another value
- `$in`: Value is matched within an array

### Logical

The following operators can logically compare multiple queries.

- `$and`: Returns documents where both queries match
- `$or`: Returns documents where either query matches
- `$nor`: Returns documents where both queries fail to match
- `$not`: Returns documents where the query does not match

### Evaluation

The following operators assist in evaluating documents.

- `$regex`: Allows the use of regular expressions when evaluating field values
- `$text`: Performs a text search
- `$where`: Uses a JavaScript expression to match documents



### Query Sorting

#### Singular Criteria Sorting

Soring is a #mongoose method chain on a query object `query.sort()` then passing a query into it `req.query.valKey`.
`127.0.0.1:3000/api/v1/tours?sort=price` `req.query.sort` in our case.
The sign or the absence of a sign for `price` determines ascension. Passing a `?sort=-price` result in a descending sort.

```JavaScript
// Ascending Order
let query = Tour.find(JSON.parse(queryStr));
    // Sorting
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }
```


#### Multiple Criteria Sorting

Just like a singular sorting it is done by passing a query link that looks like this `server/api/v1/tours?sort=price,ratingsAverage`

```JavaScript
if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
    query = query.sort('-createdAt');
    }
```


### Field Limiting

A query of `server/api/v1/tours?fields=name,price`
expected to return a field of `name` and `price` excluded. To implement it we use `query.select()` passing to a string of the `fields` you wanna exclude.

```JavaScript
// Field Limiting
if (req.query.fields) {
const fields = req.query.fields.split(',').join(' ');
query = query.select(fields);
} else {
query = query.select('-__v');
}
```

We also can hide fields from the `schema` permanently like passwords and other sensitive information.

```JavaScript
// Passing select: false
difficulty: {
    type: String,
	select: false,
    required: [true, 'A tour must have a difficulty.'],
  },
```




### Pagination 

`server/api/v1/tours?page=1&limit=3` Page navigation is implemented with the functions `.skip()` and `.limit()` passing a different numbers for both functions.

```JavaScript
// Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
  if (skip >= numTours) throw Error('This page does not exist');
    }
```
