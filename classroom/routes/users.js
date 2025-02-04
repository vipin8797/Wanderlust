const express = require("express");
const router = express.Router();







//Users Route
router.get('/',(req,res)=>{
    res.send('Get for users');
});

router.get("/:id",(req,res)=>{
    res.send("Get for user's Id");
});


router.post('/',(req,res)=>{
    res.send("Post for users");
});

router.delete("/",(req,res)=>{
    res.send('delete for users');
})


module.exports = router;