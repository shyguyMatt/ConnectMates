import React, { useState } from "react";
import "./../../styles/SearchBar.css";
import { NavLink } from "react-router-dom";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="searchBarContainer flex items-center justify-between p-8 bg-gray-600 shadow-md rounded-full ">
    <input
    type="text"
    placeholder="Search For Users/Projects"
    name="searchValue"
    value={searchValue}
    onChange={handleChange}
    className="flex-grow px-4 py-2 mr-4 text-xl text-white placeholder-[#ff4f5e] bg-gray-700 border border-blue-500 rounded-lg focus:outline-none focus:border-blue-400"
/>

      <NavLink
        to={`./search?key=${searchValue}`}
        className="px-6 py-2 bg-[#9c2731] text-gray-800 text-lg rounded hover:bg-red-600 p-2 focus:outline-white focus:bg-red-700"
      >
        Search
      </NavLink>
    </section>
  );
}
