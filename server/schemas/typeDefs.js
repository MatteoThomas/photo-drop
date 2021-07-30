const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    photoCount: Int
    savedPhotos: [Photo]
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
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePhoto(photoData: PhotoInput!): User
    removePhoto(photoId: ID!): User
}
`;

module.exports = typeDefs;