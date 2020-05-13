import React, { Component } from 'react'
import Contacts from '../Components/Contacts';
import Collaborators from '../Components/Collaborators';
import Collaborator from '../Components/Collaborator';
import Slider from './Slider';
import Login from '../Components/Login';
import Register from '../Components/Register';
import { Route } from "react-router-dom";

export default class Container extends Component {
    render() {
        return (
            <div className="container">
                <Route exact path='/' component={Slider}/>
                <Route path='/contacts' component={Contacts}/>
                <Route exact path='/collaborators' component={Collaborators}/>
                <Route path='/collaborators/:id' component={Collaborator}/>
                <Route path='/auth/login' component={Login}/>
                <Route path='/auth/register' component={Register}/>
            </div>
        )
    }
}
