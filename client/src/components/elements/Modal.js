import React, { useState } from 'react';
import Login from './../forms/LoginForm';
import Signup from './../forms/SignupForm';

import '../../styles/modal.css'

export default function Modal({ modal, handleModalClose }) {
  console.log(modal)
  const renderContent = () => {
    if (modal === 'Login') {
      return <Login />;
    }
    if (modal === 'Signup') {
      return <Signup />;
    }
    return;
  }

  return(
    <div className='modal'>
      <div className='content'>
        <button className='close'
          onClick={() => handleModalClose()}
        />
        {renderContent()}
      </div>
    </div>
  )
}