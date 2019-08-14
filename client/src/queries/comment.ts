import gql from "graphql-tag";

export default gql`
  query Comment($commentId: ID!) {
    comment(commentId: $commentId) {
      id
      content
      parentId
      username
      parentType
      comments {
        id
        content
        parentId
        username
      }
    }
  }
`;
