//Requiring Dependencies
const express = require('express');
const router = express.Router({mergeParams:true});
const User = require('../models/user'); //user Model.
const methodOverride = require('method-override'); //method override fot put,patch,delete req
const ExpressError = require("../utils/ExpressError"); //ExpressError for custom Error class
const wrapAsync = require('../utils/wrapAsync'); //wrapAsync for default erro handling minddleware
const passport = require('passport'); //passport for authentication while login.
const{isLoggedIn,saveRedirectUrl} = require('../middleware');// isLoggedIn middl to check if user is loggedin or not
router.use(methodOverride('_method')); //method overide
//user Routes Logics
const {signupGetRoute,signupPostRoute,
      loginGetRoute,loginPostRoute,logoutGetRoute} = require('../controllers/userRoutesLogic');





router.route('/signUp')
.get(signupGetRoute) //get for signup
.post(wrapAsync(signupPostRoute)); //post for signup


router.route('/login')
.get(loginGetRoute) //get for login
.post(saveRedirectUrl,
        passport.authenticate('local', {   // Passport's local strategy
            failureRedirect: '/user/login',      // Redirect to login page on failure
            failureFlash: true,             // Flash failure message
        }),loginPostRoute) //post for login


router.route('/logout')
.get(isLoggedIn, logoutGetRoute); //get logout





// //signUp get req
//  router.get('/signUp',signupGetRoute);

//  //post for user
//  router.post('/signUp',wrapAsync(signupPostRoute));




//  //get for login
//  router.get('/login',loginGetRoute)

// //post for login
// router.post('/login',saveRedirectUrl,
//     passport.authenticate('local', {   // Passport's local strategy
//         failureRedirect: '/user/login',      // Redirect to login page on failure
//         failureFlash: true,             // Flash failure message
//     }),
//     loginPostRoute
// );



// router.get('/logout', isLoggedIn, logoutGetRoute);

module.exports = router;