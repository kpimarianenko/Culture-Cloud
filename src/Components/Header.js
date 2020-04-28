import React, { useContext } from 'react';
import { Context } from '../context'
import '../Styles/Header.css';
import { Link } from "react-router-dom";
import project from '../projectInfo';

// function ifUserIs(curUser, role, element) {
//     if (curUser)
//         if (curUser.role === role)
//             return element;
// }

function Header(props) {
    const { logout } = useContext(Context);

    const { user } = props;

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
              {(user) ? 
              (<span className="profile">
                  <img className="ava" alt="User avatar" src={user.avaUrl || "/images/user-profile-ava.png"}></img>
                  <span className="name-wrapper">
                      <p className="name">{user.name}</p>
                      <div className="dropdown-caret"></div>
                      <div className="dropdown-menu">
                          {/* ifUserIs(, 1, 
                          <div className="dropdown-menu-element">
                              <Link to="/exhibits">Exhibits</Link>
                          </div>) */}
                          <div className="dropdown-menu-element">Profile</div>
                          <div className="dropdown-menu-element">Settings</div>
                          <div className="dropdown-menu-element" onClick={logout}>Log out</div>
                      </div>
                  </span>
              </span>) : 
              (<span className="authbtns">
                  <Link to="/auth/login"><button className="btn">Sign in</button></Link>
                  <Link to="/auth/register"><button className="btn btn-classic">Get started</button></Link>
              </span>)}
          </div>
      </div>
    );
}

export default Header;
