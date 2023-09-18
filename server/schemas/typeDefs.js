const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    interests: [Interest]
    bio: String
}

type Interest {
    _id: ID!
    name: String!
    description: String!
}

type Auth {
    token: ID!
    user: User
}

type Group {
    admin: User
    users: [User]
    groupSize: Int
}

type Query {
  hello: String
  users: [User]!
  userByInterest(interests: [String]!): [User]!
  user(userId: ID!): User
  interests: [Interest]!
}

type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addInterest(userId: ID!, interest: ID!): User
    removeUser(userId: ID!): User
    removeInterest(userId: ID!, interest: String!): User
    changeBio(userId: ID!, newBio: String!): User
}
`;

module.exports = typeDefs;
