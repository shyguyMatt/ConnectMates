import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_USERS_BY_INTERESTS, QUERY_INTERESTS } from '../../utils/queries';

export default function Search() {

  // Get keys from URL
  const urlParams = new URLSearchParams(window.location.search)
  const keys = urlParams.getAll('key')

  // Define query to get all interests from database
  const { loading: loadingInterests, data: interestData} = useQuery(QUERY_INTERESTS)
  const interests =  interestData?.interests || [];

  // Convert names into ids that share the name
  const interestIds = []
  if(!loadingInterests) {
    // for each interest from database
    interests.map((interest) => {
      // for each key
      for(let i=0;i<keys.length;i++){
        // if key matches name of interest
        if(interest.name === keys[i]) {
          // push interest id
          interestIds.push(interest._id)
        }
      }
    });    
  }

// define query to get users from database
  const { loading: loadingUsers, data: userData } = useQuery(QUERY_USERS_BY_INTERESTS, {
    variables: { userInterest: interestIds }
  })
  const users = userData?.userByInterest || [];

  if(loadingUsers) {
    return(
      <div>Loading...</div>
    )
  }

  return(
    <div>
      {/* For each returned user return element containing user info */}
      {users.map((user) => {
        return(
          <div className='card border-solid border-2 border-sky-500' key={user._id}>
            <h3>{user.name}</h3>
            <h4>{user.email}</h4>
            <ul>
              {user.interests.map((interest) => {
                return(
                  <li>{interest.name}</li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
