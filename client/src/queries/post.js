import gql from "graphql-tag";

export default gql`
  query Post($postId: ID!) {
    post(postId: $postId) {
      id
      userId
      title
      content
      dateTime
      username
      comments {
        id
        userId
        content
        dateTime
        username
      }
    }
  }
`;
