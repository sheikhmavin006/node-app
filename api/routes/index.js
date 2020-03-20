const express = require("express");
const router = express.Router();
//root url
router.get('/', (req, res) => {
    res.render('home')
})


module.exports = router
