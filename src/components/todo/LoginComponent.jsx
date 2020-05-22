import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";

class LoginComponent extends Component {

    //create an initial state
    constructor(props) {
        super(props)

        this.state = {
            username: 'will',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    loginClicked() {
        if (this.state.username === "will" && this.state.password === "pwd") {
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
            /*this.setState(
                {
                    showSuccessMessage: true,
                    hasLoginFailed: false
                })*/
            //this.setState({ hasLoginFailed: false })
        } else {
            this.setState(
                {
                    showSuccessMessage: false,
                    hasLoginFailed: true
                })
            //this.setState({ hasLoginFailed: true })
        }
    }

    render() {
        return (
            <div><h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentialMessage hasLoginFailed={this.state.hasLoginFailed} />*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid credentials</div>}
                    {/*<ShowSuccessMessage showSuccessMessage={this.state.showSuccessMessage} />*/}
                Username : <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                Password : <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent