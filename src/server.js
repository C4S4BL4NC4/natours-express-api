/* eslint-disable no-console */
const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  process.exit(1);
});

dotenv.config({ path: './config.env', quiet: true });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('=> Connected to Database.'));

const app = require('./app');

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  // Only log successful DB connection above
});

process.on('unhandledRejection', (err) => {
  server.close(() => {
    process.exit(1);
  });
});
