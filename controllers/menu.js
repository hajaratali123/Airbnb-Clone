const Listing = require("../models/listing.js");
const Menu = require("../models/menu.js");

module.exports.getMenuForm = async (req, res) => {
    try {
        const listingId = req.params.id;
        console.log(listingId);
        const listing = await Listing.findById(listingId).populate('menu');
        res.render("menu/createmenu.ejs",{listing})

       
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { err: error });
    }
};

module.exports.storeMenu = async (req, res) => {
    try {
        const listingId = req.params.id;
        const { itemType, foodItems, price } = req.body.item;

        // Find the listing
        const listing = await Listing.findById(listingId);

        // Create a new menu item
        const newMenuItem = new Menu({
            itemType,
            foodItems,
            price,
        });

        // Save the menu item to the listing's menu array
        listing.menu.push(newMenuItem);

        // Save changes to the listing
        await listing.save();

        req.flash("success", "Your menu has ben added to your profile");

        res.redirect(`/listings/${listingId}`);
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { err: error });
    }
};

