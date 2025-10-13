const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught exception!');
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
  console.log(
    `Running on port: 127.0.0.1:${port}\nNODE_ENV = ${process.env.NODE_ENV}`,
  );
  console.log('=> Connecting...');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandler rejection! Shutting Down...');
  server.close(() => {
    console.log('=> Server closed.');
    process.exit(1);
  });
});
