const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./post.js");
const CommentSchema = require("./comment");

const postSchema = new Schema({
  title: String,
  content: String,
  date: Date,
  userId: { type: Schema.Types.ObjectId, ref: "user" }
});

const ModelClass = mongoose.model("post", postSchema);
module.exports = ModelClass;
