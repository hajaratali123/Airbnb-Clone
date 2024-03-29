if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
};


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/Expreeerror.js");
// const { constants } = require("buffer");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User= require("./models/user.js");


const listingsRouter= require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const Listing = require("./models/listing.js");
const RentRouter= require("./routes/rent.js");
const menuRoutes = require('./routes/memu.js');

const profileRouter = require('./routes/user.js');
const { error } = require('console');


const dbUrl=process.env.ATLASDB_URL;
main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err)

});
async function main() {
    await mongoose.connect(dbUrl);
};
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
      },
    touchAfter: 24*3600,
});
store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE",err);

});

const sessionOptions ={
    store,
    secret :process.env.SECRET,
    resave :false,
    saveUninitialized : true,
    cookie :{
        expires :Date.now()+7*24*60 *1000,
        maxAge:7*24*60*60*1000,
        httpOnly :true,

    }
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));




app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});


app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/listings/:id/rents",RentRouter);
app.use('/listings/', menuRoutes);
app.use('/user', profileRouter);
app.use("/",userRouter);




app.use((err, req, res,next) => {
    let {statusCode=500,message="some error"} = err;
    res.status(statusCode).render("error.ejs",{err});
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log("listening to port 8080");
});



app.get("/",(req, res) => {
    res.send("Welcome to my website");
  });

  


  app.all("*", (req, res,next) => {
    next(new ExpressError(404,"page not found"));
}
);