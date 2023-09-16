import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_USERS_BY_INTERESTS, QUERY_INTERESTS } from '../../utils/queries';

export default function Search() {

  const urlParams = new URLSearchParams(window.location.search)
  const keys = urlParams.getAll('key')

  const { loading: loadingInterests, data: interestData} = useQuery(QUERY_INTERESTS)
  const interests =  interestData?.interests || [];
  
  const interestIds = []
  if(!loadingInterests) {
    interests.map((interest) => {
      for(let i=0;i<keys.length;i++){
        if(interest.name === keys[i]) {
          interestIds.push(interest._id)
        }
      }
    });    
  }
 
  //query for retrieving users
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
