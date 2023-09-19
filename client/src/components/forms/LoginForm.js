import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function LoginForm() {
  const [formState, setFormState] = useState({ email: '', password: '' });
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
      const { data } = await login({
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

 
  
  return (
   
      <div className="bg-[#ff0303c6] text-white p-10 m-16 flex items-center justify-center rounded-3xl shadow-2xl h-[40%] max-w-xl mx-auto">
        <div className="space-y-4 bg-gray-800 p-6 rounded shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                name="password"
                type="password"
                required
                value={formState.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md bg-gradient-to-tr from-red-900 via-red-950 to-black hover:from-red-700 hover:via-red-850 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Log in
            </button>
            <button type="button" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md mt-4 bg-gradient-to-tr from-green-700 via-green-800 to-black hover:from-green-600 hover:via-green-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}