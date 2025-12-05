const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Booking = require('../models/bookingModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get data for requested tour (including review and tour guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name!', 404));
  }

  // 2) Build Template

  // 3) Render Template using data from 1
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1 Find all bookings that belong to user
  const bookings = await Booking.find({
    user: req.user.id,
  });
  // 2 Find tours with the returned ids
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({
    _id: { $in: tourIDs },
  });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

// exports.updateUserData = (req, res, next) => {
//   console.log(req.body);
//   next();
// };
