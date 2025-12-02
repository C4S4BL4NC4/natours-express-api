const mongoose = require('mongoose');
const crypto = require('crypto');
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
    validate: [validatorPkg.isEmail, 'Please use a valid email.'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'guide-lead', 'admin'],
    default: 'user',
    lowercase: true,
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

  passwordChangedAt: { type: Date },

  passwordResetToken: String,

  passwordResetExpires: Date,

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// User Schema Middleware

userSchema.pre('save', async function (next) {
  // Skip if not modified
  if (!this.isModified('password')) return next();

  // Password hashing cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the password Confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; // Ensuring the token creation before password change
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance Method: A method that is available on every document of a collection.

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

// userSchema: name email photo(str) password passwordConfirm
