//connection of cloudinary to updload or retrive images code is defined here.

//requiring dependencies
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


//using cloudinary to establish connection b/w proj and cloudinary.
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

//using multer-storage to store files in cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust2_DEV',
      allowedFormats:["png","jpg","jpeg"],
      resource_type: "auto", 
    },
  });


  
  module.exports = {cloudinary,storage};