
const express = require('express');
const app = express();
const reviewRoutes = express.Router();

// Require AdUnit model in our routes module
let Review = require('../models/Review');
let Favourite = require('../models/Favourite');

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
reviewRoutes.route('/:id').get(function (req, res) {
  console.log('get',req.params.id);
  Review.find({reviewId: req.params.id } ,function (err, review){
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
      review.reviewId = req.body.recipeId;



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
  console.log('del del id')
  Review.find({_id: req.params.id}, function(err, review){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});



// Defined store route FAVEFAVCCE
reviewRoutes.route('/addFave').post(function (req, res) {
  console.log("AddFave")
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
reviewRoutes.route('/fave/:id').get(function (req, res) {
  console.log('fave:id')


  Favourite.find({recipeId: req.params.id } , (function (err, favourite){
    if(err){

      console.log(err);
      res.json(err);
    }
    else {

      res.json(favourite);
    }
  }));
});

// Defined delete | remove | destroy route
reviewRoutes.route('/deleteFave/:id').get(function (req, res) {
  console.log('DeleteFave');
  Favourite.deleteMany({favouriteId: req.params.id}, function(err){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});



reviewRoutes.route('/getFave/:id').get(function (req, res) {

  console.log('get',req.params.id);
  Favourite.find({userId: req.params.id } ,function (err, review){
    if(err){
      console.log(err);
    }
    else {
      res.json(review);
    }
  });
});


module.exports = reviewRoutes;
