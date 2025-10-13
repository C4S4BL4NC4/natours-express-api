const mongoose = require('mongoose');
const validatorPkg = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a user must have a name'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'a user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validatorPkg.isEmail, 'Please use a valid emial.'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'a user must have a password'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'a user must have confirm a password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// userSchema: name email photo(str) password passwordConfirm
