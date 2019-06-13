import React from "react";
import Comment from "./comment";

// TODO: Recursively render comments
// https://stackoverflow.com/questions/27193722/nested-comments-in-reactjs
const comments = props => {
  const { darkMode, comments, leftMargin } = props;

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

export default comments;
