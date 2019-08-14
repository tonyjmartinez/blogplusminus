import gql from 'graphql-tag';

export default gql`
  query RecentPosts($skip: Int) {
    recentPosts(skip: $skip) {
      id
      title
      content
      userId
      dateTime
      username
    }
  }
`;
