
const express = require('express');
const app = express();
const reviewRoutes = express.Router();

// Require AdUnit model in our routes module
let Review = require('../models/Review');

// Defined store route
reviewRoutes.route('/add').post(function (req, res) {
  console.log(req.body)
  let review = new Review(req.body);
  review.save()
    .then(() => {
      res.status(200).json({'review': 'review in added successfully'});
      console.log("save")


    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
reviewRoutes.route('/').get(function (req, res) {

  Review.find(function (err, review){
    if(err){
      console.log(err);
    }
    else {
      res.json(review);
    }
  });
});

// Defined edit route
reviewRoutes.route('/edit/:id').get(function (req, res) {
  console.log("here")
  let id = req.params.id;
  Review.findById(id, function (err, review){
    res.json(review);
  });
});

//  Defined update route
reviewRoutes.route('/update/:id').post(function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    if (!review)
      return next(new Error('Could not load Document'));
    else {
      review.title = req.body.title;
      review.review = req.body.review;
      review.rating= req.body.rating;
      review.author = req.body.author;
      review.recipeId = req.body.recipeId;



      review.save().then(review => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
reviewRoutes.route('/delete/:id').get(function (req, res) {
  Review.findByIdAndRemove({_id: req.params.id}, function(err, review){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = reviewRoutes;
