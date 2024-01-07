const flash = require("connect-flash");
const User= require("../models/user.js");
const passport = require('passport');

module.exports.SignupUpForm=(req, res) => {
    res.render("../views/users/signup.ejs");
}

module.exports.SignUpUser=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        console.log(username, email, password); // Log values to check
        
        let newUser = new User({email,username});

       const RegisterUser= await User.register(newUser, password);
        console.log(RegisterUser);
        req.login(RegisterUser,(err)=>{
            if(err) {
                return next(err);
            }
            req.flash('success', 'Welcome to Wanderlust'); 
            res.redirect('/listings');

        })
        
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error during registration');
        res.redirect('/signup');
    }
};

module.exports.LoginForm=(req, res) => {
    res.render("../views/users/login.ejs");
};

module.exports.LoginByUser=async(req, res) => {

    req.flash('success', 'Welcome to wanderlust');
    let redirectUrl =  res.locals.redirectUrl ||"/listings";
    res.redirect(redirectUrl);
};

module.exports.LogOut=(req, res,next) => {
    req.logout((err)=>{
        if(err){
         return   next(err);
        }
        req.flash("success", "You have been logged out");
        res.redirect('/listings');
    });

}

