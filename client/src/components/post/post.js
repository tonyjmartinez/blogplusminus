import React from "react";
import { graphql } from "react-apollo";
import query from "../../queries/post";
import PostCard from "../frontPage/PostCard";
import Comment from "./comment";
import withAppContext from "../../context/withAppContext";

const post = props => {
  console.log(props);
  const ctxProps = props.context;
  const username = !props.data.loading ? props.data.post.username : null;
  const comments = props.data.comments;

  const { darkMode } = ctxProps;

  if (props.data.loading) {
    return <div>Loading...</div>;
  }

  const Comments = props => {
    console.log(comments);
    if (comments !== undefined && comments.length > 0) {
      return (
        <Comment comments={comments} darkMode={darkMode} username={username} />
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      <PostCard post={props.data.post} />
      <Comments />
    </React.Fragment>
  );
};

export default graphql(query, {
  options: props => ({ variables: { postId: props.match.params.id } })
})(withAppContext(post));
