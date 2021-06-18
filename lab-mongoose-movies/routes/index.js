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



router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new.hbs')
})

router.post('/celebrities/new', (req, res, next) => {
const { name, occupation, catchphrase} = req.body

// Create an instance of the Celebrity model with the object you made in the previous step
const newCelebrity = new Celebrity ({name, occupation, catchphrase})

// Call the save method to save the new celebrity to the database
newCelebrity.save()
.then((celebrity) => {
  res.redirect('/celebrities')
})
.catch((err) => {
  console.log(err)
})
})


// Get Celebrity by id
router.get('/celebrities/:celebId', (req, res, next) => {
  // find by id from db
  const id = req.params.celebId
  console.log('objectid', id)
  Celebrity.findById(id)
  .then(celebrity => {
    res.render('celebrities/show.hbs', { celebrity: celebrity})
  })
  .catch(error => {
    console.log(error)
  })
})


module.exports = router;

