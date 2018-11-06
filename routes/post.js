const router = require('express').Router()
const post = require('../models/post')

router.get('/show', (req , res)=>{
    post.find({}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })

})

router.post('/add' , (req , res)=>{
    var data  = new post({
        title    : req.body.title,
        content  : req.body.content,
        author   : req.body.author,

    })
    data.save().then((data)=>{
            res.send(data)
             }).catch((err)=>{
            res.send(err)
    })

})

module.exports = router
