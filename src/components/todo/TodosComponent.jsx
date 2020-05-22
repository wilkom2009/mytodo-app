import React, { Component } from "react";

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
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Target Date</th>
                                    <th>Completed?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.todos.map(
                                        todo =>
                                            <tr key={todo.id}>
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

export default TodosComponent