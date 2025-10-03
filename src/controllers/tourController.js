const Tour = require('./../models/tourModel');

exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data: {
  //     tours: tours,
  //   },
  // });
};

exports.getTourById = (req, res) => {
  // const id = +req.params.id;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.updateTour = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: '<Updated tour>',
  //   },
  // });
};

exports.deleteTour = (req, res) => {
  // res.status(204).json({
  //   // 204 for deleted.
  //   status: 'success',
  //   data: null, // to show resource no longer exists.
  // });
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save();
    // or use .create
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.error(`ERROR 💥: ${err}`);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
