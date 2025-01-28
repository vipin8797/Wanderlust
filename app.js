
//Requiring dependencies
const express = require('express');
const mongoose = require('mongoose'); //mongoose for MongoDB
const path = require('path');  //Path for ejs templates
const methodOverride = require('method-override'); //method override fot put,patch,delete req
const Listing = require('./models/listing'); //Our Listing Model
engine = require('ejs-mate'); //ejsMate for boilerplate layout

//mongoose connection to DB
const DB = "wanderlust2";
async function main(){
     await mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
    }
  

//Using dependencies
const app = express();
app.use(express.urlencoded({extended:true})); //Post requers parser
app.set('views engine','ejs'); //view engine for ejs.
app.set("views",path.join(__dirname,"views")); //default folder for ejs template views.
app.use(express.static(path.join(__dirname,"public"))); //default public folder for static fiels
app.use(methodOverride('_method')); //method overide
app.engine('ejs', engine); //Using ejsMate in oure porject

//*********************** Routes start************************* */

//Roote route
app.get('/',(req,res)=>{
    res.send("server is working");
})

//index route
app.get('/listings',async(req,res)=>{
    try{
     const allListings = await Listing.find({});
     res.render('listings/index.ejs',{allListings});
    }catch(err){
        console.log(err);
    }
    })


//Get Req for new listing
app.get('/listings/new',(req,res)=>{
    res.render('listings/new.ejs');
 })   

 //post for new listing
 app.post('/listings',async(req,res)=>{
    const{listing} = req.body;
    try{
        const newListing = new Listing(listing);
       await  newListing.save();
       res.redirect('/listings');
    }catch(err){
        console.log(err);
    }
 })



 
//show route
app.get('/listings/:id',async(req,res)=>{
    const{id} = req.params;
    
    try{
     const listing = await Listing.findById(id);
     res.render('listings/show.ejs',{listing});
    }catch(err){
        console.log(err);
    }
})
   

//Get for Edit
app.get('/listings/:id/edit',async(req,res)=>{
    const {id} = req.params;
      try{
        const listing = await Listing.findById(id);
        res.render('listings/edit.ejs',{listing});
        
      }catch(err){
           console.log(err);
      }
    
})

app.put('/listings/:id',async(req,res)=>{
    const {id} = req.params;
    try{
       await Listing.findByIdAndUpdate(id,{...req.body.listing},{runValidators:true});
       res.redirect('/listings');
    }catch(err){
        console.log(err);
    }
})


//Delete Route
app.delete('/listings/:id',async(req,res)=>{
         const{id}= req.params;    
    try{
         await Listing.findByIdAndDelete(id);
         res.redirect('/listings');
        }catch(err){
            console.log(err);
        }
});
 
    







//*********************** Routes end************************* */

const port = 3000;
main().then(()=>{
    console.log(`connectd to: ${DB} DB`);
    app.listen(port,()=>{
        console.log(`listening at port ${port}`);
    })
})