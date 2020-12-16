import React from 'react'
import Contacts from './Contacts';
import Collaborators from './Collaborators';
import Collaborator from './Collaborator';
import Slider from './Slider';
import Login from './Login';
import Error from './Error'
import About from './About';
import Demo from './Demo';
import Me from './Me';
import Register from './Register';
import Excursions from './Excursions';
import { Route, Switch } from "react-router-dom";
import Gallery from './Gallery';

export default function Container(props) {
    return (
        <div className="container">
            <Switch>
                <Route exact path='/' component={Slider}/>
                <Route exact path='/contacts' component={Contacts}/>
                <Route exact path='/excursions' component={Excursions}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/demo' component={Demo}/>
                <Route exact path='/collaborators' component={Collaborators}/>
                <Route exact path='/collaborators/:id' component={Collaborator} />
                <Route exact path='/collaborators/gallery/:id' component={Gallery} />
                <Route exact path='/auth/login' component={Login}/>
                <Route exact path='/auth/register' component={Register}/>
                <Route exact path='/me' component={Me}/>
                <Route component={() => <Error code={404} message={'Not found'} />}/>
            </Switch>
        </div>
    )
}
