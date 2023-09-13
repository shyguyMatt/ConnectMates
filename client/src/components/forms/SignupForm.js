import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from './../../utils/auth'

export default function SignupForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <form onSubmit={handleFormSubmit}>
      <h2>Name:</h2>
      <input
        className='form-input'
        placeholder='Name'
        name='name'
        type='text'
        value={formState.name}
        onChange={handleChange}
        />

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
            className='form-input'
            placeholder='password'
            name='password'
            type='password'
            value={formState.password}
            onChange={handleChange}
            />

            <button
              type='submit'
              className='submit'
              >Submit</button>
    </form>
  )
}