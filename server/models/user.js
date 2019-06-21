const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Define our model
const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }]
});

userSchema.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  console.log("salting");
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log(salt);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        console.log("err");
        return next(err);
      }
      console.log(hash);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

userSchema.statics.findPosts = function(id) {
  return this.findById(id)
    .populate("posts")
    .then(user => user.posts);
};

// Create the model class
const ModelClass = mongoose.model("user", userSchema);

// Export the model
module.exports = ModelClass;
