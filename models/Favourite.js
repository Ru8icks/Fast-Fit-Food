
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for favourites
let Favourite = new Schema({

  ingredients: {
    type: String
  },
  image: {
    type: String
  },
  title: {
    type: String
  },
  diets: {
    type: Array
  },
  instructions: {
    type: Array
  },
  instructionsBySteps: {
    type: Array
  },
  readyInMinutes: {
    type: Number
  },
  sourceUrl: {
    type: String
  },
  dishType: {
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
