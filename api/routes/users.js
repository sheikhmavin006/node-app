const express = require("express");
const router = express.Router();
const UserControllers = require('../controllers/users')
const isValidUser = require('../middleware/auth')

// router.use()  middleware for this specific route instance
// router.all('*', isValidUser)

router
  .route("/")
  .get(UserControllers.getUsers)

router
  .route("/:id")
  .patch(UserControllers.updateUser)
  .get(UserControllers.getUser)
  .delete(UserControllers.deleteUser);

router.use('/:id/userProfile', require('./userProfile'))


module.exports = router;
