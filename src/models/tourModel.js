const mongoose = require('mongoose');
const slugify = require('slugify');
const User = require('./userModel');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name.'],
      unique: true,
      trim: true,
      maxLength: [40, 'Tour must have less than or equal to 40'],
      minLength: [10, 'Tour must have more than or equal to 10'],
    },

    slug: {
      type: String,
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, 'A tour must have a price.'],
    },

    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to currect doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price.',
      },
    },

    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration.'],
    },

    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size.'],
    },

    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty.'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is within easy, medium, or difficult',
      },
    },

    description: {
      type: String,
      trim: true,
    },

    imageCover: {
      type: String,
      required: [true, 'A tour must have an image'],
    },

    images: [String],

    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },

    startDates: [Date],

    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number], // [long, lat]
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

// Virtual Functions

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Document Middleware / Schema Middleware

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// // Embedding
// tourSchema.pre('save', async function (next) {
//   const guidesProm = this.guides.map(async (id) => await User.findById(id));
//   this.guides = Promise.all(guidesProm);
//   next();
// });

// tourSchema.post('save', function (doc, next) {});

// Query Middleware

// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`=> qRT: ${Date.now() - this.start}ms`);
  next();
});

// Aggregation Middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  next();
});

// To make a model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
