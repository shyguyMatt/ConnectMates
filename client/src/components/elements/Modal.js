import React, { useState } from 'react';
import Home from './../Pages/Home'

import '../../styles/modal.css'

export default function Modal({ modal, handleModalClose }) {
  console.log(modal)
  const renderContent = () => {
    if (modal === 'Home') {
      return <Home />;
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