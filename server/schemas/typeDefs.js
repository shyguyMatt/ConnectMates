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
    _id: ID
    name: String
    admin: [User]
    users: [User]
    groupSize: Int
    interests: [Interest]
    requests: [User]
}

type Query {
  hello: String
  users: [User]!
  userByInterest(interests: [String]!): [User]!
  groupByInterest(interests: [String]!): [Group]!
  user(userId: ID!): User
  interests: [Interest]!
  findAdminGroups(userId: ID!): [Group]
  findMemberGroups(userId: ID!): [Group]
  findGroupId(groupId: ID!): Group!
}

type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    createGroup(userId: ID!, groupName: String!, interests: [ID]!): Group
    requestJoin(userId: ID!, groupId: ID!): Group
    acceptRequest(groupId: ID!, userId: ID!): User
    rejectRequest(groupId: ID!, userId: ID!): User
    removeUser(groupId: ID!, userId: ID!): User
    promoteUser(groupId: ID!, userId: ID!): User
    removeAdmin(groupId: ID!, userId: ID!): User
    deleteGroup(groupId: ID!): Group

    addInterest(userId: ID!, interest: ID!): User
    removeUser(userId: ID!): User
    removeInterest(userId: ID!, interest: String!): User
    changeBio(userId: ID!, newBio: String!): User
}
`;

module.exports = typeDefs;