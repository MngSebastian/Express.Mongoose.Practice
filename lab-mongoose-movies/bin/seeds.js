const mongoose = require('mongoose')

const Celebrity = require('../models/Celebrity')


const dbName = 'lab-mongoose-moviess';
mongoose.connect(`mongodb://localhost/${dbName}`);
 

const celebrities = [
    {
        name: "Eminem",
        occupation: "Artist",
        catchphrase: "A",
    },
    {
        name: "Dr.Dre",
        occupation: "Artist",
        catchphrase: "B",
    },
    {
        name: "JOyner Lucas",
        occupation: "Artist",
        catchphrase: "C",
    },
]


Celebrity.create(celebrities, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${celebrities.length} celebrities`)
    mongoose.connection.close();
  });