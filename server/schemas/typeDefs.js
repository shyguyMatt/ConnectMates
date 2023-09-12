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

type Interest {
    name: String
    description: String
    interestedUsers: [User]
}

type Query {
  hello: String
}
`;

module.exports = typeDefs;
