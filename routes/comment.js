const router = require('express').Router()
const user = require('../models/user')
const post = require('../models/post')
const {check}  = require("express-validator/check")

router.post('/comment' , async (req , res)=>{
    var errors = []
    const Post = await post.findOne({_id: req.body.post})
       .catch((err)=>{
           errors.push({msg: "Invalid PostID"})
       })
    const User = await user.findOne({_id: req.body.user}).catch((err)=>{
        errors.push({msg : "Invalid UserID"})
    })
    if(errors.length!==0){
        res.render('comment' , {errors})
    }
    else{
        Post.comments.push({comment : req.body.content , _id:req.body.user , name : User.firstname})
        Post.save().then((data)=>{
            console.log("comment has been added")
            res.render('comment' , {success : "Comment has been added :)"})
        })
    }

})
module.exports = router
