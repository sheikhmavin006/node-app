const express = require("express");
const router = express.Router();
const AuthControllers = require('../controllers/auth') 
const isValidUser =require('../middleware/auth')
const multer = require('multer')
let upload = multer({ dest: 'public/uploads/' });



// router.use()  middleware for this specific route instance

router.get('/login', (req, res) => {
    res.render('login')
})

router.post("/login",AuthControllers.loginUser);

router.post("/register", upload.single('avtar'),AuthControllers.register);

router.get('/currentUser', isValidUser, function (req, res, next) {
    console.log(req.user)
    return res.status(200).json(req.user);
});

// router.get('/logout', isValidUser, function (req, res, next) {
//     req.logout();
//     return res.status(200).json({ message: 'Logout Success' });
// })

module.exports = router;
