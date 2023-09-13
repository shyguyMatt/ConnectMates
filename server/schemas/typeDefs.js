const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID 
    username: String
    email: String
    password: String
    interests: [Interest]
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

type Interest {
    name: String
    description: String
    interestedUsers: [User]
}

type Query {
  hello: String
  users: [User]!
  user(userId: ID!): User
}

type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addInterest(userId: ID!, interest: String!): user
    removeUser(userId: ID!): User
    removeInterest(userId: ID!, interest: String!): User
}
`;

module.exports = typeDefs;
