import React from 'react';
import Comment from './Comment';

// TODO: Recursively render comments
// https://stackoverflow.com/questions/27193722/nested-comments-in-reactjs
const Comments = props => {
  const { darkMode, comments, leftMargin } = props;
  console.log('comments', leftMargin);

  return comments.map((cmt, idx) => {
    return (
      <Comment
        key={idx}
        darkMode={darkMode}
        comment={cmt}
        leftMargin={leftMargin}
      />
    );
  });
};

export default Comments;
