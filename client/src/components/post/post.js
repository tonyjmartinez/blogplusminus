import React from 'react';
import {graphql} from 'react-apollo';
import query from '../../queries/post';
import PostCard from '../frontPage/PostCard';

const post = props => {
  console.log(props);
  if (props.data.loading) {
    return <div>Loading...</div>;
  } else {
    return <PostCard post={props.data.post} />;
  }
};

export default graphql(query, {
  options: props => ({variables: {postId: props.match.params.id}}),
})(post);
