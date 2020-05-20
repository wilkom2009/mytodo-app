import React, { Component } from 'react';
import './counter.css'

class Counter extends Component {
    constructor() {
        super()

        this.state = {
            counter: 0
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }
    render() {
        return (
            <div className="counter">
                <CounterButton by={100} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <span className="count">{this.state.counter}</span>
                <div><button className="reset" onClick={this.reset}>Reset</button></div>
            </div>
        );
    }

    reset() {
        //console.log(`Increment from parent - ${by}`);
        this.setState(
            { counter: 0 })
    }

    increment(by) {
        //console.log(`Increment from parent - ${by}`);
        this.setState(
            (previousState) => {
                let newvalue = previousState.counter + by;
                if (newvalue < 0) {
                    newvalue = 0;
                }
                return { counter: newvalue };
            })
    }

    decrement(by) {
        //console.log(`Increment from parent - ${by}`);
        this.setState(
            (previousState) => {
                let newvalue = previousState.counter - by;
                if (newvalue < 0) {
                    newvalue = 0;
                }
                return { counter: newvalue };
            })
    }
}

class CounterButton extends Component {

    constructor() {
        super()

        this.state = {
            counter: 0
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    render() {
        return (
            <div className="counter">
                <button onClick={this.increment}>+{this.props.by}</button>
                <button onClick={this.decrement}>-{this.props.by}</button>
            </div>
        );
    }

    increment() {
        //console.log('Increment')
        this.setState({
            counter: this.state.counter + this.props.by
        })
        this.props.incrementMethod(this.props.by);
    }

    decrement() {
        //console.log('Increment')
        this.setState({
            counter: this.state.counter - this.props.by
        })
        this.props.decrementMethod(this.props.by);
    }

}


CounterButton.defaultProps = {
    by: 1
}

export default Counter