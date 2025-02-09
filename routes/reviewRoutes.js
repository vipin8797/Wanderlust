//Requiring Dependencies
const express = require('express');
const router = express.Router({mergeParams:true});
const Listing = require('../models/listing'); //Our Listing Model
const Review = require('../models/reviews'); //Review model
const ExpressError = require("../utils/ExpressError"); //ExpressError for custom Error class
const wrapAsync = require('../utils/wrapAsync'); //wrapAsync for default erro handling minddleware
const {listingJoiSchema, reviewJoiSchema} = require('../joiSchema');// listingJoiSchema for joi validation.
const methodOverride = require('method-override'); //method override fot put,patch,delete req
const {joiReviewValidate,joiListingValidate,isLoggedIn,isReviewAuther} = require('../middleware');
//using depedencies
router.use(methodOverride('_method')); //method overide
//ReviewRoutes Logics
const {reviewPostRoute,destroyReview} = require('../controllers/revRoutesLogic');



  




// //Reviews Routes starts from here
router.post('/',isLoggedIn,joiReviewValidate, wrapAsync(reviewPostRoute,));
    


 //Review Delete Route
router.delete('/:reviewId',isLoggedIn,isReviewAuther,wrapAsync(destroyReview));   
    

    module.exports = router;