import React, { useState } from 'react';
import Header from './componants/elements/Header';
import Footer from './componants/elements/Footer';
import Modal from './componants/elements/Modal';

import Home from './componants/pages/Home';
import Profile from './componants/pages/Profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [modal, setModal] = useState(true);

  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'Profile') {
      return <Profile />;
    }
    return <Home />;
  }

  const handleModal = () => setModal(false)
  
  const renderModal = () => {
    if (modal) {
      return <Modal handleModal={handleModal}/>
    }
    return;
  }

  const handlePageChange = (page) => setCurrentPage(page);


  return (
    <div>
      {renderModal()}
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
}
