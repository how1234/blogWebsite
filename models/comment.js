const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userName:{
      type:String,
      required:true
  },

  createdDate: {
    type: Date,
    required: true
  },
  text:{
    type:Date,
    required:true
  },
  relatedPost:{
    type: Schema.Types.ObjectId,
    ref: "BlogPost"
  },
  repliedComment:[
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
  ]
});

module.exports = mongoose.model("Comment", bloggerSchema);
