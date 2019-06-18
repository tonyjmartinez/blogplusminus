const User = require("../models/user");
const Comment = require("../models/comment");
const Post = require("../models/post");
const ObjectID = require("mongodb").ObjectID;
const Auth = require('./authentication');

exports.newComment = function(args) {
  return new Promise(function(resolve, reject) {
    const {
      userId,
      postId,
      content,
      username,
      parentId,
      parentType,
      token
    } = args.input;
    const Parent = parentType === "post" ? Post : Comment;
    Parent.findOne({ _id: new ObjectID(parentId) }, function(err, parent) {
      if (err) {
        console.log(err);
      }

      const verified = Auth.checkToken(token, null);
      if (!verified) {
        return resolve("Not authorized");
      }

      const comment = new Comment({
        postId: postId,
        userId: userId,
        parentId: parentId,
        content: content,
        dateTime: new Date(),
        username: username
      });
      comment.save(function(err, comment) {
        if (err) {
          console.log(err);
        }

        parent.comments.push(comment._id);
        parent.save(function(err, result) {
          if (err) {
            console.log(err);
          }
          resolve();
        });
      });
    });
  });
};
