//Requiring dependencies.
const {data} = require('./data');
const mongoose = require('mongoose'); //mongoose for MongoDB
const Listing = require('../models/listing');

//mongoose connection to DB
const DB = "wanderlust2";
async function main(){
     await mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
    }
  

//fucntion to initialize data in db
 const initDB = async()=>{
    try{
       await  Listing.deleteMany({});
       console.log("data deleted..");
       const updatedData = data.map((obj) => ({
        ...obj,
        owner: '67a5f64dd245e169b4670dd4'
    })); //adding owner in each listing.
       await Listing.insertMany(updatedData);
       
       console.log("data initialized...");
    }catch(err){
        console.log(err);
    }
    }





main().then((res)=>{
    console.log(`connted:${DB} DB`);
    initDB();
}).catch((err)=>{
    console.log(err);
})
    

