const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    title: {
        type : String ,
        required : true
    },
    content :{
        type: String,
        required: true
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: "User is required to add post "
    },
    commments :[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }]
})

const post = module.exports = mongoose.model('post' , postSchema)

module.exports.getComment = function (id , callback) {
    const query = {_id : id};
    post.findOne(query , callback)

}

