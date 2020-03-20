const express = require("express");
const router = express.Router();
const UserControllers = require('../controllers/users') 

// router.use()  middleware for this specific route instance

router
  .route("/")
  .get(UserControllers.getUsers)

router
  .route("/:id")
  .patch(UserControllers.updateUser)
  .get(UserControllers.getUser)
  .delete(UserControllers.deleteUser);



module.exports = router;
