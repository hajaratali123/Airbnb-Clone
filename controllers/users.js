const flash = require("connect-flash");
const User= require("../models/user.js");
const passport = require('passport');

module.exports.SignupUpForm=(req, res) => {
    res.render("../views/users/signup.ejs");
}

module.exports.SignUpUser = async (req, res,next) => {
    try {
        let { username, email, password } = req.body;
        console.log(username, email, password); // Log values to check
        
        let newUser = new User({ email, username });

        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (!err) {
                req.flash('success', 'Welcome to Wanderlust');
                res.redirect('/listings');      
            }
            return next(err);
        });
    } catch (e) {
        req.flash('error',e.massage);
        res.redirect('/signup');
    }
};
module.exports.userprofile=(req,res)=>{

    res.render("users/usetprofile.ejs")
}
module.exports.LoginForm=(req, res) => {
    res.render("users/login.ejs");
};

module.exports.LoginByUser=async(req, res) => {
    
    req.flash('success',  "Welcome Back to wanderlust ");
    let redirectUrl =  res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.LogOut=(req, res,next) => {
    req.logout((err)=>{
        if(!err){
            req.flash("success", "You have been logged out");
            res.redirect('/listings');
            
        }
        return   next(err);
       
    });

};

