import { gql } from '@apollo/client';

export const GET_ME  = gql`
    {
        me {
            _id
            username
            email
            photoCount
            savedPhotos {
                photoId
                authors
                title
                description
                image
                link
            }
        }
    }
`;

export const FETCH_POSTS_QUERY = gql`
    getPosts {
    id
    title
    body
    image
    createdAt
    userName
    likeCount
    likes {
        userName
    }
    commentCount
    comments {
        id
        userName
        createdAt
        body
    }
    }`