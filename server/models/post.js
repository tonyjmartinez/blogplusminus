const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  dateTime: Date,
  userId: { type: Schema.Types.ObjectId, ref: "user" }
});

const ModelClass = mongoose.model("post", postSchema);
module.exports = ModelClass;
