const express = require('express');
const Movie = require('../models/Movie.model');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

// Get Movies Route
router.get('/movies', (req, res, next) => {
    Movie.find()
      .then(allTheMoviesFromDB => {
        // console.log('Retrieved movies from DB:', allTheMoviesFromDB);
        res.render('movies', { movies: allTheMoviesFromDB})
      })
      .catch(error => {
        console.log('Error while getting the movies from the DB: ', error);
      })
  });

//   Get Movie Details
router.get('/movie/:movieId', (req, res, next) => {
    Movie.findById(req.params.movieId)
      .then(movie => {
        // console.log('Retrieved movie from DB:', movie);
        res.render('movie-details', { movie: movie})
      })
      .catch(error => {
        console.log('Error while getting the movie from the DB: ', error);
      })
  });

module.exports = router;
