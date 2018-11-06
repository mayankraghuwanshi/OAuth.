const express = require('express')
const server = express()
const mongo = require('mongodb')
const mongoose = require('mongoose')
const hbs = require('express-handlebars')
const expressValidator = require('express-validator')
cosnt session = require('express-session')
mongoose.connect("mongodb://localhost/auth")

//setting up parser
server.use(express.json())
server.use(express.urlencoded({
    extended: true
}))
server.use(expressValidator())

//settin up viwe engine
server.engine('hbs', hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/"
}))
server.set('views' ,  __dirname + '/views')
server.set('view engine' , 'hbs')


server.get('/',(req , res , next)=>{
    res.render('index' , {title: "home"})
})

server.use('/user', require('./routes/user'))

server.listen(1221,function () {
    console.log('http://localhost:1221/user/login\nhttp://localhost:1221/user/register')
})
