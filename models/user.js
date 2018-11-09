const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },

    username: {
        type:String,
        unique:true,
        required:true
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default : Date.now()
    }
    ,
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'post',
    }]

})

const user = module.exports = mongoose.model('user', userSchema);


module.exports.finduserbyEmail = function(email , callback){
    const query = {email : email}
    user.findOne(query , callback)
}
