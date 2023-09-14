import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth'

export default function LoginForm() {
  
const [formState, setFormState] = useState({email: '', password: ''});
const [login, { error, data }] = useMutation(LOGIN_USER);

const handleChange = (event) => {
  const { name, value } = event.target;

  setFormState({
    ...formState,
    [name]: value,
  });
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const { data } =  await login({
      variables: { ...formState },
    });

    Auth.login(data.login.token);
  } catch (error) {
    console.error(error);
  }

  setFormState({
    email: '',
    password: '',
  });
};

  return(
    <form onSubmit={handleFormSubmit}>

      <h2>Email:</h2>
      <input
      className='form-input'
      placeholder='Email'
      name='email'
      type='email'
      value={formState.email}
      onChange={handleChange}
      />

      <h2>Password:</h2>
      <input
      className='password'
      placeholder='Password'
      name='password'
      type='password'
      value={formState.password}
      onChange={handleChange}
      />

      <button type='submit'>Log in</button>
    </form>
  )
}