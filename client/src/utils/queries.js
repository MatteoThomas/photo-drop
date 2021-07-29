import { gql } from '@apollo/client';

export const GET_ME  = gql`
    {
        me {
            _id
            userName
            email
        }
    }
`

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