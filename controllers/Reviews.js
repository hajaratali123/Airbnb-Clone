const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {reviewSchema} = require("../schema.js");
const Rent= require("../models/Rent.js");
module.exports.CreateReview = async(req, res) =>{
    let listing = await Listing.findById(req.params.id);
    let NewREview = new Review(req.body.review);
    NewREview.author=req.user._id;
    console.log(NewREview);
    listing.reviews.push(NewREview);
    await NewREview.save();
    await listing.save();
    req.flash("success","Successfully New Review saved");


    res.redirect(`/listings/${listing.id}`)
    
};

module.exports.DeleteReview = async(req, res, next) => {
    let {id, reviewId}=req.params;


    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");

    res.redirect(`/listings/${id}`);


};

