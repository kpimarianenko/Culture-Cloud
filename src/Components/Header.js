import React, { useContext } from 'react';
import { Context } from '../context'
import '../Styles/Header.css';
import { Link } from "react-router-dom";
import project from '../projectInfo';
import { useState } from 'react';

function Header(props) {
    const [isMobileMenuDown, setIsMobileMenuDown] = useState(false)

    const hideOrDisplayMobileMenu = () => {
        setIsMobileMenuDown(!isMobileMenuDown)
    }

    return (
      <div id="header">
          <div className="menu">
              <MobileButton onClick={hideOrDisplayMobileMenu} />
              <Logo />
              <Navigation />
          </div>
          <AuthBlock />
          <MobileMenu onClick={hideOrDisplayMobileMenu} display={isMobileMenuDown} />
      </div>
    );
}

function MobileButton(props) {
    const {...attrs} = props;
    return ( 
    <div {...attrs} className="button">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
    </div>)
}

function MobileMenu(props) {
    const { display, ...attrs } = props;
    return display ? (
        <div {...attrs} className="mobile-menu">
            <Navigation />
            <DropdownMenu />
            <MobileAuthBlock />
        </div>
    ) : null;
}

function MobileAuthBlock(props) {
    const { user } = useContext(Context);
    return (<div className="profile_info">
        {user ? 
        <MobileProfile /> :
        <div className="nav-element">
            <AuthButtons />
        </div>}
    </div>)
}

function MobileProfile(props) {
    const { user, logout, isUserRole } = useContext(Context);
    return (
        <div className="mobile-profile">
        <Link className="profile-link" to={isUserRole(1) ? `/collaborators/${user._id}` : "/me"}>
        <span className="profile">
            <img className="ava" alt="User avatar" src={user.avaUrl || "/images/user-profile-ava.png"}></img>
            <span className="name-wrapper">
                    <p className="name">{user.name}</p>
            </span>
        </span>
        </Link>
        <div onClick={logout} className="nav-element" to="/">Log out</div>
    </div>)
}

function Navigation(props) {
    return (<div className="nav-menu">
        <Link className="nav-element" to="/">Home</Link>
        <Link className="nav-element" to="/collaborators">With us</Link>
        <Link className="nav-element" to="/excursions">Excursions</Link>
        <Link className="nav-element" to="/contacts">Contacts</Link>
        <Link className="nav-element" to="/demo">Demo</Link>
        <Link className="nav-element" to="/about">About</Link>
    </div>)
}

function AuthBlock(props) {
    const { user } = useContext(Context);
    return (<div className="profile_info">
    {user ? 
    <Profile /> :
    <AuthButtons />}
    </div>)
}

function AuthButtons(props) {
    return (<span className="authbtns">
    <Link to="/auth/login"><button className="btn btn-white">Sign in</button></Link>
    <Link to="/auth/register"><button className="btn btn-white btn-classic">Get started</button></Link>
</span>)
}

function Profile(props) {
    const { user } = useContext(Context);

    return (<span className="profile">
        <img className="ava" alt="User avatar" src={user.avaUrl || "/images/user-profile-ava.png"}></img>
        <span className="name-wrapper">
            <p className="name">{user.name}</p>
            <div className="dropdown-caret"></div>
            <DropdownMenu />
        </span>
    </span>)
}

function Logo(props) {
    return (<div className="header-logo">
    <h1>{project.name}</h1>
    <img src="/images/logo-white.png" alt="logo_bull" className="logo"/>
  </div>)
}

function DropdownMenu(props) {
    const { logout, isUserRole, user } = useContext(Context);
    return user ? (<div className="dropdown-menu">
        <Link to={isUserRole(1) ? `/collaborators/${user._id}` : "/me"} className="dropdown-menu-element">Profile</Link>
        <div className="dropdown-menu-element" onClick={logout}>Log out</div>
    </div>) : null
}

export default Header;