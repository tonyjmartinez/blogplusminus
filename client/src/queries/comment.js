import gql from 'graphql-tag';

export default gql`
    query Comment($commentId: ID!) {
        comment(commentId: $commentId) {
            id
            content
            username
            comments {
                id
                content
                parentId
                username
            }
        }
    }
`;
