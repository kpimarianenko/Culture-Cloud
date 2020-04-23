import React, {Component} from 'react';
import Header from '../Components/Header';
import Home from '../Components/Home';
import Contacts from '../Components/Contacts';
import Footer from '../Components/Footer';
import { BrowserRouter, Route } from "react-router-dom";

const routes = {
  home: {
    path: "/",
    breadCrumbTitle: "Home",
    component: Home
  },
  contacts: {
    path: "/contacts",
    breadCrumbTitle: "Contacts",
    component: Contacts
  },
  about: {
    path: "/about",
    breadCrumbTitle: "About",
    component: null
  }
}

function splitCurrentUrl() {
  const path = window.location.pathname
  if (path.length <= 1) return ['/']
  const pathParts = window.location.pathname.split('/');
  const urlParts = [];
    pathParts.forEach(element => {
      urlParts.push(`/${element}`)
    });
  return urlParts;
}

function getBreadCrumbsTitles(urlParts) {
  const breadCrumbsTitles = [];
  urlParts.forEach(function(element){
    const route = Object.values(routes).filter(route => route.path === element)[0];
    breadCrumbsTitles.push(route.breadCrumbTitle);
  })
  console.log(breadCrumbsTitles)
  return breadCrumbsTitles
}

let breadCrumbTitles;

class App extends Component {
    render() {
        breadCrumbTitles = getBreadCrumbsTitles(splitCurrentUrl());
        return (
        <BrowserRouter>
          <Header />
          <Route exact path={routes['home'].path} component={routes['home'].component}/>
          <div className="container">
            <Route path={routes['contacts'].path} component={routes['contacts'].component}/>
          </div>
          <Footer />
        </BrowserRouter>
        )
    }
}

export default App