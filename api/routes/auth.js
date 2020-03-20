const express = require("express");
const router = express.Router();
const AuthControllers = require('../controllers/auth') 

// router.use()  middleware for this specific route instance

router.get('/login', (req, res) => {
    res.render('login')
})
router.post("/login",AuthControllers.loginUser);
router.post("/register",AuthControllers.register);


module.exports = router;
