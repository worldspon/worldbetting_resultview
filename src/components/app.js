import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement, setDiff } from '../store/actions/actions';
import styles from './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diff: '1'
        }
    }

    onChangeDiff(e) {

        if(isNaN(e.target.value))
            return;

        this.setState({ diff: e.target.value });

        if(e.target.value=='') {
            this.setState({ diff: '0' });
        }

        this.props.onUpdateDiff(parseInt(e.target.value));
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.onIncrement()}>+</button>
                <button onClick={() => this.props.onDecrement()}>-</button>
                <input type="text" value={ this.state.diff } onChange={(e) => this.onChangeDiff(e)}></input>
                <p>{this.props.value}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        value: state.counter.value
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrement: () => dispatch(increment()),
        onDecrement: () => dispatch(decrement()),
        onUpdateDiff: (value) => dispatch(setDiff(value))
    };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;