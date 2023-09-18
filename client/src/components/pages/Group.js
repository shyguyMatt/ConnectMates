import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GROUP_ID } from './../../utils/queries';
import {} from './../../utils/mutations';

export default function Group() {
  const groupId = new URLSearchParams(window.location.search).get('group');

  const { loading: loadingGroup, data: groupData } = useQuery(QUERY_GROUP_ID, {
    variables: { groupId: groupId }
  })
  const group = groupData?.findGroupId || {};
  console.log(group)

  return(
    <>
      <div>
        <h1>This is the group page</h1>
        <h2>{group.name}</h2>
      </div>
    </>
  );
};