const router = require("express").Router();

const User = require('../models/User.model.js')


// bring bcrypt



// Signup
router.get('/signup', (req, res) => {
    res.render('signup')
})


module.exports = router