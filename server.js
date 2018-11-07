const express          = require('express')
const server           = express()
const path             = require('path')
const dotenv           = require('dotenv').config()
const mongo            = require('mongodb')
const mongoose         = require('mongoose')
const hbs              = require('express-handlebars')
const expressValidator = require('express-validator')
const session          = require('express-session')
const passport         = require('passport')
const passportLocal    = require('passport-local').Strategy;
const flash            = require('connect-flash')

//.......................................................connected to online mongoDB server mlab
mongoose.connect(`mongodb://${process.env.MUSER}:${process.env.MPASS}@ds253203.mlab.com:53203/auth`)

//........................................................setting up parser

server.use(express.json())
server.use(express.urlencoded({
    extended: true
}))


//.........................................................to validate eg- isEmail()
server.use(expressValidator())


//.........................................................settin up viwe engine
server.engine('hbs', hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/"
}))
server.set('views' ,  __dirname + '/views')
server.set('view engine' , 'hbs')

//..........................................................to use session and send messages through session
server.use(session({
    secret: process.env.SECRET , saveUninitialized: false , resave:false
}))

//.........................................................passport init
server.use(passport.initialize());
server.use(passport.session());

//..........................................................flash
server.use(flash())
//.........................................................set some messages for flash to show
server.use(function (req, res, next) {
    res.locals.error = req.flash('error');
    res.locals.success_msg = req.flash('success_msg');
    res.locals.user = req.user || null;
    next();
});


server.use(express.static(path.join(__dirname , 'public')))



function Logcheck(req , res ,next) {
    if(!req.isAuthenticated()){
        res.render("login" , {error: "Please Login first"})
    }
    else{
    next()}
}

server.get('/',Logcheck,require('./routes/home'))
//------------------------------------------------------------------------user
server.use('/user', require('./routes/user'))
//-------------------------------------------------------------------------post
server.use('/post' , require('./routes/post'))


server.listen( process.env.PORT ,function () {
    console.log('http://localhost:1221/home')
})
