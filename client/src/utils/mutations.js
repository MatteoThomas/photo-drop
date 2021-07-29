import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token
    user {
        _id
        userName
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($userName: String!, $password: String!, $email: String!) {
addUser(userName: $userName, password: $password, email: $email) {
    
    user {
        _id
        userName
        email
        }
    }
    token
}
`;

export const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!) {
    createPost(body: $body) {
    id
    title
    body
    createdAt
    userName
    likes {
        id
        userName
        createdAt
    }
    likeCount
    comments {
        id
        body
        userName
        createdAt
    }
    commentCount
    }
}
`;

export const DELETE_POST_MUTATION = gql`
mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
}
`;

export const DELETE_COMMENT_MUTATION = gql`
mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
    id
    comments {
        id
        userName
        createdAt
        body
    }
    commentCount
    }
}
`;

export const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
    id
    likes {
        id
        userName
    }
    likeCount
    }
}
`;

