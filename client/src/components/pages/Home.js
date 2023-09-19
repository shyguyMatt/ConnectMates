import React from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_USERS_GROUPS } from '../../utils/queries';
import Auth from './../../utils/auth'

import NewGroup from './../elements/NewGroup'

import './../../styles/home.css';



export default function Home() {

  const token = Auth.loggedIn() ? Auth.getProfile(Auth.getToken()) : null;
  const userId = token.data._id;

  const { loading: loadingUser, data: userData } = useQuery(QUERY_SINGLE_USER,
    {variables: {userId: userId}});
  const user = userData?.user || {};

  const { loading: loadingGroups, data: groupData } = useQuery(QUERY_USERS_GROUPS,
    {variables: { userId: userId }});
  const adminGroups = groupData?.findAdminGroups || {};
  const memberGroups = groupData?.findMemberGroups || {};
  
  if(loadingGroups) {
    return(
      <div>Loading...</div>
    )
  }

  if(loadingUser) {
    return(
      <div>Loading...</div>
    )
  }

  return (
    <div className="bg-[#838383c6] text-white p-10 m-16 flex flex-col justify-center items-center rounded-xl shadow-2xl space-y-10">

      <div className="flex w-full space-x-10 mb-10"> {/* Container for the two groups side by side */}
      
        <div className="w-1/2 bg-gray-800 p-4 rounded shadow-md space-y-4"> {/* Admin Groups */}
          <h2 className="text-2xl font-semibold mb-2">Groups you are admin of:</h2>
          {adminGroups.map((group) => (
            <div key={group._id} className="p-2 bg-gray-700 rounded shadow-sm space-y-2">
              <h2 className="text-xl">{group.name}</h2>
              <NavLink to={`/group?group=${group._id}`} className="text-red-500 hover:text-red-700">
                Go to Group
              </NavLink>
            </div>
          ))}
        </div>

        <div className="w-1/2 bg-gray-800 p-4 rounded shadow-md space-y-4"> {/* Member Groups */}
          <h2 className="text-2xl font-semibold mb-2">Groups you are a member in:</h2>
          {memberGroups.map((group) => (
            <div key={group._id} className="p-2 bg-gray-700 rounded shadow-sm space-y-2">
              <h2 className="text-xl">{group.name}</h2>
              <NavLink to={`/group?group=${group._id}`} className="text-red-500 hover:text-red-700">
                Go to Group
              </NavLink>
            </div>
          ))}
        </div>

      </div> {/* End of side by side groups container */}

      <NewGroup user={user} />
    </div>
  )
};