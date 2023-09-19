import React from 'react';

// Import forms
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';

import './../../styles/home.css';


export default function LoginSignUp() {
  return (
    <div className='loginContainer'>
      <h1> </h1>
      <div>
        <LoginForm />
      </div>
      <div>
        <SignupForm />
      </div>
    </div>
  )
};