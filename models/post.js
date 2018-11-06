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
    comments :[{
        comment:{
            type: String,

        },
        author : {
            type : String,
        }
    }
    ]
})

const post = modile.exports = mongoose.model('post' , postSchema)
module.exports.getComment = function (id , callback) {
    const query = {_id : id};
    post.findOne(query , callback)

}
