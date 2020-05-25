import React, { Component } from "react";
import { Link } from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js';

class WelcomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            welcomeMessage: '',
            errorMessage: '',
            errorOccured: false
        }

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfuMessage = this.handleSuccessfuMessage.bind(this);
        this.handleErrorMessage = this.handleErrorMessage.bind(this);
    }

    render() {
        return (
            <div className="WelcomeComponent">
                {this.state.errorOccured && <div className="alert alert-warning">{this.state.errorMessage}</div>}
                <h1>Welcome</h1>
                <div className="container">
                    Welcome Component {this.props.match.params.name}.
                You can go to Todos List <Link to="/todos">here.</Link>
                    <br />
                Clic on the following button to call the API
                <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}>Call API</button>
                </div>
                <div className="container">{this.state.welcomeMessage}</div>
            </div>
        )
    }

    retrieveWelcomeMessage() {
        HelloWorldService.executeHelloWorldPathvairableService(this.props.match.params.name)
            .then(response => this.handleSuccessfuMessage(response))
            .catch(error => this.handleErrorMessage(error))
    }

    handleSuccessfuMessage(response) {
        this.setState(
            {
                welcomeMessage: response.data.message,
                errorOccured: false
            }
        )
    }

    handleErrorMessage(error) {
        let errorMsg = '';
        if (error.message) {
            errorMsg += error.message
        }
        if (error.response && error.response.data) {
            errorMsg += error.response.data.message
        }

        this.setState(
            {
                errorMessage: errorMsg,
                errorOccured: true
            }
        )
    }
}

export default WelcomeComponent