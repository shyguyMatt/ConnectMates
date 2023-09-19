import React from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { REQUEST_JOIN } from './../../utils/mutations';
import { QUERY_USERS_BY_INTERESTS, QUERY_INTERESTS } from '../../utils/queries';

import Auth from './../../utils/auth'

export default function Search() {

  // Get keys from URL
  const urlParams = new URLSearchParams(window.location.search)
  const keys = urlParams.getAll('key')

  const token = Auth.loggedIn()? Auth.getToken() : null;
  const userId = token? Auth.getProfile(token).data._id : null;

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
      console.log(e)
      
      const { data } = await requestJoin({
        variables: { userId: userId, groupId: groupId }
      })

      e.target.innerText = 'Request Sent';
      e.target.disabled = true;

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
    <div className="bg-[#838383c6] text-white p-10 m-16 flex flex-row justify-around items-center rounded-xl shadow-2xl space-y-10">
      {/* Groups */}
      <div className='basis-1/2 bg-gray-800 m-3 p-3 rounded-xl overflow-auto max-h-96 h-96'>
        <h1 className='text-3xl'>Groups</h1>
        {groups.map((group) => {
          return(
            <div className='m-2 p-2 border-2 border-white' key={group._id}>
              <div className='flex flex-row'>

                <div className='basis-1/4'>
                  <h3 className='text-2xl'>{group.name}</h3>                
                </div>

                <div className='basis-2/4'>
                  <ul>
                    {group.interests.map((interest) => {
                      return(
                        <li key={interest._id}>{interest.name}</li>
                      )
                    })}
                  </ul>                
                </div>

                <div className='basis-1/4'></div>
              </div>

              {Auth.loggedIn()?
                <button
                  className='hover:bg-[#d1d1d19a] w-full text-left p-1'
                  value={group._id}
                  onClick={handleRequestJoin}
                >request join</button>
                :
                <div/>
              }

            </div>
          )
        })}
      </div>

      {/* Users */}
      <div className='basis-1/2 bg-gray-800 p-3 rounded-xl overflow-auto max-h-96 h-96'>
        <h1 className='text-3xl'>Users</h1>
        {/* For each returned user return element containing user info */}
        {users.map((user) => {
          return(
            <div className='m-2 p-2 border-2 border-white' key={user._id}>
              <div className='flex flex-row'>
                <div className='basis-1/4'>
                  <h3 className='text-2xl'>{user.name}</h3>
                </div>

                <div className='basis-1/2'>
                  <ul>
                    {user.interests.map((interest) => {
                      return(
                        <li key={interest._id}>{interest.name}</li>
                      )
                    })}
                  </ul>
                </div>

                <div className='basis-1/4'>
                  <h4>{user.bio}</h4>                  
                </div>
              </div>
            </div>
          )
        })}        
      </div>
    </div>
  )
}
