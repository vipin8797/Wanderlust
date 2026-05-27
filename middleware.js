const Listing = require('./models/listing');
const Review = require('./models/reviews');

const { listingJoiSchema, reviewJoiSchema } = require('./joiSchema');// listingJoiSchema for joi validation.
const ExpressError = require("./utils/ExpressError"); //ExpressError for custom Error class


//********** Joi validation middleware ****************** */

//joi listing validation middleware
module.exports.joiListingValidate = (req, res, next) => {
    // Validating Joi Schema
    const { error } = listingJoiSchema.validate(req.body, { abortEarly: false });
    if (error) {
        // Extracting error messages properly
        let errMsg = error.details.map(el => el.message).join(", ");
        return next(new ExpressError(404, errMsg)); // Use `return` to prevent further execution
    }
    next();
};

//joi review validation middleware
module.exports.joiReviewValidate = (req,res,next) =>{
    //validation Joi Schema
    const{error} = reviewJoiSchema.validate(req.body,{abortEarly:false});
    if(error){
        let errMsg = error.details.map(el=>el.message).join(", ");
        return next(new ExpressError(404, errMsg));
    }
    next();
};
  


//********** Joi validation middleware ****************** */






//********** Authentication middleware ****************** */
//********** Authentication middleware ****************** */
// middleware to check if user is logged in or not.
// updated isLoggedIn middleware.
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        if (req.method === "GET") {
            req.session.redirectUrl = req.originalUrl;  // ✅ Save redirectUrl only for GET requests
        }
        req.flash("warning", "You must be logged in for this action!");
        return res.redirect("/user/login");
    }
    next();
};



//middleware to store redirectUrl in res.locals
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    
    }
    next()
}
//********** Authentication middleware ****************** */
//********** Authentication middleware ****************** */







//********** Authorization middleware ****************** */
//********** Authorization middleware ****************** */

//middleware to check owner of listing
module.exports.isOwner = async(req,res,next)=>{
    const{id} = req.params;
    const listing = await Listing.findById(id);
    if(!res.locals.currUser._id.equals(listing.owner._id)){
        req.flash('warning',"You don't have permission for this!");
        res.redirect(`/listings/${id}`);
    }else{
    next();
    }
}
 

//middleware to check author of review
module.exports.isReviewAuthor = async(req,res,next)=>{
    const{id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!res.locals.currUser._id.equals(review.author._id)){
        req.flash('warning',"You don't have permission for this!");
        res.redirect(`/listings/${id}`);
    }else{
    next();
    }
}

//********** Authorization middleware ****************** */
//********** Authorization middleware ****************** */

       

// modify upload image parameters to allow Joi validation
module.exports.setListingImagePara = (req, res, next) => {
    
      console.log(req.file);
    // ✅ If user uploaded a new image
    if (req.file) {
        req.body.listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    // ✅ If user entered an image URL
    else if (req.body.listing?.image?.url) {
        req.body.listing.image = {
            url: req.body.listing.image.url,
            filename: "custom-url"
        };
    }
    
    console.log("🔥 Final Image Object:", req.body.listing.image);
    next();
};
