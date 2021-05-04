const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  // Add One
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Good Food',
      cuisine: 'Italian'
    })

  })
  .then(recipe => {
    console.log(`New Recipe: ${recipe.title}`)
  })
  // Add Many
  .then(() => {
    return Recipe.insertMany(data)
  })
  // Update
  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, { duration: 100}, {new: true})
  })
  .then(recipe => {
    console.log(`Duration has been changed to: ${recipe.duration}`)
  })
  // Delete One
  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then( () => {
    console.log(`Recipe has been deleted`)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });