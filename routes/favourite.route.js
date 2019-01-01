
const express = require('express');
const app = express();
const favouriteRoutes = express.Router();

// Require AdUnit model in our routes module
let Favourite = require('../models/Favourite');

// Defined store route
favourite.route('/add').post(function (req, res) {
  console.log("here")
  let favourite = new Favourite(req.body);
  favourite.save()
    .then(() => {
      res.status(200).json({'favourite': 'favourite in added successfully'});
      console.log("save")


    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
favouriteRoutes.route('/').get(function (req, res) {

  Favourite.find(function (err, favourite){
    if(err){
      return false;
      console.log(err);
      res.json(err);
    }
    else {
      res.json(favourite);
    }
  });
});



// Defined delete | remove | destroy route
favouriteRoutes.route('/delete/:id').get(function (req, res) {
  Favourite.findByIdAndRemove({_id: req.params.id}, function(err, favourite){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = favouriteRoutes;
