const router = require('express').Router()
const post = require('../models/post')
const comment = require('../models/comment')
const user = require('../models/user')

router.post('/add/', async (req , res)=>{
       const data  = new post({
           title   : req.body.title,
           content : req.body.content,
           user    : req.body.user
       })
    //Await added so that we can avoid pendint promise
    const Post = await data.save()
    const User = await user.findOne({_id: Post.user})
          User.posts.push(Post._id)
          await User.save();
       res.send(Post)
})
router.use('/comment', require("./comment") )

module.exports = router
