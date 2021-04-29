// 1. Require express
const express = require('express')



// 2. Create server named app
const app = express()


// 3. Create Route
app.get('/', (req, res, next) => {
    console.log(req)
    response.send('<h1>Welcome Ironhacker. :)</h1>');
})


// 4. Tell our server to continuously listen for requests on port 3000. Start server.
app.listen(300, () => {
    console.log('My app listening on port 3000.')
})