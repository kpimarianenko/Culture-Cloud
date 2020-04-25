import React, {Component} from 'react';
import '../Styles/Header.css';
import { Link } from "react-router-dom";
import project from '../projectInfo';

const curUser = {
    avaUrl: "https://cs16planet.ru/steam-avatars/images/avatar1833.jpg",
    email: "kpimarianenko@gmail.com",
    passwordHash: "tipa hash",
    name: "Roman Marianenko",
    role: 1
}

function ifUserIs(role, element) {
    if (curUser)
        if (curUser.role === role)
            return element;
}

class Header extends Component {
    render() {
        return ( 
          <div id="header">
              <div className="menu">
                  <h1>{project.name}</h1>
                  <img src="/images/logo-white.png" alt="logo_bull" className="logo"/>
                  <div className="nav-menu">
                      <Link className="nav-element" to="/">Home</Link>
                      <Link className="nav-element" to="/collaborators">With us</Link>
                      <Link className="nav-element" to="/contacts">Contacts</Link>
                      {ifUserIs(1, <Link className="nav-element" to="/exhibits">Exhibits</Link>)}
                      {ifUserIs(1, <Link className="nav-element" to="/excursions">Excursions</Link>)}
                      <Link className="nav-element" to="/about">About</Link>
                  </div>
              </div>
              <div className="profile_info">
                  {(curUser) ? 
                  (<span className="profile">
                      <img className="ava" alt="User avatar" src={curUser.avaUrl}></img>
                      <span className="name-wrapper">
                          <p className="name">{curUser.name}</p>
                          <div className="dropdown-caret"></div>
                          <div className="dropdown-menu">
                              <div className="dropdown-menu-element">Профіль</div>
                              <div className="dropdown-menu-element">Налаштування</div>
                              <div className="dropdown-menu-element">Вихід</div>
                          </div>
                      </span>
                  </span>) : 
                  (<span className="authbtns">
                      <button className="btn">Sign in</button>
                      <button className="btn btn-getstarted">Get started</button>
                  </span>)}
              </div>
          </div>
        );
    }
}

export default Header;
