const router = require('express').Router()
const user = require('../models/user')
const post = require('../models/post')
const comment = require('../models/comment')
const {check}  = require("express-validator/check")

router.post('/comment' , async (req , res)=>{

    req.check('user' , 'User is required to add comment').isLength(24)
    req.check('content' , 'please add comment').notEmpty()
    req.check('post' , 'Post is required to comment').isLength(24)

const errors = req.validationErrors();
if(errors){
    req.session.error_comment= errors
    res.send(errors)
} else {
    const User = await user.findOne({_id:req.body.user})
    const Post = await post.findOne({_id:req.body.post})
    console.log(User)
    if(User && Post) {
        const Comment = new comment({
            user     : req.body.user,
            content  : req.body.content,
            post     : req.body.post
        })
        await Comment.save()
        if (Array.isArray(User.comments)) {
            User.comments.push(req.body);
        }
        Post.comments.push(Comment._id)
        await User.save()
        await Post.save()
        res.send(Comment)
    }
}})


module.exports = router
