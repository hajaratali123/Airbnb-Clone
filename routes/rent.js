const express = require('express');

const router = express.Router({mergeParams: true});

const { route } = require('./listing');
const RentController=require("../controllers/rent");


router.route("/")
.post(RentController.rent);

module.exports = router;
