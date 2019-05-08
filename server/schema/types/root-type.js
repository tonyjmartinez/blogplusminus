const graphql = require("graphql");
const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLList } = graphql;
const UserType = require("./user-type");
const User = require("../../models/user");
const PostType = require("./post-type");
const Post = require("../../models/post");

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
        if (postId) {
          console.log(postId);
          const foundPost = await Post.findById(postId);
          return foundPost;
        }
        return null;
      }
    },
    recentPosts: {
      type: GraphQLList(PostType),
      resolve(parentValue, args, req) {
        return new Promise((resolve, reject) => {
          Post.findRecent(function(response) {
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
