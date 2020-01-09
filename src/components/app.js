import React from 'react';
import ResultBox from './resultbox/resultbox';
import { connect } from 'react-redux';
import { getStartDate } from '../store/actions/actions';
import styles from './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getStartDate();
    }

    render() {
        return (
            <div className={styles.wrap}>
                <ResultBox
                    title='PowerBall'
                    // 결과 colum의 사이즈 설정을 위한 props
                    colSpan={3}
                    startDate={this.props.startDate.pb}
                    apiKey='powerBall'
                    tableHead={['일반볼', '파워볼']}
                />
                <ResultBox
                    title='World Betting 5'
                    colSpan={3}
                    startDate={this.props.startDate.wb5}
                    apiKey='worldBall5'
                    tableHead={['일반볼', '파워볼']}
                />
                <ResultBox
                    title='World Betting 3'
                    colSpan={3}
                    startDate={this.props.startDate.wb3}
                    apiKey='worldBall3'
                    tableHead={['일반볼', '파워볼']}
                />
                <ResultBox
                    title='Zombie Drop'
                    colSpan={3}
                    startDate={this.props.startDate.zd}
                    apiKey='zombieDrop'
                    tableHead={['일반볼', '좀비볼']}
                />
                <ResultBox
                    title='Zombie Break'
                    colSpan={2}
                    startDate={this.props.startDate.zb}
                    apiKey='zombieBreak'
                    tableHead={['왼쪽', '오른쪽']}
                />
                <ResultBox
                    title='RSP'
                    colSpan={2}
                    startDate={this.props.startDate.rps}
                    apiKey='rps'
                    tableHead={['왼쪽', '오른쪽']}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        startDate: state.asyncData.startDate
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStartDate: () => dispatch(getStartDate())
    };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);


export default App;