import React, { useState } from 'react';
import Modal from 'react-modal';

import { useMutation, useQuery } from '@apollo/client';
import { CREATE_GROUP } from './../../utils/mutations';
import { QUERY_INTERESTS } from './../../utils/queries';

export default function NewGroup({ user }) {
  const [modalState, setModalState] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [groupName, setGroupName] = useState('');

  const { loading: loadingInterests, data: interestData } = useQuery(QUERY_INTERESTS);
  const interests = interestData?.interests || [];

  const [createGroup, { error: groupError, data: GroupData }] = useMutation(CREATE_GROUP);

  const handleGroupCreate = async () => {
    try {
      const data = await createGroup({
        variables: { userId: user._id, groupName: groupName, interests: selectedInterests }
      })

    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setGroupName(value)
  }


  return (
    <div className='newGroup'>
      <button
        onClick={() => setModalState(true)}
        className="px-6 py-2 bg-[#9c2731] text-gray-800 text-lg rounded hover:bg-red-600 p-2 focus:outline-white focus:bg-red-700"
      >Create New Group</button>

      <Modal
        isOpen={modalState}
        onRequestClose={() => setModalState(false)}
      >
        <input
          onChange={handleChange}
          value={groupName}
          placeholder='Name your group'
          className="flex-grow px-4 py-2 mr-4 text-xl text-white placeholder-[#ff4f5e] bg-gray-700 border border-blue-500 rounded-lg focus:outline-none focus:border-blue-400"
        />
        <select
          className="flex-grow px-4 py-2 mr-4 text-xl text-white placeholder-[#ff4f5e] bg-gray-700 border border-blue-500 rounded-lg focus:outline-none focus:border-blue-400"
          onChange={(e) => {
            console.log(e.target.value)
            setSelectedInterests([...selectedInterests, e.target.value])
          }}
        >
          <option value=''>--Select interests for your group--</option>
          {interests.map((interest) => {
            for (let i = 0; i < selectedInterests.length; i++) {
              if (interest._id === selectedInterests[i]) {
                return
              }
            }
            return (
              <option
                key={interest._id}
                value={interest._id}
              >
                {interest.name}
              </option>
            )
          })}
        </select>

        <button
          onClick={handleGroupCreate}
          className="px-6 py-2 bg-[#9c2731] text-gray-800 text-lg rounded hover:bg-red-600 p-2 focus:outline-white focus:bg-red-700"
        >Create Group!</button>
        <button
          onClick={() => {
            setModalState(false)
            setSelectedInterests([])
            setGroupName('')
          }}
          className="px-6 py-2 bg-[#9c2731] text-gray-800 text-lg rounded hover:bg-red-600 p-2 focus:outline-white focus:bg-red-700"
        >Cancel</button>


      </Modal>
    </div>
  )
}
