const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  dateTime: Date,
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  username: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }]
});

postSchema.statics.findPost = function(id) {
  return this.findById(id);
};

postSchema.statics.findRecent = function(skip, cb) {
  return this.find({})
    .sort({ dateTime: "desc" })
    .limit(10)
    .skip(skip)
    .exec(function(err, docs) {
      if (err) {
        console.log(err);
        cb(null);
      } else {
        console.log("found");
        cb(docs);
      }
    });
};

postSchema.statics.findComments = function(id) {
  console.log("Post ID", id);
  return this.findById(id)
    .populate("comments")
    .then(post => post.comments);
};

const ModelClass = mongoose.model("post", postSchema);
module.exports = ModelClass;
