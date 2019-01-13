
const express = require('express');
const app = express();
const reviewRoutes = express.Router();

const  Mailgun = require('mailgun-js');
let keys = require('../env.js');

console.log()

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
  console.log('fave:id ', req.params.id)
  Favourite.find({favouriteId: req.params.id } , (function (err, favourite){
    if(err){

      console.log(err);
      res.json(err);
    }
    else {
      console.log(favourite);
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

  Favourite.find({userId: req.params.id } ,function (err, favourite){
    if(err){
      console.log(err);
    }
    else {
      res.json(favourite);
    }
  });
});

//Email

//We're using the express framework and the mailgun-js wrapper


//Your api key, from Mailgun’s Control Panel
const api_key = keys.MGAPI;
//Your domain, from the Mailgun Control Panel
const domain = keys.MGDOMAIN;
//Your sending email address
const from_who = 'your@email.com';

// Send a message to the specified email address when you navigate to /submit/someaddr@email.com
// The index redirects here
reviewRoutes.route('/submit/:mail').get( function(req,res) {
  //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
  const mailgun = new Mailgun({apiKey: api_key, domain: domain});
  const data = {
    //Specify email data
    from: from_who,
    //The email to contact
    to: req.params.mail,
    //Subject and text data
    subject: 'Hello from Mailgun',
    html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! Click here to add your email address to a mailing list</a>'
  }
  //Invokes the method to send emails given the above data with the helper library
  mailgun.messages().send(data, function (err, body) {
    //If there is an error, render the error page
    if (err) {

      console.log("got an error: ", err);
    }
    //Else we can greet    and leave
    else {
      //Here "submitted.jade" is the view file for this landing page
      //We pass the variable "email" from the url parameter in an object rendered by Jade
      res.json(body);
      console.log(body);
    }
  });
});



module.exports = reviewRoutes;
