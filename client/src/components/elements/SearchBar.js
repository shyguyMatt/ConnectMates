import React from 'react';
import './../../styles/SearchBar.css';

export default function SearchBar() {

return (
    <section className='searchBarContainer'>
     <input type="text" placeholder="Search For Projects"/>
     <button> Search </button>
    </section>
 )
}