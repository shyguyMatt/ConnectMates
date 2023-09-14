import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from './components/elements/Footer';
import Header from './components/elements/Header';
import Modal from './components/elements/Modal';
import Navbar from './components/elements/Navbar';
import SearchBar from './components/elements/SearchBar';
// import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
// import Search from './components/pages/Search';
import Auth from './utils/auth';

export default function App() {

  const [modal, setModal] = useState('');
  const [navVisible, showNavbar] = useState(false);

  const handleModalClose = () => setModal('')

  const renderModal = () => {
    if (modal) {
      return <Modal modal={modal} handleModalClose={handleModalClose} />
    }
    return;
  }

  const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  console.log(Auth.getProfile(token).data);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter >
        <div className="App">
          {renderModal()}
          <Navbar visible={navVisible} show={showNavbar} />
          <Header />
          <SearchBar />
          <Routes>
            <Route path="/connectmates" element={<Navigate to="/" />} />
            <Route path='/xpagename' element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <Footer />
              </div>
            } />
            {/* <Route path='/home' element={<Home />} /> */}
            <Route path='/profile' element={<Profile />} />
            {/* <Route path='/search' element={<Search />} /> */}
          </Routes>

        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}