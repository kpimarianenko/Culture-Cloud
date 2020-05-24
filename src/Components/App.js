import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { BrowserRouter } from "react-router-dom";
import Container from './Container';
import { Context } from '../context'
import HTTP from '../http'

function App(props) {
    const [user, setUser] = useState();

    const logout = function() {
      localStorage.setItem('token', null)
      setUser(null);
    }

    const renderUser = function(user) {
      setUser(user);
    }

    const isUserRole = (role) => {
      if (!user) return false;
      return user.role === role;
    }

    useEffect(() => {
      HTTP.getProfile()
      .then(authData => {
        if (authData.status === 200)
          setUser(authData.user);
      })
    }, [])


    return (
    <Context.Provider value={{
      renderUser, logout, isUserRole, user
    }}>
      <BrowserRouter>
        <div>
          <Header user={user} />
          <Container user={user} />
        </div>
        <Footer />
      </BrowserRouter>
    </Context.Provider>)
}

export default App