const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('Tag',tagSchema)

