const router = require("express").Router();
const User = require('../models/User.model.js')

// setup bcrypt
const bcryptjs = require('bcryptjs');
const saltRounds = 10;


// Signup
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', (req, res, next) => {
    const {username, email, password } = req.body


    const hashedPassword = bcryptjs.hashSync(password, saltRounds);

    bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        // username: username
        username,
        email,
        // passwordHash => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        passwordHash: hashedPassword
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/userProfile');    
    })
    .catch(error => next(error));
});

router.get('/userProfile', (req, res, next) => {
    res.render('userProfile')
})

module.exports = router