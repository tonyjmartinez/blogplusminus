const mongoose = require("mongoose");
const PostSchema = require("./post");
const UserSchema = require("./user");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String
});

module.exports = CommentSchema;
