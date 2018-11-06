const router = require('express').Router()
const user =  require('../models/user')
const {check} = require("express-validator/check")

router.get('/register' , (req , res)=>{
    res.render('register' , { success: req.session.success , errors : req.session.errors})
})

router.get('/login',(req , res)=>{
    res.render('login')
})

router.post('/register', (req , res)=>{
            req.check('firstname' , "First Name Required.").notEmpty()
            req.check('lastname' , "Last Name is Required").notEmpty()
            req.checkBody('email', 'Enter valid Email').isEmail();
            req.check('password' , "Please Enter a Valid Password").isLength({min:4})
            var errors = req.validationErrors();
            if(errors){
                req.session.errors = errors;
                req.session.success = false;
                res.redirect("/user/register")
            }
            else{
                req.session.success= true
            }


            var data = new user({
                firstname: req.body.firstname,
                lastname : req.body.lastname,
                email    : req.body.email,
                password : req.body.password
            })
            data.save().then((data)=>{
                console.log(data)
            }).catch((err)=>{
                console.error(err)
            })
            res.redirect('/user/register')


    })



//fetch All the user
router.get('/all',(req , res)=>{
    user.find({}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send({error:err})
    })
})



module.exports = router;
