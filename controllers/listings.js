const Listing = require("../models/listing.js");

module.exports.index=async(req, res) => {
    const AllListings = await Listing.find({});
    res.render("listing/index.ejs", { AllListings });
};

module.exports.RenderNewForm=(req, res) => {
  res.render("listing/new.ejs");
}

module.exports.showListing=async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",
    populate:{path:"author"},
})
    .populate("owner");
    if(!listing){
        req.flash("error","Listing not found");
        res.redirect("/listings");

    }
    console.log(listing);
    res.render("listing/show.ejs", { listing });

};

module.exports.CreateNewListing = async (req, res, next) => {
    try {
        // Ensure that a file is uploaded
        if (!req.file) {
            req.flash("error", "No image uploaded");
            return res.redirect("/listings");
        }

        let url = req.file.path;
        let filename = req.file.filename;

        // Create a new Listing instance using req.body.listing
        const newListing = new Listing(req.body.listing);

        // Set the owner and image properties
        newListing.owner = req.user._id;
        newListing.image = { url, filename };

        // Save the new listing to the database
        await newListing.save();

        req.flash("success", "Successfully created a new listing");

        // Send the response and exit the function
        return res.redirect("/listings");
    } catch (error) {
        // Handle errors
        console.error(error);

        // Flash an error message
        req.flash("error", "An error occurred while creating a new listing");

        // Redirect to the listings page or handle the error appropriately
        return res.redirect("/listings");
        // Alternatively, you can use next(error) to pass the error to the next middleware
        // next(error);
    }
};


module.exports.Editlisting=async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing not found");
        res.redirect("/listings");

    }
    let orginalImage=listing.image.url;
    Newimgurl=orginalImage.replace("/upload","/upload/ar_1.0,c_fill,w_150")
    res.render("listing/edit.ejs", { listing ,Newimgurl});

}



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

        // Add a return statement here
        return res.redirect(`/listings/${id}`);
    } catch (error) {
        // Handle errors
        console.error(error);

        req.flash("error", "An error occurred while updating the listing");

        // Redirect to the listings page or handle the error appropriately
        return res.redirect(`/listings/${id}`);
        // Alternatively, you can use next(error) to pass the error to the next middleware
        // next(error);
    }
};


module.exports.DeleteListing = async(req, res) => {
    let { id } = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success","Listing Deleted Successfully..!"); 

    res.redirect("/listings");

}