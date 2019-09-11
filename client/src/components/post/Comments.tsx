import React from 'react';
import Comment from './Comment';

interface Props {
  darkMode: boolean;
  comments: [];
  leftMargin: number;
}

const Comments = (props: Props) => {
  const { darkMode, comments, leftMargin } = props;

  return (
    <>
      {comments.map((cmt, idx) => {
        return (
          <div key={idx}>
            <Comment
              darkMode={darkMode}
              comment={cmt}
              leftMargin={leftMargin}
            />
          </div>
        );
      })}
    </>
  );
};

export default Comments;
