
//middleware to check if user is logged in or not.
module.exports.isLoggedIn  = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; //url user was accessin befor login saved in session
                                                   //but session is reset when user logge in then store in in res.locals wtih middlewaer 
        req.flash('warning',"You must be logged in for this!");
        return res.redirect('/user/login');
    }else{
        next();
    }
}


//middleware to store redirectUrl in res.locals
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    
    }
    next()
}