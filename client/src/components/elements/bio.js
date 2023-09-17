import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',

  },

};

function BioSection() {
  const [bioText, setBioText] = useState('Add Bio');
  const [inputText, setInputText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTextChange = () => {
    if (inputText.trim() !== '') {
      setBioText(inputText);
      setInputText('');
      closeModal();
    }
  };

  return (
    <div>
      <div id="bio-section">
        <p>{bioText}</p>
      </div>
      <div>
        <button onClick={openModal}>+</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>Add Text</h2>
        <textarea
          rows="5"
          cols="50"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter new text"
        />
        <br/>
        <div>
        <button onClick={handleTextChange}>Replace Text</button>
        <br/>
        <button onClick={closeModal}>X</button>
        </div>
      </Modal>
    </div>
  );
}

export default BioSection;
