const router = require('express').Router()
const post = require('../models/post')
const comment = require('../models/comment')
const user = require('../models/user')
const {check}  = require("express-validator/check")

router.get('/add' , (req , res)=>{
    res.render('index' , { error : req.session.error_post })
})

router.post('/add', async (req , res)=>{
    req.check('title' , "Title is Required.").notEmpty()
    req.check('content' , "Content is Required").notEmpty()
    req.check('user' , "User is Required").notEmpty()
    var errors = req.validationErrors();
    if(errors){
        req.session.error_post = errors;
        res.redirect("/post/add")
    }else{
        const Post = new post({
        title : req.body.title,
        content: req.body.content,
        user : req.body.user
    })
        await Post.save()
        const User = await user.findOne({_id:req.body.user});
        User.posts.push(Post._it)
        await User.save()
        req.flash('success_msg' , "Post hase been recorded.")
        res.redirect('/post/add')
    }

})
router.use('/comment', require("./comment") )

module.exports = router
