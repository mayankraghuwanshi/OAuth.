const router = require('express').Router()
const user =  require('../models/user')
const {check} = require("express-validator/check")
const passport = require('../passport/passport')

router.get('/register' , (req , res)=>{
    res.render('register' , { success: req.session.success , errors : req.session.errors})
})

router.get('/login',(req , res)=>{
    res.render('login' ,  {success :req.session.success })
})
//-------------------------------------------------register a new user
router.post('/register', (req , res)=>{
            req.check('firstname' , "First Name Required.").notEmpty()
            req.check('lastname' , "Last Name is Required").notEmpty()
            req.check('username' , "Username is Required").notEmpty()
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
                username : req.body.username,
                email    : req.body.email,
                password : req.body.password
            })
            data.save().then((data)=>{
                console.log(data)
                res.redirect('/user/login')
            }).catch((err)=>{
                console.log("Error happend in action = user/register method = post")
                req.session.success = false
                console.log(err)
                req.session.errors = [{ msg:"Email is alredy taken"}]
                res.redirect('/user/register')
            })
    })

//----------------------------------------------------------------------------------Log in user
router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/user/login', failureFlash: true }),
    function (req, res) {
        res.redirect('/');
    });


//fetch All the user
router.get('/all',(req , res)=>{
    user.find({}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send({error:err})
    })
})



module.exports = router;
