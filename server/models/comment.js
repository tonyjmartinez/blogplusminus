const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  postId: { type: Schema.Types.ObjectId, ref: "post" },
  datetime: Date,
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  username: String,
  parentId: { type: Schema.Types.ObjectId},
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }]
});

commentSchema.statics.findComments = function(id) {
  return this.findById(id)
    .populate("comments")
    .then(comment => comment.comments);
};

const modelClass = mongoose.model("comment", commentSchema);
module.exports = modelClass;
