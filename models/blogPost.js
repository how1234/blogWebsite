const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bloggerSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model('BlogPost',bloggerSchema)

