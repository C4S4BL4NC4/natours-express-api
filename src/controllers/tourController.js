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
  console.log('Tour by ID request.');
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  console.log('Patch request.');
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour>',
    },
  });
};

exports.deleteTour = (req, res) => {
  console.log('Delete request.');
  res.status(204).json({
    // 204 for deleted.
    status: 'success',
    data: null, // to show resource no longer exists.
  });
};

exports.createTour = (req, res) => {
  console.log('POST request.');
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/..
    /dev-data/data/tours-simple.json`,
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

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    console.log(`Invalid ID recieved: ${val}`);
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID.',
    });
  }
  console.log(`Valid ID recieved: ${val}`);
  next();
};
// Create checkBody middleware function

exports.checkBody = (req, res, next, val) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing Name Or Price',
    });
  }
  next();
};
// Check if body contains the name property and price property.
// If not, send back 400 (bad request)

// Add it to the post handler stack
