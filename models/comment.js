const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : "User is required to add comment."
    },
    content :{
        type: String,
        required: "Comment content is required."
    },
    post :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: "Post is required to add comment to it."
    }

})
module.exports = mongoose.model('comment' , commentSchema)
