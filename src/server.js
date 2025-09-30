const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(app.get('env'));
// console.log(process.env);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('================================');
  console.log(
    `Running on PORT: 127.0.0.1:${port}\nNODE_ENV = ${process.env.NODE_ENV}`
  );
  console.log('================================');
});
