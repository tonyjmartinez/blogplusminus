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
          console.log("requser", req.user);
          return req.user;
        } else if (!req.user) {
          console.log("You are not authenticated!");
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
        console.log("postId querying...", postId);
        if (postId) {
          console.log(postId);
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
            console.log(response);
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
