const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID 
    username: String
    email: String
    password: String
    interests: [Interest]
}

type Group {
    admin: User
    users: [User]
    groupSize: Int
}

type Interests {
    name: String
    description: String
    interestedUsers: [User]
}

type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}


`;

module.exports = typeDefs;