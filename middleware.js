
//middleware to check if user is logged in or not.
module.exports.isLoggedIn  = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('warning',"You must be logged in for this!");
        return res.redirect('/user/login');
    }else{
        next();
    }
}