const express = require('express')
const app     = express()
const path    = require('path') 
const hbs     = require('hbs') 
 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
 
app.get('/', (req, res, next) => {
  res.render('index');
})

//  Route Params

// Let’s navigate to http://localhost:3000/users/ironhack on our browser!
app.get('/users/:username', (req, res, next) => {
  res.send(req.params);
})
// {"username":"ironhack"}


// Query String
// http://localhost:3000/search?city=Barcelona
app.get('/search', (req, res, next) => {
  res.send(req.query)
})
// { "city" : "Barcelona" }



// Also you can request more info by using &
//  http://localhost:3000/search?city=Barcelona&start-date=2018-01-18
// { "city" : "Barcelona", "start-date" : "2018-01-18" }

app.listen(3000, () => console.log('App listening on port 3000!'))


