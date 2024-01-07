const express = require('express');

const router = express.Router({mergeParams: true}); 
const wrapAsync = require("../utils/wrapAsync.js");

const {reviewSchema} = require("../schema.js");

const {validateReview,isLoggedIn,isReviewAuthor}= require("../middleware.js");
const ReviewController=require("../controllers/Reviews.js");
//  reviews Route
router.post('/',isLoggedIn,validateReview, wrapAsync(ReviewController.CreateReview));

// Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(ReviewController.DeleteReview));

module.exports =  router;