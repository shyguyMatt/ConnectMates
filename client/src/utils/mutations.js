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
    mutation addInterest($userId: ID!, $interest: String!) {
      addInterest(userId: $userId, interest: $interest) {
        _id
        name
        interests
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
