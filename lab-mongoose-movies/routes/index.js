const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


// Get Celebrities
router.get('/celebrities', (req, res, next) => {
  // find all from db
  Celebrity.find()
  .then(allCelebritiesFromDb => {
    res.render('celebrities/index.hbs', { celebrities: allCelebritiesFromDb})
  })
  .catch(error => {
    console.log(error)
  })
})

module.exports = router;


