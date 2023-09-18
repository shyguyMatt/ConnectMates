import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_USERS_GROUPS } from '../../utils/queries';
import Auth from './../../utils/auth'

// Import forms
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
  // console.log(user)

  return(
    <div className='homeContainer'>
      <div className='groups'>
        <h2>These are your groups</h2>
        {adminGroups.map((group) => (
          <div key={group._id}>
            <h2>this is am admin group</h2>
          </div>
          ))}
        <NewGroup user={user}/>
      </div>

    </div>
  )
};
