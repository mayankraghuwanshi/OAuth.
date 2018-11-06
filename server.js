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


server.use(express.static(path.join(__dirname , 'public')))

server.get('/',(req , res , next)=>{
    res.render('index' , {title: "home"})
})

server.use('/user', require('./routes/user'))

server.listen( process.env.PORT ,function () {
    console.log('http://localhost:1221/user/login\nhttp://localhost:1221/user/register')
})
