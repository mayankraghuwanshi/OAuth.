const router = require('express').Router()
const user = require('../models/user')
const post = require('../models/post')
const comment = require('../models/comment')
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
        const Comment = new comment({
            content : req.body.content,
            user : req.body.user,
            post : req.body.post
        })
        await Comment.save().catch((err)=>{
            res.render('comment' , errors = [{msg: "Can't save comment :( "}])
        })
        console.log(Post)
        Post.commments.push(Comment._id)
        Post.save().then((data)=>{
            res.render('comment' , {success : "Comment has been added :)"})
        })



    }

})


module.exports = router
