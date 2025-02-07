const mongoose = require('mongoose'); //mongoose for MongoDB
const passportLocalMongoose = require('passport-local-mongoose'); // Import passport-local-mongoose



//User Schema
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true,
    },
});

//using pasport-local-mongoose as plugin for automatic
//adding usernam,password in schema and hashing for passwrod.
//default func bhi add karega like ,authentica, setpassword,changepassword etc.
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema);


module.exports = User;