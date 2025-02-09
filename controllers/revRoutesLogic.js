const Review = require('../models/reviews');
const Listing = require('../models/listing');


module.exports.reviewPostRoute = async (req, res, next) => {
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
    };


module.exports.destroyReview = async(req,res,next)=>{
    const{id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('error',"Review Deleted!");
    res.redirect(`/listings/${id}`);
  }    