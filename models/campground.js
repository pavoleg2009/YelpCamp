
var mongoose    = require("mongoose");
// ERROR IN THE NEXT LINE
//var Comment = require("./models/comment");

//SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String}  
});

module.exports = mongoose.model("Campground", campgroundSchema);