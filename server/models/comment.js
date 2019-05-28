const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  postId: { type: Schema.Types.ObjectId, ref: "post" },
  datetime: Date,
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  username: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }]
});

const modelClass = mongoose.model("comment", commentSchema);
module.exports = modelClass;
