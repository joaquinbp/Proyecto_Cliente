const mongoose = require('mongoose');
const URI = "mongodb://localhost/PROYECTO-CLIENTE";

mongoose.connect(URI)
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;