import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GROUP_ID } from './../../utils/queries';
import { DENY_REQUEST, ACCEPT_REQUEST, REMOVE_USER, PROMOTE_USER } from './../../utils/mutations';

import Auth from './../../utils/auth';

// import './../../styles/group.css';

export default function Group() {
  const groupId = new URLSearchParams(window.location.search).get('group');

  const [denyRequest, { error: denyError }] = useMutation(DENY_REQUEST);
  const [acceptRequest, { error: acceptError }] = useMutation(ACCEPT_REQUEST);
  const [removeUser, { error: removeError }] = useMutation(REMOVE_USER);
  const [promoteUser, { error: promoteError }] = useMutation(PROMOTE_USER);

  const { loading: loadingGroup, data: groupData } = useQuery(QUERY_GROUP_ID, {
    variables: { groupId: groupId }
  })
  const group = groupData?.findGroupId || {};

  const isAdmin = () => {
    for(let i=0; i<group.admin.length; i++) {
      if(Auth.getProfile(Auth.getToken).data._id === group.admin[i]._id) {
        return true;
      }      
    }
    return false;
  }

  const accept = async (e) => {
    const userId = e.target.value
    try {
      const { data } = await acceptRequest({
        variables: { groupId: group._id, userId: userId }
      })

    } catch (error) {
      console.error(error)
    }
  }

  const reject = async (e) => {
    const userId = e.target.value
    try {
      const { data } = await denyRequest({
        variables: { groupId: group._id, userId: userId }
      })

    } catch (error) {
      console.error(error)
    }
  }

  const remove = async (e) => {
    const userId = e.target.value
    try {
      const { data } = await removeUser({
        variables: { groupId: group._id, userId: userId}
      })

    } catch (error) {
      console.error(error);
    }
  }

  const promote = async (e) => {
    const userId = e.target.value
    try {
      const { data } = await promoteUser({
        variables: { groupId: group._id, userId: userId}
      })

    } catch (error) {
      console.error(error);
    }
  }

  if(loadingGroup) {
    return(<div>Loading...</div>)
  }

  return(
    <div className='groupPage'>
      <div className='flex flex-row'>
        <div className='basis-1/3' />
        <h1 className='basis-1/3'>{group.name}</h1>
        <div className='basis=1/3' />
      </div>

      <div className='flex flex-row'>
        {/* Users Panel */}
        <div className='container basis-1/4 rounded-lg bg-gray-500'>
          <h2>Admins</h2>
          <ul>
            {group.admin.map((admin) => {
              return(
                <li
                  className='flex flex-row bg-white rounded-lg'
                  key={admin._id}
                >
                  <h3 className='basis-1/3'>{admin.name}</h3>
                  <div className='basis-1/3' />                 
                  <div className='basis-1/3'>

                  </div>
                </li>              
              )
            })}
          </ul>

          <h2>Users</h2>
          <ul>
            {group.users.map((user) => {
                return(
                  <li
                    className='flex flex-row bg-white rounded-lg'
                    key={user._id}
                  >
                    <h3 className='basis-1/3'>{user.name}</h3>
                    <div className='basis-1/3' />
                    {isAdmin()?
                    <div className='basis-1/3'>
                      <button
                        onClick={remove}
                        value={user._id}
                      >remove user</button>
                      <button
                        onClick={promote}
                        value={user._id}
                      >Promote user</button>
                    </div>
                    :                  
                    <div className='basis-1/3'>

                    </div>}
                  </li>              
                )
              })}
          </ul>
        </div>

        <div className='basis-1/2'>
          {isAdmin()?
            group.requests.map((request) => {
              return(
                <div>
                  <h2>{request.name}</h2>
                  <button
                    onClick={accept}
                    value={request._id}
                  >confirm</button>
                  <button
                    onClick={reject}
                    value={request._id}
                  >deny</button>
                </div>              
              )
            })
            :
            <div>

            </div>
        }

        </div>

        <div className='basis-1/4'>

        </div>
      </div>        
    </div>

  );
};