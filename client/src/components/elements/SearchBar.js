import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_INTERESTS } from "../../utils/queries";

import "./../../styles/SearchBar.css";

export default function SearchBar() {
  // Load Queries and convert to be more usable
  const { loading: loadingInterests, data: interestData } = useQuery(QUERY_INTERESTS)
  const interests = interestData?.interests || [];

  // Define states
  const [searchValue, setSearchValue] = useState("");
  const [usedInterestArray, setUsedInterestArray] = useState([]);

  // Adds value to search bar
  // Redefines usedInterestArray with new value added
  const handleSelectChange = (e) => {
    setSearchValue(searchValue + '[' + document.querySelector('#selectInterest').value + '] ');
    setUsedInterestArray([...usedInterestArray, document.querySelector('#selectInterest').value])
  }

  // Called on search buttton press
  // navigates to the search page with search keys defined
  const handleSearch = (e) => {
    let tempString = ''
    usedInterestArray.map((usedInterest) => {
      if(!tempString) {
        tempString = tempString + 'key=' + usedInterest
      } else {
        tempString = tempString + '&key=' +usedInterest        
      }

    })
    window.location.assign(`/search?${tempString}`)
  }

  // Clears and resets the usedInterest array
  const clear = (e) => {
    setSearchValue('')
    setUsedInterestArray([])
  }

  return (
    <section className="searchBarContainer flex items-center justify-between p-8 bg-gray-600 shadow-md rounded-full ">
      {/* Disabled Input box used to accept search keys from select box */}
      <input
      id='textSelectInterest'
      type="text"
      placeholder="Search For Users/Projects"
      name="searchValue"
      value={searchValue}
      disabled={true}
      className="flex-grow px-4 py-2 mr-4 text-xl text-white placeholder-[#ff4f5e] bg-gray-700 border border-blue-500 rounded-lg focus:outline-none focus:border-blue-400"
      />

      {/* Button used to clear out the serach keys */}
      <button
        className="px-6 py-2 bg-[#9c2731] text-gray-800 text-lg rounded hover:bg-red-600 p-2 focus:outline-white focus:bg-red-700"
        onClick={clear}
        >X</button>
      
      {/* Dropdown menu lists all available Interests to search for
          selecting one puts it in the input section */}
      <select
        id='selectInterest'
        name='searchValue'
        onChange={handleSelectChange}
        className="flex-grow px-4 py-2 mr-4 text-xl text-white placeholder-[#ff4f5e] bg-gray-700 border border-blue-500 rounded-lg focus:outline-none focus:border-blue-400"
        >
          {/* Options selection */}
          <option value=''>--Search For Users/Projects--</option>
          {/* Interests map recieves information from query and creates options for each */}
          {interests.map((interest) => {

            // looks for interest in the usedInterestArray
            // if found skips the option
            for(let i=0;i<usedInterestArray.length;i++) {
              if (interest.name === usedInterestArray[i]) {
                return
              }
            }

            // returns option element for each interest with key equal to interest id
            return(
              <option
                key={interest._id}
                value={interest.name}
                onClick={() => {
                  setUsedInterestArray([...usedInterestArray, 1])
                }}
                >{interest.name}</option>
            )
          })}
      </select>

      {/* Button submits the search */}
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-[#9c2731] text-gray-800 text-lg rounded hover:bg-red-600 p-2 focus:outline-white focus:bg-red-700"
      >Search</button>
      
    </section>
  );
}
