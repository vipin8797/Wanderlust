//Requiring depedencies
const Listing = require('../models/listing'); //Our Listing Model





module.exports.indexGetRoute = async (req, res) => {

    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });

}


module.exports.newGetRoute = (req, res) => {
    res.render('listings/new.ejs');
};


module.exports.newPostRoute = async (req, res, next) => {
    const { listing } = req.body;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', "new Listing created!");
    res.redirect('/listings');

};

module.exports.showGetRoute = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
    .populate({
        path:'reviews',
        populate:{
            path:'auther'
            ,},}).populate('owner');
    // console.log(listing);
    res.render('listings/show.ejs', { listing });
};

module.exports.editGetRoute = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
};


module.exports.editPutRoute = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
    req.flash('warning', "Listing Edited succesfully!");
    res.redirect('/listings');
};

module.exports.destroyRoute = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);
    req.flash('error', 'Listing deleted !');
    res.redirect('/listings');

};