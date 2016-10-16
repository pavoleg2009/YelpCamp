var mongoose = require("mongoose");

//comment

var commentSchema = {
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String}
};

module.exports = mongoose.model("Comment", commentSchema);