import React from 'react';

export default function LoginForm() {
  return(
    <form>
      <h2>Email:</h2>
      <input className='email' placeholder='Email' />
      <h2>Name:</h2>
      <input className='name' placeholder='Name' />
      <h2>Password:</h2>
      <input className='password' placeholder='Password' />
      <button type='submit'>Log in</button>
    </form>
  )
}