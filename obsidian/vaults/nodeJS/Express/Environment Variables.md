[[Express Framework]]

NodeJS can run in multiple environments Production and Development for example debugging or turning login on/off are all based on the environment variables. By Default #express set it to development.
Environment variables are global variables used to get the current of the running app.


- To check for environment: `console.log(app.get('env'));`
- Nodejs itself can set a lot of environment variables `console.log(process.env)`

### NODE_ENV variable:

It is a variable use to  let #express know in which environment we are currently in. To set it, go to the folder directory in the terminal app and use `NODE_ENV=development nodemon server.js` this returns an object we can also push new variables into the environment object by doing `NODE_ENV=development X=23 nodemon server.js` now 'X' is pushed to the environment object.

### .env Config: 

To make a separate file for the environment variables we must install `dotenv` from #npm .
Also to make a `config.env` file in the source folder we should:
```JavaScript
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
```
