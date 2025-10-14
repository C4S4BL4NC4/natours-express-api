const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  // Creating Database entry from request's body
  //const newUser = await User.create(req.body) RISK: EVERYONE CAN REGISTER AS AN ADMIN!!
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // check email and pass exist
  if (!email || !password) {
    return next(new AppError('Please provide an email and a password', 400));
  }
  // check if user exist and password valid
  const user = User.findOne({ email });
  // if everything okay send token to client
  const token = '';

  res.status(200).json({
    status: 'success',
    token,
  });
};
