[[MongoDB]]

A #MongoDB feature that #mongoose already gives us a way to deal with it.


Aggregation depends a pipeline `[]` of stages (`$match`, `$group`, `$sort`, etc...). [^1]
These stages are walked through sequentially by the `.aggregate` function and within these stages we can use parameters that are manipulated to yield the results we seek.
```JavaScript
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: 'difficulty',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
```

[^1]: https://www.mongodb.com/docs/manual/aggregation/
