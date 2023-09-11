import React, { useState } from 'react';
import Header from './componants/elements/Header';
import Footer from './componants/elements/Footer';
import Home from './componants/pages/Home';
import Profile from './componants/pages/Profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'Profile') {
      return <Profile />;
    }
    return <Home />;
  }

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
}
