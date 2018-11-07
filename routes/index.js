const router = require('express').Router()

router.get('/' , (req , res)=>{
    res.render('addpost')
})
module.exports = router
