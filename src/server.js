const dotenv = require('dotenv');

const mongoose = require('mongoose');

dotenv.config({ path: './config.env', quiet: true });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successful'));

const app = require('./app');

// console.log(app.get('env'));
// console.log(process.env);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    `Running on PORT: 127.0.0.1:${port}\nNODE_ENV = ${process.env.NODE_ENV}`,
  );
});
