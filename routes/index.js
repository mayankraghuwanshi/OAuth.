const router = require('express').Router()

router.get('/status' , (req , res)=>{
    res.render('post')
})



router.get('/home' , (req, res)=>{
   res.redirect('/post/add')

})

module.exports = router
