//Requiring Dependencies
const express = require('express');
const router = express.Router();
const Listing = require('../models/listing'); //Our Listing Model
const Review = require('../models/reviews'); //Review model
const ExpressError = require("../utils/ExpressError"); //ExpressError for custom Error class
const wrapAsync = require('../utils/wrapAsync'); //wrapAsync for default erro handling minddleware
const { listingJoiSchema, reviewJoiSchema } = require('../joiSchema');// listingJoiSchema for joi validation.
const methodOverride = require('method-override'); //method override fot put,patch,delete req
const { joiListingValidate, isLoggedIn, isOwner ,setListingImagePara} = require("../middleware"); //middleware to check if user is logged in or not.
//using dependencies
router.use(methodOverride('_method')); //method overide
//Route Logics
const { indexGetRoute, newGetRoute, newPostRoute,
    showGetRoute, editGetRoute, editPutRoute, destroyRoute } = require('../controllers/lisRoutesLogic');

    const multer  = require('multer') //multer for image updloadation
    const {storage} = require('../cloudConfig'); //requiring cloudinary storage 
    const upload = multer({storage}); //multer to store file in storage of cloudinary.


router.route('/new')
    .get(isLoggedIn, newGetRoute) // ger for new 


router.route('/')
    .get(wrapAsync(indexGetRoute))   //index route
    .post(isLoggedIn,
        upload.single("listing[image]"),
        setListingImagePara,
        joiListingValidate,
         wrapAsync(newPostRoute))   //post for new listing
   


router.route("/:id")
    .get(wrapAsync(showGetRoute))  //show route
    .put(isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        setListingImagePara,
        joiListingValidate,
        wrapAsync(editPutRoute)) //edit route
    .delete(isLoggedIn, isOwner, wrapAsync(destroyRoute)) //delete route


router.route('/:id/edit')
    .get(isLoggedIn, wrapAsync(editGetRoute)) //get for edit




// //index route
// router.get('/', wrapAsync(indexGetRoute));



// //post for new listing
// router.post('/', isLoggedIn, joiListingValidate,wrapAsync(newPostRoute));

// //Get Req for new listing
// router.get('/new', isLoggedIn, newGetRoute);


// //show route
// router.get('/:id', wrapAsync(showGetRoute));


// //Get for Edit
// router.get('/:id/edit', isLoggedIn, wrapAsync(editGetRoute));




// router.put('/:id',
//     isLoggedIn,
//     isOwner,
//     joiListingValidate,
//     wrapAsync(editPutRoute));


// //Delete Route
// router.delete('/:id', isLoggedIn, isOwner, wrapAsync(destroyRoute));











module.exports = router;