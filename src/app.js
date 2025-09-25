const express = require('express');
const fs = require('fs');
const app = express(); // Add bunch of methods to app variable.

app.use(express.json()); // Middleware.

// app.get('/', (req, res) => {
//   res.status(200).json({
//     name: 'Renold',
//     age: 2,
//     breed: 'German Shepherd',
//   });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

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

  res.send('Done');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
