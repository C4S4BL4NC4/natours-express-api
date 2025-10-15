/* eslint-disable arrow-body-style */
const jwt = require('jsonwebtoken');
const util = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// eslint-disable-next-line arrow-body-style
const signToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // Creating Database entry from request's body
  //const newUser = await User.create(req.body) RISK: EVERYONE CAN REGISTER AS AN ADMIN!!
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = await signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check email and pass exist
  if (!email || !password) {
    return next(new AppError('Please provide an email and a password', 400));
  }
  // check if user exist and password valid
  const user = await User.findOne({ email }).select('+password');

  const correct = user && (await user.correctPassword(password, user.password));

  // if everything okay send token to client
  if (!user || !correct) {
    return next(new AppError('Incorrect email or password', 401));
  }
  const token = await signToken(user._id);
  console.log(`=> ${user.name} has logged in.`);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) Get token and  check it exist
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }
  // 2) Verify the token is legit
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  // 3) Check user existance
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user of token no longer exist!', 401));
  }

  // 4) Check if user changed passowrd after token was issued

  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError('User has changed their password! Please login again.', 401),
    );
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // Roles [admin, leadguide]
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permissions to do that action.', 403),
      );
    }
    next();
  };
};
