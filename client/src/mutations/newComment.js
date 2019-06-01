import gql from "graphql-tag";

export default gql`
  mutation NewComment($commentInput: CommentInput!) {
    newComment(input: $commentInput)
  }
`;
