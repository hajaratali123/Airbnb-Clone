const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.index = async (req, res) => {
    const AllListings = await Listing.find({});
    res.render("listing/index.ejs", { AllListings });
};

module.exports.RenderNewForm = (req, res) => {
    res.render("listing/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    console.log(listing)
    if (!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }
    res.render("listing/show.ejs", { listing });
};

module.exports.CreateNewListing = async (req, res, next) => {
    try {
        if (!req.file) {
            req.flash("error", "No image uploaded");
            return res.redirect("/listings");
        }
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        await newListing.save();
        req.flash("success", "Successfully created a new listing");
        return res.redirect("/listings");
    } catch (error) {
        console.error(error);
        req.flash("error", "An error occurred while creating a new listing");
        return res.redirect("/listings");
    }
};

module.exports.Editlisting = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }
    let orginalImage = listing.image.url;
    Newimgurl = orginalImage.replace("/upload", "/upload/ar_1.0,c_fill,w_150");
    res.render("listing/edit.ejs", { listing, Newimgurl });
};

module.exports.UpdateListing = async (req, res) => {
    try {
        let { id } = req.params;
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = { url, filename };
            await listing.save();
        }
        req.flash("success", "Successfully updated Listing");
        return res.redirect(`/listings/${id}`);
    } catch (error) {
        console.error(error);
        req.flash("error", "An error occurred while updating the listing");
        return res.redirect(`/listings/${id}`);
    }
};

module.exports.DeleteListing = async (req, res) => {
    let { id } = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully..!");
    res.redirect("/listings");
};

module.exports.Cottage = async (req, res) => {
    try {
        const AllListings = await Listing.find({ category: 'Cottage' });
        res.render("listing/index.ejs", { AllListings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.Residential = async (req, res) => {
    try {
        const AllListings = await Listing.find({ category: 'Residential' });
        console.log(AllListings);
        res.render("listing/index.ejs", { AllListings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.Commercial = async (req, res) => {
    try {
        const AllListings = await Listing.find({ category: 'Commercial' });
        res.render("listing/index.ejs", { AllListings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.Vacation = async (req, res) => {
    try {
        const AllListings = await Listing.find({ category: 'Vacation' });
        res.render("listing/index.ejs", { AllListings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.Apartment = async (req, res) => {
    try {
        const AllListings = await Listing.find({ category: 'Apartment' });
        res.render("listing/index.ejs", { AllListings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.Condo = async (req, res) => {
    try {
        const AllListings = await Listing.find({ category: 'Condo' });
        res.render("listing/index.ejs", { AllListings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.Townhouse = async (req, res) => {
    try {
        const AllListings = await Listing.find({ category: 'Townhouse' });
        res.render("listing/index.ejs", { AllListings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.Other = async (req, res) => {
    try {
        const AllListings = await Listing.find({ category: 'Other' });
        res.render("listing/index.ejs", { AllListings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};
module.exports.trending = async (req, res) => {
    try {
      // Find all reviews with a rating of 5 and populate the 'listing' field
      const fiveStarReviews = await Review.find({ rating: 5 }).populate("listing");
  
      // Log the populated reviews for debugging
      console.log("Populated Reviews:", fiveStarReviews);
  
      // Extract listing IDs from the populated reviews
      const listingIds = fiveStarReviews
        .filter((review) => review.listing) // Filter out reviews without a listing
        .map((review) => review.listing.toString());
  
      // Log the extracted listing IDs for debugging
      console.log("Listing IDs:", listingIds);
  
      // Find all listings with the retrieved IDs
      const trendingListings = await Listing.find({ _id: { $in: listingIds } });
  
      // Log the trending listings for debugging
      console.log("Trending Listings:", trendingListings);
  
      res.render("listing/index.ejs", { AllListings: trendingListings });
    } catch (err) {
      // Log the error for debugging
      console.error("Error in trending method:", err);
      
      res.status(500).send("Internal Server Error");
    }
  };

  module.exports.search = async (req, res) => {
    console.log(req.query.q);
    let input = req.query.q.trim().replace(/\s+/g, " ");
    console.log(input);
    if (input == "" || input == " ") {
      req.flash("error", "Search value empty !!!");
      res.redirect("/listings");
    }
  
    let data = input.split("");
    let element = "";
    let flag = false;
    for (let index = 0; index < data.length; index++) {
      if (index == 0 || flag) {
        element = element + data[index].toUpperCase();
      } else {
        element = element + data[index].toLowerCase();
      }
      flag = data[index] == " ";
    }
    console.log(element);
    // baki sab sahi ho gya ok done bye bye ok
    let AllListings = await Listing.find({
      title: { $regex: element, $options: "i" },
    });
    if (AllListings.length != 0) {
      res.locals.success = "Listings searched by Title";
      
      res.render("listing/index.ejs", { AllListings });
      return;
    }
  
    if (AllListings.length == 0) {
        AllListings = await Listing.find({
        category: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (AllListings.length != 0) {
        res.locals.success = "Listings searched by Category";
        res.render("listing/index.ejs", { AllListings });
        return;
      }
    }
    if (AllListings.length == 0) {
        AllListings = await Listing.find({
        country: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (AllListings.length != 0) {
        res.locals.success = "Listings searched by Location";
        res.render("listing/index.ejs", { AllListings });
        return;
      }
    }
  
    const intValue = parseInt(element, 10);
    const intDec = Number.isInteger(intValue);
  
    if (AllListings.length == 0 && intDec) {
        AllListings = await Listing.find({ price: { $lte: element } }).sort({
        price: 1,
      });
      if (AllListings.length != 0) {
        res.locals.success = `Listings searched for less than Rs ${element}`;
        res.render("listing/index.ejs", { AllListings });
        return;
      }
    }
    if (AllListings.length == 0) {
      req.flash("error", "Listings is not here !!!");
      res.redirect("/listings");
    }
  };
  