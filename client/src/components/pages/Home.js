import React from 'react';

// Import forms
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';

import './../../styles/home.css';


export default function Home() {
  return(
    <div className='homeContainer'>
      <h1> </h1>
      <div>
        <h2>Login</h2>
      <LoginForm />
      </div>
      <div>
        <h2>Sign Up</h2>
      <SignupForm />
      </div>
    </div>
  )
};
