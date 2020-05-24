import React from 'react'
import Contacts from '../Components/Contacts';
import Collaborators from '../Components/Collaborators';
import Collaborator from '../Components/Collaborator';
import Slider from './Slider';
import Login from '../Components/Login';
import Register from '../Components/Register';
import { Route } from "react-router-dom";

export default function Container(props) {
    const { user } = props;
    return (
        <div className="container">
            <Route exact path='/' component={Slider}/>
            <Route path='/contacts' component={Contacts}/>
            <Route exact path='/collaborators' component={Collaborators}/>
            <Route exact path='/collaborators/:id' render={(props) => <Collaborator {...props} user={user} />} />
            <Route path='/auth/login' component={Login}/>
            <Route path='/auth/register' component={Register}/>
        </div>
    )
}
