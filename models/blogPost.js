const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bloggerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true
  },
  lastModifiedDate:{
    type:Date,
    required:true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  tags: [
    {
      type: String,
      required: true
    },
  ]
});

module.exports = mongoose.model("BlogPost", bloggerSchema);
