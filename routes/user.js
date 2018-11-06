const router = require('express').Router()
const user =  require('../models/user')

router.get('/register' , (req , res)=>{
    res.render('register')
})
router.get('/login',(req , res)=>{
    res.render('login')
})
router.post('/register' , (req , res)=>{
    var data = new user({
        firstname: req.body.firstname,
        lastname : req.body.lastname,
        email    : req.body.email,
        password : req.body.password
    })
    data.save().then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err.errmsg)
    })

})

router.get('/all',(req , res)=>{
    user.find({}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send({error:err})
    })
})



module.exports = router;
