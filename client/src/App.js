import Navbar from './components/elements/Navbar';
import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from './components/elements/Footer';
import Header from './components/elements/Header';
import Modal from './components/elements/Modal';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [modal, setModal] = useState('');
  const [navVisible, showNavbar] = useState(false);

  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'Profile') {
      return <Profile />;
    }
    return <Home />;
  }

  const handleModalClose = () => setModal('')

  const renderModal = () => {
    if (modal) {
      return <Modal modal={modal} handleModalClose={handleModalClose} />
    }
    return;
  }

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <BrowserRouter >
      <div className="App">
        {renderModal()}
        <Navbar visible={navVisible} show={showNavbar} />
        <Routes>
          <Route path="/connectmates" element={<Navigate to="/" />} />
          <Route path='/xpagename' element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <Footer />
            </div>
          } />
        </Routes>

      </div>
    </BrowserRouter>
  );
}
