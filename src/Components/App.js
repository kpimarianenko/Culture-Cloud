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
      localStorage.setItem('token', '')
      setUser(null);
    }

    const renderUser = function(user) {
      setUser(user);
    }

    const isUserRole = (role) => {
      if (!user) return false;
      return user.role === role;
    }

    const isAuth = () => {
      if (localStorage.getItem('token')) return true;
      return false
    }

    useEffect(() => {
      HTTP.getProfile()
      .then(authData => {
        if (authData.status === 200)
          setUser(authData.data.user);
      })
    }, [])


    return (
    <Context.Provider value={{
      renderUser, logout, isUserRole, isAuth, user
    }}>
      <BrowserRouter>
        <div className="container-wrapper">
          <Header user={user} />
          <Container user={user} />
        </div>
        <Footer />
      </BrowserRouter>
    </Context.Provider>)
}

export default App