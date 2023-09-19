import React from 'react';
import photo from '../../assets/images/header.png';


export default function Header() {
  return (
    <header className="flex items-center justify-center space-x-4">
    <img src={require('./../../assets/images/torch.gif')} alt="Torch" className="mx-4" />
    <img className="headerImg mx-auto" src={photo} alt="grass with logo text" width="1024" height="350" />
    <img src={require('./../../assets/images/torch.gif')} alt="Torch" className="mx-4" />
  </header>
  )
}