const express = require('express')
const hbs = require('hbs')
const app = express()
const path = require('path')

// Making the views available
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname + 'views'))
// Making everything from public available
app.use(express.static(path.join(__dirname, 'public')))



app.get('/', (req, res, next) => {
    res.render('index')
})


app.get('/players', (req, res, next) => {
    res.render('players')
})


app.get('/teams', (req, res, next) => {
    res.render('teams')
})



app.listen(3000)