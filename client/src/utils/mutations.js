import { gql } from "@apollo/client";

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
        photoCount
        savedPhotos {
          authors
          photoId
          image
          link
          title
          description
        }
      }
      token
    }
  }
`;

export const SAVE_PHOTO = gql`
  mutation savePhoto($photoData: PhotoInput!) {
    savePhoto(photoData: $photoData) {
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
