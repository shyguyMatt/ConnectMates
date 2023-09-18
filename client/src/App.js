import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth';

// Import elements
import Footer from './components/elements/Footer';
import Header from './components/elements/Header';
import Modal from './components/elements/Modal';
import Navbar from './components/elements/Navbar';
import SearchBar from './components/elements/SearchBar';

// Import pages
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import Search from './components/pages/Search'
import LoginSignUp from './components/pages/Login';
import Group from './components/pages/Group'


export default function App() {
  // Define States
  const [navVisible, showNavbar] = useState(false);  
  // const [modal, setModal] = useState('');

  // const handleModalClose = () => setModal('')

  // const renderModal = () => {
  //   if (modal) {
  //     return <Modal modal={modal} handleModalClose={handleModalClose} />
  //   }
  //   return;
  // }

  // Set link to backend
  // *NEEDS TO BE FIXED BEFORE PUSH TO HEROKU* //
  const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  // Link auth token to localStorage
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

  return (
    <ApolloProvider client={client}>
      <BrowserRouter >
        <div className="App">
          {/* {renderModal()} */}
          <Navbar visible={navVisible} show={showNavbar} />
          <Header />
          <SearchBar  />

          <Routes>
            <Route path="/connectmates" element={<Navigate to="/home" />} />
            <Route path='/xpagename' element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                
              </div>
            } />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<LoginSignUp />} />
            <Route path='/profile' element={Auth.loggedIn() ? <Profile /> : <LoginSignUp />} />
            <Route path='/search' element={<Search />} />
            <Route path='/group' element={<Group />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}