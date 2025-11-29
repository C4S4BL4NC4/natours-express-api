const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  // 1) Get data for requested tour (including review and tour guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  // 2) Build Template

  // 3) Render Template using data from 1
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});
