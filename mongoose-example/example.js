const mongoose  = require('mongoose')


// Connecting to db, if exampleApp does not exist mongo will create it
mongoose
  .connect('mongodb://localhost/exampleApp', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


  const cat = mongoose.model('Cat', {name: String})



function addNewCat (catName) {
    const kitty = new cat({ name: catName})
    kitty.save()
    .then(newCat => console.log(`A new cat is created: ${newCat}!`))
    .catch(err => console.log(`Error while creating a new cat: ${err}`));

}




function showCats () {
    console.log('Show all cats.')
    cat.find()
    .then(catsFromDB => {
      // catsFromDB is a placeholder and represents an array of Cat instances
      catsFromDB.forEach(oneCat => console.log(` --> cat: ${oneCat.name}`));
    })
    .catch(error => console.log(`Error occurred during getting cats from DB: ${error}`));
}



function addTenCats () {
    for (let i = 0; i < 10; i++) {
        addNewCat(`Ironhacker ${i}`)
    }
}


addTenCats()


/* We have to wait for our cats to save before displaying them
 Remember, it's async */
 setTimeout(showCats, 1500);