const express = require('express');
const router = express.Router();



//Post Routes
router.get('/',(req,res)=>{
    res.send('Get for posts');
});

router.get('/:id',(req,res)=>{
    res.send("Get for post's Id ");
});

router.post('/',(req,res)=>{
    res.send("Post for post");
});

router.delete('/',(req,res)=>{
    res.send("Delete for post");
})


module.exports = router;