import React, { useState } from 'react';
import Home from './../pages/Home'

import '../../styles/modal.css'

export default function Modal( modal, handleModal ) {
  const [currentContent, setCurrentContent] = useState('Home');

  const renderContent = () => {
    if (currentContent === 'Home') {
      return<Home />;
    }
    return;
  }

  const handleContentChange = (content) => setCurrentContent(content);

  return(
    <div className='modal'>
      <div className='content'>
        <button className='close'
          onClick={() => handleModal()}
        />
        {renderContent()}
      </div>
    </div>
  )
}