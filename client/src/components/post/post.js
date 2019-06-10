import React from 'react';
import {graphql} from 'react-apollo';
import query from '../../queries/post';
import PostCard from '../frontPage/PostCard';
import Comment from './comment';

const post = props => {
  console.log(props);
  if (props.data.loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <PostCard post={props.data.post} />
      <Comment />
    </React.Fragment>


  );
};

export default graphql(query, {
  options: props => ({variables: {postId: props.match.params.id}}),
})(post);
