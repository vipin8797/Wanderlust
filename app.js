
//Requiring dependencies
const express = require('express');
const mongoose = require('mongoose'); //mongoose for MongoDB
const path = require('path');  //Path for ejs templates
const methodOverride = require('method-override'); //method override fot put,patch,delete req
const Listing = require('./models/listing'); //Our Listing Model
engine = require('ejs-mate'); //ejsMate for boilerplate layout
const ExpressError = require('./utils/ExpressError'); //ExpressError for custom Error class
const wrapAsync = require('./utils/wrapAsync'); //wrapAsync for default erro handling minddleware
const {listingJoiSchema, reviewJoiSchema} = require('./joiSchema');// listingJoiSchema for joi validation.
const Review = require('./models/reviews'); //Review model
const listingRoutes = require('./routes/listingRoutes');//listings routes
const reviewRoutes = require('./routes/reviewRoutes'); //reviews routes
const session = require('express-session'); //express sessions for authentication and flash-messages.




//mongoose connection to DB
const DB = "wanderlust2";
async function main() {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
}


//Using dependencies
const app = express();
app.use(express.urlencoded({ extended: true })); //Post requers parser
app.set('views engine', 'ejs'); //view engine for ejs.
app.set("views", path.join(__dirname, "views")); //default folder for ejs template views.
app.use(express.static(path.join(__dirname, "public"))); //default public folder for static fiels
app.use(methodOverride('_method')); //method overide
app.engine('ejs', engine); //Using ejsMate in oure porject
//using Express-Sessions
app.use(session({
    secret:"secrete",
    resave:false, //agli request me koi change ni hai to cookie data save mat karo
    saveUninitialized:true,
    cookie:{secure:false},
}));





//********************************** Routes **************************
//********************************** Routes **************************

//Roote route
app.get('/', (req, res) => {
    res.send("server is working");
})

 //Listings Route
 app.use('/listings',listingRoutes); 
 //Reviews Routes
 app.use('/listings/:id/reviews',reviewRoutes);

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
    
    //console.log(err);
});





//sever staring code.
const port = 3000;
main().then(() => {
    console.log(`connectd to: ${DB} DB`);
    app.listen(port, () => {
        console.log(`listening at port ${port}`);
    })
})