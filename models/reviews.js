const mongoose = require('mongoose'); //mongoose for MongoDB


const reviewSchema = new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:0,
        max:5
    },
    created_At:{
        type:Date,
        default:Date.now(),
    },
    auther:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
});

//models for reviewSchema
const Review = mongoose.model("Review",reviewSchema);


module.exports = Review;

