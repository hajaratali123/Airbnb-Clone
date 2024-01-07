const express = require('express');
const router = express.Router();

const passport = require('passport');
const flash = require("connect-flash");
const wrapAsync = require('../utils/wrapAsync.js');
const User= require("../models/user.js");
const { saveRedirectUrl } = require('../middleware.js');

const UserController = require("../controllers/users.js")
// Render Signup from
// Create a new User bt Signup
router.route("/signup")
.get(wrapAsync(UserController.SignupUpForm))
.post(wrapAsync(UserController.SignUpUser));


// Login Form
// login by user
router.route("/login")
.get(wrapAsync(UserController.LoginForm))
.post(
saveRedirectUrl,
passport.authenticate("local",{
     failureRedirect: '/login',
     failureFlash:true }),wrapAsync(UserController.LoginByUser)
);
// Logout user
router.get("/logout",UserController.LogOut );

module.exports = router;




        


