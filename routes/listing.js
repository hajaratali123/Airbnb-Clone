const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingController= require("../controllers/listings.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({storage })
const {reviewSchema} = require("../schema.js");

router.route("/")
.get(wrapAsync(listingController.index))// index Route, Create New Listing
.post(isLoggedIn,
    upload.single("listing[image]",
    validateListing),
     wrapAsync(listingController.CreateNewListing));





// new Route
router.get("/new", isLoggedIn,wrapAsync(listingController.RenderNewForm));
router.get("/search", listingController.search);
router.get("/Cottage",listingController.Cottage);
router.get("/Residential",listingController.Residential);
router.get("/Commercial",listingController.Commercial);
router.get("/Vacation",listingController.Vacation);
router.get("/Apartment",listingController.Apartment);
router.get("/Condo",listingController.Condo);
router.get("/Townhouse",listingController.Townhouse);
router.get("/Other",listingController.Other);
router.get("/trending",listingController.trending);


// Read oparation Show Route
// Update Route
// Delete Route
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,wrapAsync(listingController.UpdateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.DeleteListing));



// Edit LIsting 
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.Editlisting));






module.exports = router;