import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
  `;

  export const ADD_USER = gql`
    mutation addUser($name: String!, $email: String!, $password: String!) {
      addUser(name: $name, email: $email, password: $password) {
        token
        user {
          _id
          name
        }
      }
    }
    `;

  export const ADD_INTEREST = gql`
    mutation addInterest($userId: ID!, $interest: ID!) {
      addInterest(userId: $userId, interest: $interest) {
        _id
        name
        interests {
          name
          _id
          description
        }
      }
    }
    `;

export const REMOVE_INTEREST = gql`
mutation removeSkill($interest: String!) {
  removeInterest(interest: $interest) {
    _id
    name
    interest
  }
}
`;

export const CHANGE_BIO = gql`
mutation changeBio($userId: ID!, $newBio: String!) {
  changeBio(userId: $userId, newBio: $newBio) {
    _id
    name
    bio
  }
}
`;

export const CREATE_GROUP = gql`
mutation createGroup($userId: ID!, $groupName: String!, $interests: [ID]!) {
  createGroup(userId: $userId, groupName: $groupName, interests: $interests) {
    _id
    name
    interests {
      _id
      name
    }
    admin {
      _id
      name
    }
    users {
      _id
      name
    }
  }
}`