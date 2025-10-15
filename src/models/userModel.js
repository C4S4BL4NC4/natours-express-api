const mongoose = require('mongoose');
const validatorPkg = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'a user must have confirm a password'],
    validate: {
      // Only works on .create() or .save()!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match!',
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  // Skip if not modified
  if (!this.isModified('password')) return next();

  // Password hashing cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the password Confirm field
  this.passwordConfirm = undefined;
  next();
});

// Instance Method: A method that is available on every document of a collection.

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAfter) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }

  // False not changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

// userSchema: name email photo(str) password passwordConfirm
