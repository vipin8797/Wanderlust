//Requiring Dependencies
const express = require('express');
const router = express.Router();
const Listing = require('../models/listing'); //Our Listing Model
const Review = require('../models/reviews'); //Review model
const ExpressError = require("../utils/ExpressError"); //ExpressError for custom Error class
const wrapAsync = require('../utils/wrapAsync'); //wrapAsync for default erro handling minddleware
const { listingJoiSchema, reviewJoiSchema } = require('../joiSchema');// listingJoiSchema for joi validation.
const methodOverride = require('method-override'); //method override fot put,patch,delete req
const { joiListingValidate,isLoggedIn, isOwner } = require("../middleware"); //middleware to check if user is logged in or not.
//using dependencies
router.use(methodOverride('_method')); //method overide
//Route Logics
const {indexGetRoute,newGetRoute,newPostRoute,
      showGetRoute,editGetRoute,editPutRoute,destroyRoute} = require('../controllers/lisRoutesLogic');





//index route
router.get('/', wrapAsync(indexGetRoute));


//Get Req for new listing
router.get('/new', isLoggedIn, newGetRoute);

//post for new listing
router.post('/', isLoggedIn, joiListingValidate,wrapAsync(newPostRoute));




//show route
router.get('/:id', wrapAsync(showGetRoute));


//Get for Edit
router.get('/:id/edit', isLoggedIn, wrapAsync(editGetRoute));




router.put('/:id',
    isLoggedIn,
    isOwner,
    joiListingValidate,
    wrapAsync(editPutRoute));


//Delete Route
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(destroyRoute));











module.exports = router;