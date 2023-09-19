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

  if (loadingUsers) {
    return (
        <div className="bg-[#ff0303c6] text-white p-10 m-16 flex items-center justify-center rounded-3xl shadow-2xl h-[40%] max-w-xl mx-auto">
            Loading...
        </div>
    )
}

return (
    <div className="bg-[#ff0303c6] text-white p-10 m-16 flex items-center justify-center rounded-3xl shadow-2xl h-auto max-w-4xl mx-auto">
        <div className="space-y-4 bg-gray-800 p-6 rounded shadow-lg">
            <h2 className="mt-6 text-center text-3xl font-extrabold">
                Search Results
            </h2>

            <div className='users'>
                {/* For each returned user return element containing user info */}
                {users.map((user) => {
                    return (
                        <div className='card border-solid border-2 border-sky-500 p-4 my-2 rounded' key={user._id}>
                            <h3>{user.name}</h3>
                            <h4>{user.email}</h4>
                            <ul>
                                {user.interests.map((interest) => {
                                    return (
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
                    return (
                        <div className='card border-solid border-2 border-red-500 p-4 my-2 rounded' key={group._id}>
                            <h3>{group.name}</h3>
                            <ul>
                                {group.interests.map((interest) => {
                                    return (
                                        <li key={interest._id}>{interest.name}</li>
                                    )
                                })}
                            </ul>
                            <button value={group._id} onClick={handleRequestJoin} className="py-1 px-3 border border-transparent text-sm font-bold rounded-md bg-gradient-to-tr from-red-900 via-red-950 to-black hover:from-red-700 hover:via-red-850 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                Request Join
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
)
}