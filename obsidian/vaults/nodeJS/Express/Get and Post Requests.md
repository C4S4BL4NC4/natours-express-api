
[[Express Framework]]

#### Get request: 
Sending a ==GET== request in express is 
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
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.error(err);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});
```
You can't access the `req` directly we need something called a middleware to do that in the codebase above declare `app.use(express.json());` it simply add the data to the body of the request, otherwise, it would `undefined`.

`status: 201` means created.
