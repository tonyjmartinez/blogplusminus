import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../queries/post';
import PostCard from '../frontPage/PostCard';
import Comment from './Comment';
import Comments from './Comments';
import withAppContext from '../../context/withAppContext';
import { useMediaQuery } from 'react-responsive';

const Post = props => {
  const ctxProps = props.context;
  const username = !props.data.loading ? props.data.post.username : null;
  const gqlProps = props.data;
  const { darkMode, user } = ctxProps;
  const { post } = gqlProps;
  const { comments } = post || [];
  let myUserId = null;
  let myUsername = null;
  let myToken = null;

  if (props.context.auth) {
    const user = props.context.user;
    myUserId = user.id;
    myUsername = user.username;
    myToken = user.token;
  }

  const GenComments = props => {
    if (comments === undefined || comments.length > 0) {
      console.log(comments);
      return (
        <Comments
          leftMargin={1}
          darkMode={darkMode || true}
          comments={comments}
        />
      );
    }
    return null;
  };

  const newComment = reply => {
    return new Promise((resolve, reject) => {
      if (!props.context.auth) {
        resolve('Not authorized');
      }
      props.context
        .newComment(
          myUserId,
          reply,
          myUsername,
          myToken,
          'post',
          props.data.post.id
        )
        .then(res => {
          props.data.refetch();
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  const isDesktop = useMediaQuery({ query: '(min-width: 850px)' });
  const commentsStyle = {
    width: isDesktop ? '80%' : '100%',
    margin: '0px auto'
  };

  if (props.data.loading) {
    return null;
  }

  return (
    <React.Fragment>
      <PostCard
        newComment={newComment}
        postDetail
        post={post}
        darkMode={darkMode}
        authorized={user !== null}
      />
      <div style={commentsStyle}>
        <GenComments />
      </div>
    </React.Fragment>
  );
};

export default graphql(query, {
  options: props => ({ variables: { postId: props.match.params.id } })
})(withAppContext(Post));
