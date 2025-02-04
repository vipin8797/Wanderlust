
//This file and classroom Dir is to practice Express Router and Cookies



const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')

const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');


app.use(cookieParser("secretecode"));

app.use('/users',usersRoute);
app.use('/posts',postsRoute);

//cookies route
app.get('/getcookie',(req,res)=>{
    res.cookie("greet","Hello");
    res.cookie("madeIn","India");
    res.cookie("greet","Namaste");
    res.send("cookies are stored in browser");
});

app.get("/showcookie",(req,res)=>{
    const{name = 'anonymouse'} = req.cookies;
    console.log(req.cookies);
    res.send(`Hi ${name}`);
})


//setSigned cookie
app.get('/setSignedCookie',(req,res)=>{
    res.cookie("country","india",{signed:true});
    res.send('signed cookies are set');
})
//getsigned cookie
app.get('/getSignedCookie',(req,res)=>{
    console.log(req.signedCookies);
    res.send('Got signed cookies');

})




const port = 8080;
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})