const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Post {
    id: ID!
    title: String
    body: String!
    image:String
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
}
type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
}
type Like {
    id: ID!
    createdAt: String!
    username: String!
}
type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
}

type Photo {
    photoId: ID
    authors: [String]
    description: String
    image: String
    link: String
    title: String
}

input PhotoInput {
    photoId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    getPosts: [Post]
    getPost(postId: ID!): Post
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createPost(body: String! image: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    savePhoto(photoData: PhotoInput!): User
    removePhoto(photoId: ID!): User
}
`;

module.exports = typeDefs;