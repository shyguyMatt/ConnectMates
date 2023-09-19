import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar';
import Auth from "../../utils/auth";
import { ADD_INTEREST, REMOVE_INTEREST } from "../../utils/mutations";
import { QUERY_INTERESTS, QUERY_SINGLE_USER } from "../../utils/queries";
import BioSection from "../elements/bio";
import "./../../styles/Profile.css";

export default function Profile() {
  // Checks if the user is logged in returns a profile information object
  const token = Auth.loggedIn() ? Auth.getProfile(Auth.getToken()) : null;
  const userId = token.data._id;

  // Defines queries used
  const { loading: loadingUser, data: userData } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: userId },
  });
  const user = userData?.user || {};

  const { loading: loadingInterests, data: interestData } = useQuery(QUERY_INTERESTS);
  const interests = interestData?.interests || [];

  // Defines mutations used
  const [addInterest, { error }] = useMutation(ADD_INTEREST);

  const [removeInterest] = useMutation(REMOVE_INTEREST);

  // Defines states used
  const [interestValue, setInterestValue] = useState("");

  // handles add interest button, sends request to server to update user information
  const handleAddInterest = async () => {
    try {
      const selectedInterest = document.querySelector("#interestSelect").value;
      if (!selectedInterest) return;

      const data = await addInterest({
        variables: { userId: userId, interest: selectedInterest },
      });
      console.log(data);
      setInterestValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveInterest = async (interestId) => {
    try {
      const selectedInterest = document.querySelector("#interestSelect").value;
      const data = await removeInterest({
        variables: { userId: userId, interest: selectedInterest },
      });
      setInterestValue((selectedInterest) =>
        selectedInterest.filter((interest) => interest._id !== interestId)
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#838383c6] text-white p-10 m-16 flex flex-col justify-center items-center rounded-xl shadow-2xl space-y-10">

      <section className="flex flex-col space-y-6">
        <div className="relative w-32 h-32"> {/* container */}
          <Avatar
            name={user.name}
          />
          {/* The three-dot options button */}
          <button
            className="absolute bottom-0 right-0 bg-gradient-to-tr from-red-900 via-red-950 to-black text-white font-bold p-1 rounded-full transition-shadow shadow-md hover:shadow-lg text-sm"
            style={{ marginBottom: '10px', marginRight: '10px' }}  // Adjust these values to position the button to your liking
          // onClick={/* function to handle click (e.g., show options to change the profile picture) */}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>


        <div className="bg-gray-800 p-4 rounded shadow-md">
          <h4 className="text-xl font-semibold mb-2">About {user.name}</h4>
          <BioSection user={user} />
        </div>
      </section>

      <section className="flex space-x-8 w-full">
        <aside className="flex-none w-1/4 space-y-4 bg-gray-800 p-4 rounded shadow-md">
          <h3 className="text-4xl font-semibold mb-4">Interests</h3>
          <ul className="list-disc list-inside mb-4 space-y-2">
            {user.interests.map((interest) => (
              <li key={interest._id}>
                {interest.name}
              </li>
            ))}
          </ul>

          <select id="interestSelect" name="interests" className="w-full p-2 mb-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors shadow-sm">
            <option value="">--Select an Option--</option>
            {interests.map((interest) => (
              <option value={interest._id} key={interest._id}>
                {interest.name}
              </option>
            ))}
          </select>

          <button className="text-center text-sm w-20 h-10 bg-gradient-to-tr from-red-900 via-red-950 to-black text-white font-bold shadow-md hover:scale-105 rounded-xl"
            onClick={handleAddInterest}>
            Add interest
          </button>
          <button className="text-center text-sm w-20 h-10 bg-gradient-to-tr from-red-900 via-red-950 to-black text-white font-bold shadow-md hover:scale-105 rounded-xl"
            onClick={() => handleRemoveInterest('exampleInterest')}>
            Remove Interest
          </button>
        </aside>

        <div className="flex-grow space-y-4 bg-gray-800 p-4 rounded shadow-md justify-content-center">
          <h3 className="text-xl font-semibold mb-4">Completed Projects</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Visual test 1</li>
            <li>Visual test 2</li>
            <li>Visual test 3</li>
          </ul>
          <h3 className="text-xl font-semibold mb-4">Currant Groups</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Group 1</li>
            <li>Group 2</li>
          </ul>
        </div>
      </section>
    </div>
  );
}