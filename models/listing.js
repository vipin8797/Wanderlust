const mongoose = require('mongoose'); //mongoose for MongoDB
const Review = require('./reviews'); //required for mongoose post middleware to delete reviews while listing is deleted.


const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required:true,
    },
    image: {
            filename:{
                type:String,
                default:'listingimage',
            },
            url:{
                type:String,
                default: "https://plus.unsplash.com/premium_photo-1669748157617-a3a83cc8ea23?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VhJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D",
        set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1669748157617-a3a83cc8ea23?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VhJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D"
            : v,

            },
    },
    price: {
        type: Number,
        required:true,
    },
    location: {
        type: String,
        required:true,
    },
    country: {
        type: String,
        required:true,
    },
    reviews: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }
      ],
      
      
});



//post middleware for findOneAndDelete
listingSchema.post('findOneAndDelete',async(listing)=>{
    if(listing.reviews){
    await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});


const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;