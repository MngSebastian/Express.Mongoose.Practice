const express = require('express')
const hbs = require('handlebars')
const app = express()
const path = require('path')

// Making the views available
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname + '/views'))


hbs.registerPartial(__dirname, '/views/partials');




// Making everything from public available
app.use(express.static(path.join(__dirname, 'public')))



app.get('/', (req, res, next) => {
    res.render('index')
})


app.get('/players', (req, res, next) => {
    res.render('players')
})


app.get('/teams', (req, res, next) => {
    let data = {
        layout: false
      }
    res.render('teams')
})



app.listen(3000)