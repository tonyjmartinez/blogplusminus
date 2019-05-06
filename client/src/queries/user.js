import gql from "graphql-tag";

export default gql`
  {
    user {
      id
      email
      username
      token
      expires
      posts {
        title
        content
        dateTime
      }
    }
  }
`;
