const express = require('express');

const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");

const { route } = require('./listing');

const menuController = require("../controllers/menu.js")

router.route("/:id/menu").get(menuController.getMenuForm);
router.route("/:id/menu")
.post(menuController.storeMenu)


module.exports = router;