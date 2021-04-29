// 1. Require express
const express = require('express')



// 2. Create server named app
const app = express()


// 5. Make everything inside of public/ available
app.use(express.static('public'))

// 3. Create Route
app.get('/', (req, res, next) => {
    // console.log(req)
    res.sendFile(__dirname + '/views/home-page.html');
})


// 4. Tell our server to continuously listen for requests on port 3000. Start server.
app.listen(4000, () => {
    console.log('My app listening on port 4000.')
})


app.get('/cat', (req, res, next) =>{
    res.sendFile(__dirname + '/views/cat-page.html')
})