const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = function (obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// User Self
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. create error if user update password
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for password udating. Try "/updatePassword".',
        400,
      ),
    );

  // 2. update user document
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  updatedUser.name = req.body.name;
  updatedUser.email = req.body.email;

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});

// User self deletion
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    status: 'success',
    message: 'Your account has been flagged as inactive',
  });
});

// CRUD
exports.getAllUsers = factory.getAll(User);
//ADMIN TOOLS
exports.createUser = factory.createOne(User);
exports.getUser = factory.getOne(User);
// Don't update passwords with this cuz middleware will be skipped
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
