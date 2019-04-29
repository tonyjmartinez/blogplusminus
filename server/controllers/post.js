const User = require("../models/user");
const Post = require("../models/post");
const ObjectID = require("mongodb").ObjectID;

exports.newPost = function(args) {
  const { userId, title, content } = args.input;
  console.log(userId);
  User.findOne({ _id: new ObjectID(userId) }, function(err, user) {
    if (err) {
      console.log(err);
    }
    console.log("postcontrolelr");
    console.log(user);

    const post = new Post({
      userId: userId,
      title: title,
      content: content
    });
    post.save(function(err, post) {
      if (err) {
        console.log(err);
      }

      user.posts.push(post._id);
      user.save();
    });
  });
};
