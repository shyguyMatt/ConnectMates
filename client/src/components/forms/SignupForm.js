import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import '../../styles/signupform.css';
import { ADD_USER } from '../../utils/mutations';
import Auth from './../../utils/auth';

export default function SignupForm() {
  // Define states to be used
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showSignup, setShowSignup] = useState(false);

  // Define mutations to be used
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // handles change in any of the fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // handles the form submit
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

  return (
    <div className="flex flex-col items-center justify-center m-16">
      {!showSignup && (
        <button
          type="button"
          className="mb-4 bg-gradient-to-r from-red-900 via-red-600 to-black text-white p-2 rounded"
          onClick={() => setShowSignup(true)}
        >
          Create an account
        </button>
      )}

      <Transition in={showSignup} timeout={300} unmountOnExit>
        {(state) => (
          <div className={`bg-[#ff0303c6] text-white p-10 flex items-center justify-center rounded-3xl shadow-2xl h-[40%] max-w-xl mx-auto fade-${state}`}>
            <div className="space-y-4 bg-gray-800 p-6 rounded shadow-lg">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold">
                  Create an account
                </h2>
              </div>
              <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <h2 className="text-sm">Name:</h2>
                    <input
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <h2 className="text-sm">Email:</h2>
                    <input
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <h2 className="text-sm">Password:</h2>
                    <input
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md bg-gradient-to-tr from-red-900 via-red-950 to-black hover:from-red-700 hover:via-red-850 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}
