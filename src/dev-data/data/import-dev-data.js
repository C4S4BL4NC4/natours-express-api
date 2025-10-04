const mongoose = require('mongoose');
const fs = require('fs');

const parsedToursNoId = JSON.parse(
  fs.readFileSync('./tours-simple.json', 'utf-8'),
).map((tour) => {
  const { id, ...newTour } = tour;
  return newTour;
});

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name.'],
    unique: true,
    trim: true,
  },

  ratingsAverage: { type: Number, default: 4.5 },
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
  },

  startDates: [Date],
});

// To make a model
const Tour = mongoose.model('Tour', tourSchema);

mongoose
  .connect(
    'mongodb+srv://mrdroyd:dT9z3Ecsvwat0P5e@cluster0.bd3mhki.mongodb.net/',
  )
  .then(() => console.log('DB connection successful'));

// const app = require('../../app');

// // console.log(app.get('env'));
// // console.log(process.env);
// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log(`Running on PORT: 127.0.0.1:${port}\n`);
// });

const createTour = async (tour) => {
  try {
    await Tour.create(tour);
  } catch (err) {
    console.error(`ERROR 💥: ${err}`);
  }
};

createTour(parsedToursNoId[1]);
