import React from "react";
import { graphql } from "react-apollo";
import query from "../../queries/post";
import PostCard from "../frontPage/PostCard";
import Comment from "./comment";
import Comments from "./comments";
import withAppContext from "../../context/withAppContext";

const post = props => {
  if (props.data.loading) {
    return <div>Loading...</div>;
  }

  console.log(props);
  const ctxProps = props.context;
  const username = !props.data.loading ? props.data.post.username : null;
  const gqlProps = props.data;
  console.log(ctxProps);
  console.log(username);
  const { darkMode } = ctxProps;
  const { post } = gqlProps;
  const { comments } = post;
  console.log(post);
  console.log(comments);

  const GenComments = props => {
    if (comments.length > 0) {
      return (
        <Comments leftMargin={1} darkMode={darkMode} comments={comments} />
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      <PostCard post={post} />
      <GenComments />
    </React.Fragment>
  );
};

export default graphql(query, {
  options: props => ({ variables: { postId: props.match.params.id } })
})(withAppContext(post));
