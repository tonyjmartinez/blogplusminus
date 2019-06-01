const User = require("../models/user");
const Post = require("../models/post");
const ObjectID = require("mongodb").ObjectID;

exports.newPost = function(args) {
  return new Promise(function(resolve, reject) {
    const { userId, title, content, username } = args.input;
    console.log(userId);
    User.findOne({ _id: new ObjectID(userId) }, function(err, user) {
      if (err) {
        console.log(err);
      }
      const post = new Post({
        userId: userId,
        title: title,
        content: content,
        dateTime: new Date(),
        username: username
      });
      post.save(function(err, post) {
        if (err) {
          console.log(err);
        }

        user.posts.push(post._id);
        user.save();
        console.log("Post Successful");
        console.log(post);
        resolve();
      });
    });
  });
};
