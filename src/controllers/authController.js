/* eslint-disable arrow-body-style */
const jwt = require('jsonwebtoken');
const util = require('util');
const crypto = require('crypto');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

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

// Login a user
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

// Forget password provide a valid email, recieve a resetToken
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError('There is no user with this email address', 404));

  const resetToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('Something went wrong sending the email!', 500));
  }
});

// Reseting password with a reset token
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2. check if token is valid and user exist and set password
  if (!user) next(new AppError('Invalid or expired token!', 400));

  // 3. update passwordChangedAt property
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.save();

  // 4. login user send jwt to clien
  const token = await signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

// Updating a passowrd for a current user.
exports.updatePassword = (req, res, next) => {
  // 1) Get user from collection.

  const user = findOne({});
  // 2) Check if POSTed password is correct.
  // 3) If so, update the password to the new one.
  // 4) Log in user and send jwt.
};
