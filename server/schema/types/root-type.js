const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;
const UserType = require("./user-type");
const User = require("../../models/user");
const PostType = require("./post-type");
const Post = require("../../models/post");
const Comment = require("../../models/comment");
const CommentType = require("./comment-type");

const RootType = new GraphQLObjectType({
  name: "RootType",
  fields: {
    user: {
      type: UserType,
      async resolve(parentValue, args, req) {
        if (req.user) {
          return req.user;
        } else if (!req.user) {
          return null;
        } else {
          const foundUser = await User.findById(req.user.id);
          return foundUser;
        }
      }
    },
    post: {
      type: PostType,
      args: { postId: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parentValue, args, req) {
        const postId = args.postId;
        if (postId) {
          const foundPost = await Post.findById(postId);
          return foundPost;
        }
        return null;
      }
    },
    comment: {
      type: CommentType,
      args: { commentId: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parentValue, args, req) {
        const commentId = args.commentId;
        if (commentId) {
          const foundComment = await Comment.findById(commentId);
          return foundComment;
        }
        return null;
      }
    },
    recentPosts: {
      type: GraphQLList(PostType),
      args: { skip: { type: GraphQLInt } },
      resolve(parentValue, args, req) {
        let skip = 0;
        if (args.skip !== undefined) {
          skip = args.skip;
        }
        return new Promise((resolve, reject) => {
          Post.findRecent(skip, function(response) {
            if (response !== null) {
              resolve(response);
            }
          });
        });
      }
    }
  }
});

module.exports = RootType;
