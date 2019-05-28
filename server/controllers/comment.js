const User = require("../models/user");
const Comment = require("../models/comment");
const Post = require("../models/post");
const ObjectID = require("mongodb").ObjectID;

exports.newComment = function(args) {
  return new Promise(function(resolve, reject) {
    const { userId, postId, content, username, parentCommentId } = args.input;
    Post.findOne({ _id: new ObjectID(postId) }, function(err, post) {
      if (err) {
        console.log(err);
      }

      const comment = new Comment({
        postId: postId,
        userId: userId,
        parentCommentId: parentCommentId,
        content: content,
        dateTime: new Date(),
        username: username
      });
      console.log("after comment");
      comment.save(function(err, comment) {
        console.log("after comment save");
        if (err) {
          console.log(err);
        }

        post.comments.push(comment._id);
        post.save(function(err, post) {
          if (err) {
            console.log(err);
          }
          console.log(post);
          resolve();
        });
      });
    });
  });
};
