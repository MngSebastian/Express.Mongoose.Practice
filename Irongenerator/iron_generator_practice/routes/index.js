const express = require('express');
const router  = express.Router();
const Book = require('../models/book.js');



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/books/add', (req, res, next) => {
  res.render('book-add')
})


router.post('/books/add', (req, res, next) => {
  // Destructuring the data, this only works because the names are exactly the same in the form.
  const { title, author, description, rating } = req.body

  // Create new instance of book.
  const newBook = new Book ({ title, author, description, rating })

  // Save the new Book or throw an error if something goes wrong.
  newBook.save()
  .then((book) => {
    res.redirect('/books')
  })
  .catch ((error) => {
    console.log(error)
  })
})


router.get('/books/edit', (req, res, next) => {
  Book.findOne({_id: req.query.book_id})
  .then((book) => {
    res.render("book-edit", {book});
    console.log(book)
  })
  .catch((error) => {
    console.log(error);
  })
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

router.get('/books/:bookId', (req, res, next) => {
  // find one by id
  Book.findById(req.params.bookId)
    .then(book => {
      // console.log('Retrieved books from DB:', allTheBooksFromDB);
      res.render('book-details', { book: book})
    })
    .catch(error => {
      console.log('Error while getting the books from the DB: ', error);
    })
});


module.exports = router;
