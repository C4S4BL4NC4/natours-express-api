const { create } = require('domain');
const express = require('express');
const fs = require('fs');
const app = express(); // Add bunch of methods to app variable.
app.use(express.json()); // Middleware.

/////////////////////////////////
const PORT = 3000;
const ROUTE = '/api/v1/tours';
const ROUTE_ID = `${ROUTE}/:id`;
/////////////////////////////////

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

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTourById = (req, res) => {
  console.log(req.params.id);
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  if (!tour)
    res.status(404).json({
      status: 'fail',
      messasge: 'Invalid ID!',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    res.status(404).json({
      status: 'fail',
      messasge: 'Invalid ID!',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour>',
    },
  });
};

const deleteTour = (req, res) => {
  if (+req.params.id > tours.length) {
    res.status(404).json({
      status: 'fail',
      messasge: 'Invalid ID!',
    });
  }

  res.status(204).json({
    // 204 for deleted.
    status: 'success',
    data: null, // to show resource no longer exists.
  });
};

const createTour = (req, res) => {
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
};

// app.get(`${ROUTE}`, getAllTours);
// app.post(`${ROUTE}`, createTour);
app.route(ROUTE).get(getAllTours).post(createTour);
// app.get(`${ROUTE}/:id`, getTourById);
// app.patch(`${ROUTE}/:id`, updateTour);
// app.delete(`${ROUTE}/:id`, deleteTour);
app.route(ROUTE_ID).get(getTourById).patch(updateTour).delete(deleteTour);

app.listen(PORT, () => {
  console.log(`Running on PORT: ${PORT}`);
});
