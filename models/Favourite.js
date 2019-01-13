
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for favourites
let Favourite = new Schema({


  image: {
    type: String
  },
  title: {
    type: String
  },
  favouriteId: {
    type: String
  },
  userId: {
    type: String
  },


},{
  collection: 'reviews'
});

module.exports = mongoose.model('Favourite', Favourite);
