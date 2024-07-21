import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            time: new Date(),
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.time.toLocaleTimeString()}</h1>
            </div>
        );
    }
}

export default Timer;
