import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_INTEREST } from '../../utils/queries';

export default function Search() {

  const urlParams = new URLSearchParams(window.location.search)
  const keys = urlParams.getAll('key')

  const { loading, data } = useQuery(QUERY_INTEREST, {
    variables: { userInterest: keys }
  })

  if(loading) {
    return(
      <div>Loading...</div>
    )
  }
  
  return(
    <div>
    </div>
  )
}
