//Thi file is to practice Express-Sessions


const express = require("express");
const app = express();
const session = require('express-session');
const flash = require('connect-flash');


//using Express-Sessions
app.use(session({
    secret:"secrete",
    resave:false, //agli request me koi change ni hai to cookie data save mat karo
    saveUninitialized:true,
    cookie:{secure:false},

}));
app.use(flash());



//global flash middleware
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// //Session Test Route.
// app.get('/test/:id',(req,res)=>{
    
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1; 
//     }
//     res.send(`your req counte is ${req.session.count}`);
// })

app.get('/text/register',( req,res)=>{
    const{name = 'unknown'} = req.query;
    req.session.name = name;
    if(req.session.name == 'unknown'){
        req.flash('error','user not registered');
    }else{
        req.flash('success',"user registered successfully");
    }
    
    res.redirect('/text/logined');
})

app.get("/text/logined",(req,res)=>{
    res.send(`Welcome: ${req.session.name} and flash msg is: ${res.locals.success} and error: ${res.locals.error}`);
})



const port = 8080;
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})