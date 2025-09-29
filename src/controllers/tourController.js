const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTourById = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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
