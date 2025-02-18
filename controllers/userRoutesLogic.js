const User = require('../models/user');


module.exports.signupGetRoute = (req,res,next)=>{
    res.render('users/signup.ejs');
 };


module.exports.signupPostRoute = async(req,res,next)=>{
    // console.log("getting request");
    try{
        const{username,email,password} = req.body;
        const newUser = await new User({email,username});
        const registerdUser = await User.register(newUser,password);
        req.login(registerdUser,(err)=>{ //login after signup.
            if(err) return next(err);
            req.flash('success',`Welcome "${username}"`);
            res.redirect('/listings')
        });
        // console.log(registerdUser); 
    }catch(err){
        req.flash('warning',err.message);
        res.redirect('/user/signUp');
    }
};



module.exports.loginGetRoute = (req,res,next)=>{
    res.render('users/login.ejs');
 };



 module.exports.loginPostRoute = async (req, res, next) => {
    req.flash('success', `Welcome back!`);  // Flash success message
   const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);              // Redirect to listings page on successful login
};


module.exports.logoutGetRoute = async (req, res, next) => {
    req.logout(err => {
        if (err) return next(err); // Handle logout error
        req.flash('success', "Logged Out successfully."); // Set flash message
        res.redirect('/listings'); // Redirect after logout
    });
};