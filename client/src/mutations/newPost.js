import gql from "graphql-tag";

export default gql`
  mutation NewPost($postInput: PostInput!) {
    newPost(input: $postInput)
  }
`;
