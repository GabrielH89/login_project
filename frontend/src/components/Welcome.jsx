import React from 'react';
import { useParams } from 'react-router-dom';

function Welcome() {
  let {email} = useParams();

  return (
    <div>
      <h1>Welcome, {email}</h1>
    </div>
  )
}

export default Welcome

