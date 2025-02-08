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






//index route
router.get('/', wrapAsync(async (req, res) => {

    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });

}));


//Get Req for new listing
router.get('/new', isLoggedIn, (req, res) => {
    res.render('listings/new.ejs');
})

//post for new listing
router.post('/', isLoggedIn, joiListingValidate, wrapAsync(async (req, res, next) => {
    const { listing } = req.body;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', "new Listing created!");
    res.redirect('/listings');

}))




//show route
router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
    .populate({
        path:'reviews',
        populate:{
            path:'auther'
            ,},}).populate('owner');
    // console.log(listing);
    res.render('listings/show.ejs', { listing });
}));


//Get for Edit
router.get('/:id/edit', isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
}));




router.put('/:id',
    isLoggedIn,
    isOwner,
    joiListingValidate,
    wrapAsync(async (req, res) => {
        const { id } = req.params;

        await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
        req.flash('warning', "Listing Edited succesfully!");
        res.redirect('/listings');
    }));


//Delete Route
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);
    req.flash('error', 'Listing deleted !');
    res.redirect('/listings');

}));











module.exports = router;