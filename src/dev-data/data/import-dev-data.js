const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Review = require('../../models/reviewModel');

const parsedToursNoId = JSON.parse(
  fs.readFileSync('./reviews.json', 'utf-8'),
).map((tour) => {
  const { id, ...newTour } = tour;
  return newTour;
});

// To make a model
dotenv.config({ path: '../../config.env', quiet: true });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => {
  console.log('Connected...');
  for (let i = 0; i < parsedToursNoId.length; i++) {
    createTour(parsedToursNoId[i]);
    console.log(`"${parsedToursNoId[i].name}" was created`);
  }
  console.log('DONE!');
});

const createTour = async (tour) => {
  try {
    await Review.create(tour);
  } catch (err) {
    console.error(`ERROR 💥: ${err}`);
  }
};

console.log('Connecting to DB...');
