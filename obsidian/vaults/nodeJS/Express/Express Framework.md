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


#### Get request: 
Sending a get request in express is 
```JavaScript
app.get('theRoute', (req, req) => { 
res.status.(200).json()
}
```
We can declare the route on the fly but most of the time be` 'api/v1/something'` best practice.

#### Post request:
Sending a ==POST== request.
```JavaScript
app.use(express.json()); // Middle ware
...
...
...
app.post('/api/v1/tours', (req, res) => {
  console.log(req.body); // Client req content is saved here.
  res.send('Done');
});
```
You can't access the `req` directly we need something called a middleware to do that in the codebase above declare `app.use(express.json());` it simply add the data to the body of the request, otherwise, it would `undefined`.

`status: 201` means created