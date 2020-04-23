import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import Header from './Components/Header';
import App from './Components/App';
import Contacts from './Components/Contacts';
import Footer from './Components/Footer';
import BreadCrumbs from './Components/BreadCrumbs';
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

const routes = [
  {
    path: "/",
    breadCrumbTitle: "Home"
  },
  {
    path: "/contacts",
    breadCrumbTitle: "Contacts"
  },
  {
    path: "/about",
    breadCrumbTitle: "About"
  }
]

function splitCurrentUrl() {
  const path = window.location.pathname.split('/');
  const urlParts = [];
  if (path.length > 1)
    path.forEach(element => {
      urlParts.push(`/${element}`)
    });
  console.log(urlParts);
  return urlParts;
}

function getBreadCrumbsTitles(urlParts) {
  const breadCrumbsTitles = [];
  urlParts.forEach(element => {
    const route = routes.filter(route => route.path === element)[0];
    breadCrumbsTitles.push(route.breadCrumbTitle);
  })
  console.log(breadCrumbsTitles)
  return breadCrumbsTitles
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={App}/>
      <div class="container">
        <p>{}</p>
        <BreadCrumbs />
        <Route path="/contacts" component={Contacts}/>
      </div>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
