
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUnits
let Review = new Schema({
  title: {
    type: String
  },
  review: {
    type: String
  },
  rating: {
    type: Number
  },
  reviewAuthor: {
    type: String
  },
  reviewId: {
    type: String
  },


},{
  collection: 'reviews'
});

module.exports = mongoose.model('Review', Review);
