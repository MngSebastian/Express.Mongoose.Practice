// Require express
const express = require('express')

// Create server
const app = express()


// Make everything inside public available
app.use(express.static('public'))

// Create home route
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views/home.html')
})


// Create About route
app.get('/about', (req, res, next) => {
    res.sendFile(__dirname + '/views')
})


// Create Works route
app.get('/works', (req, res, next) => {
    res.sendFile(__dirname + '/views')
})



// Tell the server to listen to port 4000
app.listen(4000, () => {
    console.log("App running on port 4000")
})