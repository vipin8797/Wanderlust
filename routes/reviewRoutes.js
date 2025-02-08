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




  




// //Reviews Routes starts from here
router.post('/',isLoggedIn,joiReviewValidate, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { review } = req.body;
    
    let listing = await Listing.findById(id);
    // Create a new review
    let newReview = new Review({
        comment: review.comment,
        rating: review.rating,
        created_At: Date.now(),
      });
      newReview.auther = req.user._id;
      await newReview.save();
      // console.log(newReview);
      listing.reviews.push(newReview);
      await listing.save();
      req.flash('success',"review created!")
      res.redirect(`/listings/${id}`);
    }));
    



    //Review Delete Route
    router.delete('/:reviewId',isLoggedIn,isReviewAuther,wrapAsync(async(req,res,next)=>{
      const{id,reviewId} = req.params;
      await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
      await Review.findByIdAndDelete(reviewId);
      req.flash('error',"Review Deleted!");
      res.redirect(`/listings/${id}`);
    }));   
    

    module.exports = router;