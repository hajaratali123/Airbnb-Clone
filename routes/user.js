const express = require('express');
const router = express.Router();
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const passport = require('passport');
const flash = require("connect-flash");
const wrapAsync = require('../utils/wrapAsync.js');
const User = require("../models/user.js");
const { saveRedirectUrl } = require('../middleware.js');
const Menu = require('../models/menu');

const UserController = require("../controllers/users.js");

// Render Signup form and create a new User by Signup
router.route("/signup")
  .get(wrapAsync(UserController.SignupUpForm))
  .post(wrapAsync(UserController.SignUpUser));


// Login Form and login by user
router.route("/login")
  .get(wrapAsync(UserController.LoginForm))
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: '/login',
      failureFlash: true
    }), 
    UserController.LoginByUser
    
  );



  router.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const userId = req.user._id;

        const currentUser = await User.findById(userId)
            .populate({
                path: 'rents',
                populate: {
                    path: 'listing',
                },
            })
            .populate('menu')
            .exec();  // Add this line to execute the population

        console.log(currentUser);

        res.render('users/UserProfile.ejs', { currentUser });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { err: error });
    }
});



// Logout user
router.get("/logout", UserController.LogOut);

module.exports = router;