import Navbar from './components/elements/Navbar';
import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from './components/elements/Footer';
import Header from './components/elements/Header';
import Modal from './components/elements/Modal';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';

export default function App() {
  const [modal, setModal] = useState(true);
  const [navVisible, showNavbar] = useState(false);

  const handleModal = () => setModal(false)

  const renderModal = () => {
    if (modal) {
      return <Modal handleModal={handleModal} />
    }
    return;
  }

  return (
    <BrowserRouter >
      <div className="App">
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
