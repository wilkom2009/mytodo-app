import React, { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService.js";
import AuthenticationService from "./AuthenticationService.js";
import moment from 'moment'

class TodosListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                //{ id: 1, description: "Learn React", done: false, targetDate: new Date() },
                //{ id: 2, description: "Have my fitness sport", done: true, targetDate: new Date() },
                // { id: 3, description: "Read english book", done: false, targetDate: new Date() },
                // { id: 4, description: "Visit Togo", done: false, targetDate: new Date() }
            ],
            message: null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.refreshTodo = this.refreshTodo.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName();
        this.refreshTodo(username)
    }

    refreshTodo(username) {
        TodoDataService.retrieveAllTodos(username)
            .then(response => {
                this.setState({
                    todos: response.data
                })
            })
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName();
        console.log(id + "  " + username)
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({
                        message: `Delete of todo ${id} successfull!`
                    });
                    this.refreshTodo(username)
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    updateTodoClicked(id) {
        console.log(id + " update ")
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked(){
        console.log("Add cliecked")
        this.props.history.push(`/todos/-1`)
    }

    render() {
        return (
            <div className="TodosListComponent">
                <div>
                    <h1>Todos List</h1>
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    <div className="container">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Target Date</th>
                                    <th>Completed?</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.todos.map(
                                        todo =>
                                            <tr key={todo.id}>
                                                <td>{todo.description}</td>
                                                <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                                <td>{todo.done.toString()}</td>
                                                <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Edit </button>
                                                    <button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}> Delete</button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <hr/>
                        <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TodosListComponent