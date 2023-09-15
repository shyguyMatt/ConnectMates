import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
    }
  }
  `;

export const QUERY_INTEREST = gql`
  query userByInterest($userInterest: [String]!) {
    userByInterest(interests: $userInterest) {
      _id
      name
      interests
    }
  }`

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      interests {
        _id
        name
      }
    }
  }
  `;

export const QUERY_INTERESTS = gql`
  query getInterests{
    interests {
      name
      _id
      description
    }
  }
  `;

  