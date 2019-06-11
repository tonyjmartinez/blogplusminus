import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../queries/post';
import PostCard from '../frontPage/PostCard';
import Comment from './comment';
import withAppContext from '../../context/withAppContext';


const post = props => {
  console.log(props);
  const ctxProps = props.context;
  const username = !props.data.loading ? props.data.post.username : null;
  console.log(ctxProps);
  console.log(username);
  const { darkMode } = ctxProps;

  if (props.data.loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <PostCard post={props.data.post} />
      <Comment darkMode={darkMode} username={username} />
    </React.Fragment>


  );
};

export default graphql(query, {
  options: props => ({ variables: { postId: props.match.params.id } }),
})(withAppContext(post));
