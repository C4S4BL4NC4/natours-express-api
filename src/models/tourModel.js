const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'], // Error string
    unique: true,
  }, // Schema type options
  rating: { type: Number, default: 4.5 },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// To make a model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
