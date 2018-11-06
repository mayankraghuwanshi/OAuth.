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
    author: String,
    comments :[{
        comment:{
            type: String,

        },
        commentor : {
            type : String,
        }
    }
    ]

})

const post = module.exports = mongoose.model('post' , postSchema)
module.exports.getComment = function (id , callback) {
    const query = {_id : id};
    post.findOne(query , callback)

}
