import React, { Component } from 'react'
import { Route } from "react-router-dom";

export default class Container extends Component {
    render() {
        return (
            <div className="container">
                <Route path={this.props.routes['contacts'].path} component={this.props.routes['contacts'].component}/>
            </div>
        )
    }
}
