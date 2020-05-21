import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

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
                            <Route path="/welcome/:name" component={WelcomeComponent} />
                            <Route path="/todos" component={TodosComponent} />
                            <Route path="/logout" component={LogoutComponent} />
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
        console.log(this.state)
        this.setState({ [event.target.name]: event.target.value })
    }

    loginClicked() {
        if (this.state.username === "will" && this.state.password === "pwd") {
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

class TodosComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { id: 1, description: "Learn React", done: false, targetDate: new Date() },
                { id: 2, description: "Have my fitness sport", done: true, targetDate: new Date() },
                { id: 3, description: "Read english book", done: false, targetDate: new Date() },
                { id: 4, description: "Visit Togo", done: false, targetDate: new Date() }
            ]
        }
    }

    render() {
        return (
            <div className="TodosComponent">
                <div>
                    <h1>Todos List</h1>
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Description</th>
                                    <th>Target Date</th>
                                    <th>Completed?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.todos.map(
                                        todo =>
                                            <tr>
                                                <td>{todo.id}</td>
                                                <td>{todo.description}</td>
                                                <td>{todo.targetDate.toLocaleDateString()}</td>
                                                <td>{todo.done.toString()}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://www.linkedin.com/in/wilkom2009" className="navbar-brand">Wilkom</a></div>
                    <ul className="navbar-nav ">
                        <li><Link className="nav-link " to="/welcome/Wil">Home</Link></li>
                        <li><Link className="nav-link " to="/todos">Todos</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li><Link className="nav-link " to="/login">Login</Link></li>
                        <li><Link className="nav-link " to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All rights reserved @Wilkom</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <>
                <h1>You have been logged out!</h1>
                <div className="container">
                    Thank you for your visit!
                </div>
            </>
        )
    }
}

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

function ErrorComponent() {
    return <div className="ErrorComponent">
        Error, url not found!
    </div>
}

function ShowInvalidCredentialMessage(props) {
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
}



export default TodoApp;