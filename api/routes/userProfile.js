const express = require("express");
const router = express.Router();
const UserProfileControllers = require('../controllers/user_profile') 


router.post("/", UserProfileControllers.insert);
router.get("/", UserProfileControllers.get);



module.exports = router;
