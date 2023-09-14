const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    interests: [String]
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
  userByInterest(userInterest: [String]!): [User]!
  user(userId: ID!): User
}

type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addInterest(userId: ID!, interest: String!): User
    removeUser(userId: ID!): User
    removeInterest(userId: ID!, interest: String!): User
}
`;

module.exports = typeDefs;
