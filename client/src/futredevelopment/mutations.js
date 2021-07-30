import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token
    user {
        _id
        username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
addUser(username: $username, password: $password, email: $email) {
    
    user {
        _id
        username
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
    username
    likes {
        id
        username
        createdAt
    }
    likeCount
    comments {
        id
        body
        username
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
        username
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
        username
    }
    likeCount
    }
}
`;

export const SAVE_PHOTO = gql`
  mutation savePhoto($photoData: PhotoInput!) {
    savePhoto(photoData: $phtoData) {
      _id
      username
      email
      savedPhoto {
        photoId
        author
        image
        description
        title
        link
      }
    }
  }
`;

export const REMOVE_PHOTO = gql`
  mutation removePhoto($photoId: ID!) {
    removePhoto(photoId: $photoId) {
      _id
      username
      email
      savedPhotos {
        photoId
        authors
        image
        description
        title
        link
      }
    }
  }
`;