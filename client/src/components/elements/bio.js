import React, { useState } from 'react';
import Modal from 'react-modal';

import { useMutation } from '@apollo/client';
import { CHANGE_BIO } from './../../utils/mutations';

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

function BioSection({user}) {

  const [changeBio, { loading: loadingBio, data: bioData }] = useMutation(CHANGE_BIO);

  const [bioText, setBioText] = useState(user.bio ? user.bio : 'Add Bio');
  const [inputText, setInputText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTextChange = async () => {
    if (inputText.trim() !== '') {

      try {
        const data = await changeBio({
          variables: { userId: user._id, newBio: inputText}
        })

        setBioText(inputText);
        setInputText('');
        closeModal();

      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div id="bio-section">
        <p>{bioText}</p>
      </div>
      <div>
      <button onClick={openModal} className="bg-gradient-to-tr from-red-900 via-red-950 to-black text-white font-bold p-2 rounded mt-2 transition-shadow shadow-md hover:shadow-lg">
            Add to bio
          </button>
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
