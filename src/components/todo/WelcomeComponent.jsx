import React, { Component } from "react";
import {Link } from 'react-router-dom'

class WelcomeComponent extends Component {
    render() {
        return (
            <div className="WelcomeComponent">
                <h1>Welcome</h1>
                <div className="container">
                    Welcome Component {this.props.match.params.name}.
                You can go to Todos List <Link to="/todos">here.</Link>
                </div>
            </div>
        )
    }
}

export default WelcomeComponent