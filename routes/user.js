const router = require('express').Router()
const user =  require('../models/user')
const {check} = require("express-validator/check")

router.get('/register' , (req , res)=>{
    res.render('register')
})
router.get('/login',(req , res)=>{
    res.render('login')
})
router.post('/register' ,[
    check('firstname').isLength({ min: 3 }),
    check('lastname').isLength({ min: 3 }),
    check('email').isEmail(),
    check('password').isInt()
], (req , res)=>{
    var data = new user({
        firstname: req.body.firstname,
        lastname : req.body.lastname,
        email    : req.body.email,
        password : req.body.password
    })
    var msg
    data.save().then((data)=>{
        res.send(data)
    }).catch((err)=>{

        res.send(err.error)
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
