const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Signup Route: Non-REST format philosophy.

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// CRUD Routes: %100 REST format philosophy.
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
