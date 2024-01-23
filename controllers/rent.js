const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {reviewSchema} = require("../schema.js");
const Rent= require("../models/Rent.js");
module.exports.rent = async (req, res, next) => {
    try {
        // Fetch the listing
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            req.flash('error', 'Listing not found');
            return res.redirect('/'); // Or handle accordingly
        }

        // Create a new Rent instance
        const { startDate, endDate } = req.body;
        const rental = new Rent({
            startDate,
            endDate,
        });

        // Save the rental
        await rental.save();

        // Ensure that the rents array is initialized in the listing
        listing.rents = listing.rents || [];

        // Push the rental into the rents array of the listing
        listing.rents.push(rental);

        // Save the changes to the listing
        await listing.save();

        req.flash('success', 'Successfully rented the listing!');
        res.redirect(`/listings/${listing.id}`);
    } catch (error) {
        console.error(error);
        next(new ExpressError(500, 'Internal Server Error'));
    }
};
