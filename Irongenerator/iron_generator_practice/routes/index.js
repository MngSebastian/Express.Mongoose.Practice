const express = require('express');
const router  = express.Router();
const Book = require('../models/book.js');



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/books', (req, res, next) => {
  Book.find()
    .then(allTheBooksFromDB => {
      // console.log('Retrieved books from DB:', allTheBooksFromDB);
      res.render('books', { books: allTheBooksFromDB})
    })
    .catch(error => {
      console.log('Error while getting the books from the DB: ', error);
    })
});

module.exports = router;
