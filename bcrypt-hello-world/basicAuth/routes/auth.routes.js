// routes/auth.routes.js
const { Router } = require('express');
const router = new Router();
const mongoose = require('mongoose')
// setup bcrypt
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const User = require('../models/User.model');



// .get() route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

 // .post() route ==> to process form data
router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;

  // Server side validation. This checks if any of the fields are empty - if yes then i 
  // display errorMsg All fields are mandatory.
  if (!username || !email || !password) {
    res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(500)
      .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }


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
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render('auth/signup', {
         errorMessage: 'Username and email need to be unique. Either username or email is already used.'
      });
    }
    else {
        next(error);
    }
    });
});


router.get('/userProfile', (req, res) => res.render('users/user-profile'));


module.exports = router;