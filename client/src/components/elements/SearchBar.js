import React, { useState } from 'react';
import './../../styles/SearchBar.css';
import { NavLink } from 'react-router-dom';

export default function SearchBar() {

    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e) => {
        const {name, value } = e.target;

        setSearchValue(value);
    }

return (
    <section className='searchBarContainer text-3xl font-bold underline' >
     <input
     type="text"
     placeholder="Search For Users/Projects"
     name='searchValue'
     value={searchValue}
     onChange={handleChange}
     />
     <NavLink
        to={`./search?key=${searchValue}`}>Search</NavLink>
    </section>
 )
}