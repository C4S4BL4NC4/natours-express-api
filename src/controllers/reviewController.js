const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review,
    },
  });
});
