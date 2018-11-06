const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const user = require('../models/user')

passport.serializeUser(function (data, done) {
    done(null, data.username)
})

passport.deserializeUser(function (username, done) {
    user.findOne({
        username: username
    }).then((data) => {
        if (!data) {
            return done(new Error("User not Found"))
        }
        return done(null, data)
    }).catch((err) => {
        done(err)
    })
})

passport.use(new LocalStrategy(function (username, password, done) {
    user.findOne({
        username: username
    }).then((data) => {
        if (!data) {
            return done(null, false, {message: "User not found!"})
        }
        if (data.password !== password) {
            return done(null, false, {message: "Wrong password"})
        }
        return done(null, data)
    }).catch((err) => {
        return done(err)
    })
}))


module.exports = passport
