import React, { useState } from "react";
import "./../../styles/SearchBar.css";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_INTERESTS } from "../../utils/queries";

export default function SearchBar() {
  const { loading: loadingInterests, data: interestData } = useQuery(QUERY_INTERESTS)
  const interests = interestData?.interests || [];

  const [searchValue, setSearchValue] = useState("");
  const [usedInterestArray, setUsedInterestArray] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchValue(value);
  };

  const handleSelectChange = (e) => {
    setSearchValue(searchValue + '[' + document.querySelector('#selectInterest').value + '] ');
    setUsedInterestArray([...usedInterestArray, document.querySelector('#selectInterest').value])
  }

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

  const clear = (e) => {
    setSearchValue('')
    setUsedInterestArray([])
  }

  return (
    <section className="searchBarContainer flex items-center justify-between p-8 bg-gray-600 shadow-md rounded-full ">
      <input
      id='textSelectInterest'
      type="text"
      placeholder="Search For Users/Projects"
      name="searchValue"
      value={searchValue}
      onChange={handleChange}
      disabled={true}
      className="flex-grow px-4 py-2 mr-4 text-xl text-white placeholder-[#ff4f5e] bg-gray-700 border border-blue-500 rounded-lg focus:outline-none focus:border-blue-400"
      />
      <button
        className="px-6 py-2 bg-[#9c2731] text-gray-800 text-lg rounded hover:bg-red-600 p-2 focus:outline-white focus:bg-red-700"
        onClick={clear}
        >X</button>   
      <select
        id='selectInterest'
        name='searchValue'
        onChange={handleSelectChange}
        className="flex-grow px-4 py-2 mr-4 text-xl text-white placeholder-[#ff4f5e] bg-gray-700 border border-blue-500 rounded-lg focus:outline-none focus:border-blue-400"
        >
          <option value=''>--Search For Users/Projects--</option>
          {interests.map((interest) => {
            for(let i=0;i<usedInterestArray.length;i++) {
              if (interest.name === usedInterestArray[i]) {
                return
              }
            }
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


      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-[#9c2731] text-gray-800 text-lg rounded hover:bg-red-600 p-2 focus:outline-white focus:bg-red-700"
      >
        Search
      </button>
    </section>
  );
}
