import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { BrowserRouter } from "react-router-dom";
import Container from './Container';
import { Context } from '../context'

function App() {
    const [user, setUser] = useState();

    const logout = function() {
      setUser(null);
    }

    return (
    <Context.Provider value={{
      setUser, logout
    }}>
      <BrowserRouter>
        <Header curUser={user} />
        <Container/>
        <Footer />
      </BrowserRouter>
    </Context.Provider>)
}

export default App