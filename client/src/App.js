import Navbar from './components/elements/Navbar';
import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from './components/elements/Footer';
import Header from './components/elements/Header';
import Modal from './components/elements/Modal';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import SignupForm from './components/forms/SignupForm';

export default function App() {

  const [modal, setModal] = useState(true);
  const [navVisible, showNavbar] = useState(false);

  const handleModal = () => setModal(false)

  const renderModal = () => {
    if (modal) {
      return <Modal modal={modal} handleModalClose={handleModalClose} />
    }
    return;
  }

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
          <Route path='/signup' element={<SignupForm />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}
