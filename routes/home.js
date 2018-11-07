const router = require('express').Router()
router.get('/' , (req, res)=>{
   res.redirect('/post/add')

})
module.exports = router
