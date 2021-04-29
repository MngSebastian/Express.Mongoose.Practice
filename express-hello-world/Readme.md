// 1. Require express
const express = require('express')

// 2. Create server named app
const app = express()

// 5. Make everything inside of public/ available
app.use(express.static('public'))

// 3. Create Route
app.get('/', (req, res, next) => {
// console.log(req)
res.send('<h1>Welcome Ironhacker. :)</h1>');
})

// 4. Tell our server to continuously listen for requests on port 3000. Start server.
app.listen(4000, () => {
console.log('My app listening on port 4000.')
})

5. Install nodemon

6. Create public
   images
   stylesheets
   style.css folder and files.

7. Make everything inside of public/ available
   app.use(express.static('public'))

8. Created Cat route.

9. in order to not have to much html in our routes, i create a views folder for all of our html files

Once i have the html views ready i can change my routes to
app.get('/cat', (request, response, next) => {
response.sendFile(\_\_dirname + '/views/cat-page.html');
});
dirname should not have left slash, it adds itself on save for some reason.
