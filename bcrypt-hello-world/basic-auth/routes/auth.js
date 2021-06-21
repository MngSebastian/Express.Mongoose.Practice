const express = require('express');
const router  = express.Router();

const User = require('../models/User')

// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;


router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
 
  User.create({
    username,
    password: hashPass
  })
  .then(() => {
    res.redirect("/");
  })
  .catch(error => {
    console.log(error);
  })
});



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});



// Signup Form

router.get('/signup', (req, res, next) => {
  res.render('auth/signup')
})
module.exports = router;
