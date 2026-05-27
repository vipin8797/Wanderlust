if(process.env.NODE_ENV != 'production'){ // to store cloud credentials.
    require('dotenv').config();
}


// Requiring dependencies
const express = require('express');
const mongoose = require('mongoose'); // mongoose for MongoDB
const path = require('path');  // Path for EJS templates
const methodOverride = require('method-override'); // method-override for PUT, PATCH, and DELETE requests
const Listing = require('./models/listing'); // Listing Model
const engine = require('ejs-mate'); // ejs-mate for boilerplate layout
const ExpressError = require('./utils/ExpressError'); // ExpressError custom class
const wrapAsync = require('./utils/wrapAsync'); // wrapAsync utility for async error handling
const { listingJoiSchema, reviewJoiSchema } = require('./joiSchema'); // Joi schemas validation
const Review = require('./models/reviews'); // Review model
const listingRoutes = require('./routes/listingRoutes'); // Listings routes
const reviewRoutes = require('./routes/reviewRoutes'); // Reviews routes
const session = require('express-session'); // express-session for auth and flash alerts
const MongoStore = require('connect-mongo'); // connect-mongo to store sessions in MongoDB Atlas
const flash = require('connect-flash'); // connect-flash for temporary notification messages

const passport = require('passport'); // passport for authentication
const LocalStrategy = require('passport-local'); // passport-local strategy
const User = require('./models/user'); // User Model with passport integration
const userRoutes = require('./routes/userRoutes'); // User authentication routes

//mongoose connection to DB
const DB = "wanderlust2";
async function main() {
    try{
        await mongoose.connect(`${process.env.mongoDbAtlas_url}`);

    }catch(err){
        console.log("MongoDB connection failure..");
        console.log(err);
    }
}


//*****************Using dependencies
const app = express();
app.use(express.urlencoded({ extended: true })); //Post requers parser
app.set('views engine', 'ejs'); //view engine for ejs.
app.set("views", path.join(__dirname, "views")); //default folder for ejs template views.
app.use(express.static(path.join(__dirname, "public"))); //default public folder for static fiels
app.use(methodOverride('_method')); //method overide
app.engine('ejs', engine); //Using ejsMate in oure porject
//using connect-mongo to store sessions data on mongoAtlas
const store = MongoStore.create({
    mongoUrl:process.env.mongoDbAtlas_url,
    crypto:{
        secret:process.env.SECRET,
        touchAfter:24*3600,
    }
})
store.on("error",()=>{console.log("error in sessions",err)}); //getting error for sessions.
//using Express-Sessions
app.use(session({
    store,
    secret: process.env.SECRET,
    resave: false,            // No need to save session if no change
    saveUninitialized: true,  // Save session even if it's new (but not modified)
    cookie: {
        secure: false,        // for localhost, true for HTTPS
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,  // Expiry time (7 days)
        maxAge: 7 * 24 * 60 * 60 * 1000,  // Session max age (7 days)
        httpOnly: true,       // Can't be accessed via JavaScript (prevents XSS attacks)
    },
}));
app.use(flash()); //using connect-flash after sessions.
//*****************Using dependencies



app.use(passport.initialize()); //using passport
app.use(passport.session()); //using sessions for passport.
passport.use(new LocalStrategy(User.authenticate())); //using passport-local for local stategy  with authenicate function of UserSchema.
                                                 // saare new use authenticate ho local-strategy se using authenticate() ;
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Flash global middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.warning = req.flash('warning');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user || null; //currUser info to use in navbar to display login/signup/logout
     next();
});

// //middleware to check session data on every request.
// app.use((req, res, next) => {
//     console.log("SESSION DATA:", req.session);
//     console.log("USER DATA:", req.user);
//     next();
// });


//********************************** Routes **************************
//********************************** Routes **************************


 //Listings Route
 app.use('/listings',listingRoutes); 
 //Reviews Routes
 app.use('/listings/:id/reviews',reviewRoutes);
//User Route
app.use('/user',userRoutes);

 //invalid route path
app.all('*',(req,res,next)=>{
    next(new ExpressError(404,'Page not found'));
})


 //********************************** Routes **************************
 //********************************** Routes **************************

  






// Default Error Handling Middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
  //to print error in console.  
    // console.error("Error Message:", err.message);
    // console.error("Error Type:", err.name);
    // console.log("App is not crashed..");
    // Render error.ejs and pass error details
    res.status(status).render("listings/error.ejs", { status, message });
    
    // console.log(err);
});





//sever staring code.
const port = 3000;
main().then(() => {
    console.log(`connectd to: ${DB} DB`);
    app.listen(port, () => {
        console.log(`listening at port ${port}`);
        
        
    })
})
