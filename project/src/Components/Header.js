import React from 'react';
import '../Styles/Header.css';

const name = "Culture Cloud";
// const curUser = undefined;
const curUser = {
    avaUrl: "https://cs16planet.ru/steam-avatars/images/avatar1833.jpg",
    email: "kpimarianenko@gmail.com",
    passwordHash: "tipa hash",
    name: "Roman Marianenko",
    role: 0
}

function ifUserIs(role, element) {
    if (curUser)
        if (curUser.role === role)
            return element;
}

function Header() {
  return (
    <div id="header">
        <div className="menu">
            <h1>{name}</h1>
            <div className="nav-menu">
                <a className="nav-element" href="/">Головна</a>
                <a className="nav-element" href="/collaborators">Вже з нами</a>
                <a className="nav-element" href="/contacts">Контакти</a>
                <a className="nav-element" href="/excursions">Екскурсії</a>
                {ifUserIs(1, <a className="nav-element" href="/excursions">Екскурсії</a>)}
                <a className="nav-element" href="/about">Про нас</a>
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

export default Header;
