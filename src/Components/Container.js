import React, { Component } from 'react'
import Contacts from '../Components/Contacts';
import Collaborators from '../Components/Collaborators';
import { Route } from "react-router-dom";

export default class Container extends Component {
    render() {
        return (
            <div className="container">
                <Route exact path='/contacts' component={Contacts}/>
                <Route exact path='/collaborators' component={Collaborators}/>
            </div>
        )
    }
}
