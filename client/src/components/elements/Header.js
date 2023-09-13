import React from 'react';
import photo from '../../assets/images/header.png';


export default function Header() {
  return (
    <header>
      <img className="headerImg" src={photo} alt="grass with logo text" width="1024" height="500" />
      <p>This is the header</p>
    </header>
  )
}