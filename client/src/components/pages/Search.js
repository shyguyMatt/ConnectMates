import React from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { REQUEST_JOIN } from './../../utils/mutations';
import { QUERY_USERS_BY_INTERESTS, QUERY_INTERESTS } from '../../utils/queries';

import Auth from './../../utils/auth'

export default function Search() {

  // Get keys from URL
  const urlParams = new URLSearchParams(window.location.search)
  const keys = urlParams.getAll('key')

  const token = Auth.getToken()
  const userId = Auth.getProfile(token).data._id;

  // Define mutations
  const [requestJoin, { error }] = useMutation(REQUEST_JOIN);

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
  const groups = userData?.groupByInterest || [];

  const handleRequestJoin = async (e) => {
    try {
      const groupId = e.target.value
      
      const { data } = await requestJoin({
        variables: { userId: userId, groupId: groupId }
      })

    } catch(err) {
      console.error(err)
    }
  }

  if(loadingUsers) {
    return(
      <div>Loading...</div>
    )
  }

  return(
    <div>
      <div className='users'>
        {/* For each returned user return element containing user info */}
        {users.map((user) => {
          return(
            <div className='card border-solid border-2 border-sky-500' key={user._id}>
              <h3>{user.name}</h3>
              <h4>{user.email}</h4>
              <ul>
                {user.interests.map((interest) => {
                  return(
                    <li key={interest._id}>{interest.name}</li>
                  )
                })}
              </ul>
            </div>
          )
        })}        
      </div>

      <div className='groups'>
        {groups.map((group) => {
          return(
            <div className='card border-solid border-2 border-red-500' key={group._id}>
              <h3>{group.name}</h3>
              <ul>
                {group.interests.map((interest) => {
                  return(
                    <li key={interest._id}>{interest.name}</li>
                  )
                })}
              </ul>
              <button value={group._id} onClick={handleRequestJoin}>request join</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
