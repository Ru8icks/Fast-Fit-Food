
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Define collection and schema for AdUnits
let Workout = new Schema({
  sets: {
    type: [Object]
  },
  programName: {
    type: String
  },
  author: {
    type: String
  },
  date: {
    type: Date
  },


},{
  collection: 'reviews'
});

module.exports = mongoose.model('Workout', Workout);
