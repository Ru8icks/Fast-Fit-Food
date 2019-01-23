
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Define collection and schema for AdUnits
let Program = new Schema({
  program: {
    type: [Object]
  },
  name: {
    type: String
  },
  author: {
    type: String
  },


},{
  collection: 'reviews'
});

module.exports = mongoose.model('Program', Program);
