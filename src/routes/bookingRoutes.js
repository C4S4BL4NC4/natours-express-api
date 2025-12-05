const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

// No-REST principle route
router.get(
  '/checkout-session/:tourID',
  authController.protect,
  bookingController.getCheckoutSession,
);

// REST
router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .post(bookingController.createBooking)
  .get(bookingController.getAllBookings);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
