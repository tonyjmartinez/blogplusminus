const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  dateTime: Date,
  userId: { type: Schema.Types.ObjectId, ref: "user" }
});

postSchema.statics.findPost = function(id) {
  return this.findById(id);
};

postSchema.statics.findRecent = function(skip, cb) {
  return this.find({})
    .sort({ dateTime: "desc" })
    .limit(5)
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

const ModelClass = mongoose.model("post", postSchema);
module.exports = ModelClass;
