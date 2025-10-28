// make routes and controller for review
// (1) get all review  (2) create a review endpoints
// then create new reviews and retrieve them via endpoints
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview,
  );

module.exports = router;
