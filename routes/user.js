const router   = require('express').Router()
const user     =  require('../models/user')
const {check}  = require("express-validator/check")
const passport = require('../passport/passport')

router.get('/register' , (req , res)=>{
    res.render('Register' , { success: req.session.success_register , errors : req.session.errors_register})
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
                req.session.errors_register = errors;
                req.session.success_register = false;
                res.redirect("/user/register")
            }
            else{
                req.session.success_register= true
            }


            var data = new user({
                firstname: req.body.firstname,
                lastname : req.body.lastname,
                username : req.body.username,
                email    : req.body.email,
                password : req.body.password
            })
            data.save().then((data)=>{
                req.flash('success_msg', 'Now you can login');
                res.redirect('/user/login')
            }).catch((err)=>{
                req.session.success_register = false
                console.log(err)
                req.session.errors_register = [{ msg:"Email is alredy taken"}]
                res.redirect('/user/register')
            })
    })

//----------------------------------------------------------------------------------Log in user

router.get('/login',(req , res)=>{
    res.render('login' , { error: req.session.error_login})
})

router.post('/login',
    passport.authenticate('local', { successRedirect: '/post/add', failureRedirect: '/user/login', failureFlash: true })

);

//--------------------------------------------------------------------------------------Log out
router.get('/logout', function (req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/user/login');
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
