import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';

export default function Search() {

  const urlParams = new URLSearchParams(window.location.search)
  console.log(urlParams.getAll('key'))
  
  return(
    <div>
    </div>
  )
}
