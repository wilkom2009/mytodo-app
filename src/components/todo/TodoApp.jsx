import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'
import LoginComponent from './LoginComponent'
import TodosComponent from './TodosComponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import WelcomeComponent from './WelcomeComponent'
import LogoutComponent from './LogoutComponent'
import ErrorComponent from './ErrorComponent'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent />
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" exact component={LoginComponent} />
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                            <AuthenticatedRoute path="/todos" component={TodosComponent} />
                            <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>
                        <FooterComponent />
                    </>
                </Router>
                {/*<LoginComponent />
                <WelcomeComponent />*/}
            </div>
        )
    }
}

/*function ShowInvalidCredentialMessage(props) {
    if (props.hasLoginFailed) {
        return <div>Invalid credentials</div>
    } else
        return null
}

function ShowSuccessMessage(props) {
    if (props.showSuccessMessage) {
        return <div>Success</div>
    } else
        return null
}*/



export default TodoApp;