
//Requiring dependencies
const express = require('express');
const mongoose = require('mongoose'); //mongoose for MongoDB
const path = require('path');  //Path for ejs templates
const methodOverride = require('method-override'); //method override fot put,patch,delete req
const Listing = require('./models/listing'); //Our Listing Model
engine = require('ejs-mate'); //ejsMate for boilerplate layout
const ExpressError = require('./utils/ExpressError'); //ExpressError for custom Error class
const wrapAsync = require('./utils/wrapAsync'); //wrapAsync for default erro handling minddleware
const {listingJoiSchema} = require('./joiSchema');

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

//*********************** Routes start************************* */


//joi validation middleware
const joiValidate = (req, res, next) => {
    // Validating Joi Schema
    const { error } = listingJoiSchema.validate(req.body, { abortEarly: false });
    if (error) {
        // Extracting error messages properly
        let errMsg = error.details.map(el => el.message).join(", ");
        return next(new ExpressError(404, errMsg)); // Use `return` to prevent further execution
    }
    next();
};

    



//Roote route
app.get('/', (req, res) => {
    res.send("server is working");
})

//index route
app.get('/listings', wrapAsync(async (req, res) => {
    
        const allListings = await Listing.find({});
        res.render('listings/index.ejs', { allListings });
    
}));


//Get Req for new listing
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
})

//post for new listing
app.post('/listings',joiValidate, wrapAsync(async (req, res,next) => {
   const { listing } = req.body;
    const newListing = new Listing(listing);
        await newListing.save();
        res.redirect('/listings');
   
}))




//show route
app.get('/listings/:id',wrapAsync(async (req, res) => {
    const { id } = req.params;

        const listing = await Listing.findById(id);
        res.render('listings/show.ejs', { listing });
    
}));


//Get for Edit
app.get('/listings/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
}));




app.put('/listings/:id',joiValidate, wrapAsync(async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
    res.redirect('/listings');

}));


//Delete Route
app.delete('/listings/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');

}));


//invalid route path
app.all('*',(req,res,next)=>{
    next(new ExpressError(404,'Page not found'));
})


// Default Error Handling Middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
  //to print error in console.  
    // console.error("Error Message:", err.message);
    // console.error("Error Type:", err.name);
    // console.log("App is not crashed..");
    // Render error.ejs and pass error details
    res.status(status).render("listings/error.ejs", { status, message });
});





//*********************** Routes end************************* */

const port = 3000;
main().then(() => {
    console.log(`connectd to: ${DB} DB`);
    app.listen(port, () => {
        console.log(`listening at port ${port}`);
    })
})