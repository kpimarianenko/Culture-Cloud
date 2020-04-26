import React, {Component} from 'react';
import '../Styles/Header.css';
import { Link } from "react-router-dom";
import project from '../projectInfo';

const curUser = undefined;
// const curUser = {
//     avaUrl: "https://cs16planet.ru/steam-avatars/images/avatar1833.jpg",
//     email: "kpimarianenko@gmail.com",
//     passwordHash: "tipa hash",
//     name: "Roman Marianenko",
//     role: 1
// }

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
                      <Link className="nav-element" to="/excursions">Excursions</Link>
                      <Link className="nav-element" to="/contacts">Contacts</Link>
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
                              {ifUserIs(1, 
                              <div className="dropdown-menu-element">
                                  <Link to="/exhibits">Exhibits</Link>
                              </div>)}
                              <div className="dropdown-menu-element">Profile</div>
                              <div className="dropdown-menu-element">Settings</div>
                              <div className="dropdown-menu-element">Log out</div>
                          </div>
                      </span>
                  </span>) : 
                  (<span className="authbtns">
                      <button className="btn">Sign in</button>
                      <button className="btn btn-classic">Get started</button>
                  </span>)}
              </div>
          </div>
        );
    }
}

export default Header;
