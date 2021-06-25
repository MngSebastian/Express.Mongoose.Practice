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

router.get('/userProfile', (req, res) => {
  res.render('userProfile', { userInSession: req.session.currentUser });
});


router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  console.log('SESSION =====> ', req.session);


  // Form Validation
  if (email === '' || password === '') {
    res.render('login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        res.redirect('/userProfile');
      } else {
        res.render('login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});


router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect('/');
  })
});
module.exports = router