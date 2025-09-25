[[RestFUL API]]
#ExpressJS is a minimal #NodeJS framework, a higher level of abstraction.
It contains a very robust set of features: complex, routing, easier handling of requests and responses, middle-ware, server-side rendering, etc. Express also allows for rapid development of #NodeJS applications: we don't have to re-invent the wheel, as well as  making it easier to organize  our application into the #MVC architecture.

#### Express example:

```JavaScript
const express = require('express');

const app = express(); // Add bunch of methods to app variable.

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Renold',
    age: 2,
    breed: 'German Shepherd',
  });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
```



