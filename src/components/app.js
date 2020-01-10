import React from 'react';
import ResultBox from './resultbox/resultbox';
import ResultModal from './resultmodal/resultmodal';
import { connect } from 'react-redux';
import { getStartDate, setMaxRow, setTimmer } from '../store/actions/actions';
import styles from './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            maxRow: window.innerWidth >= 1600 ? Infinity : 10,
            modalObject: null
        }
    }

    bindResizeEvent() {
        if(window.innerWidth >= 1600) {
            if(this.state.maxRow !== Infinity) {
                this.setState({
                    maxRow: Infinity
                });
                this.props.setMaxRow(Infinity);
            }
        } else {
            if(this.state.maxRow !== 10) {
                this.setState({
                    maxRow: 10
                });
                this.props.setMaxRow(10);
            }
        }
    }

    showModal(modalObject) {
        this.setState({
            showModal: true,
            modalObject: modalObject
        });
    }

    destroyModal() {
        this.setState({
            showModal: false,
            modalObject: null
        });
    }

    componentDidMount() {

        // 각 게임 시작일 가져오는 통신
        this.props.getStartDate();

        // 화면 크기별 레이아웃을 위한 테이블 max row 설정
        this.props.setMaxRow(this.state.maxRow);

        // 윈도우 resize시 break point를 기점으로 테이블 max row 변경
        window.addEventListener('resize', () => {
            this.bindResizeEvent();
        });
    }

    render() {
        return (
            <div className={styles.wrap}>
                {this.state.showModal &&
                <ResultModal
                    modalObject={this.state.modalObject}
                    destroyModal={() => this.destroyModal()}
                />}
                <ResultBox
                    title='PowerBall'
                    // 결과 colum의 사이즈 설정을 위한 props
                    colSpan={3}
                    // startDate={this.props.gameInfo.startDate.pb}
                    apiKey='powerBall'
                    tableHead={['일반볼', '파워볼']}
                    showModal={(modalObject) => this.showModal(modalObject)}
                />
                <ResultBox
                    title='World Betting 5'
                    colSpan={3}
                    // startDate={this.props.gameInfo.startDate.wb5}
                    apiKey='worldBall5'
                    tableHead={['일반볼', '파워볼']}
                    showModal={(modalObject) => this.showModal(modalObject)}
                />
                <ResultBox
                    title='World Betting 3'
                    colSpan={3}
                    // startDate={this.props.gameInfo.startDate.wb3}
                    apiKey='worldBall3'
                    tableHead={['일반볼', '파워볼']}
                    showModal={(modalObject) => this.showModal(modalObject)}
                />
                <ResultBox
                    title='Zombie Drop'
                    colSpan={3}
                    // startDate={this.props.gameInfo.startDate.zd}
                    apiKey='zombieDrop'
                    tableHead={['일반볼', '좀비볼']}
                    showModal={(modalObject) => this.showModal(modalObject)}
                />
                <ResultBox
                    title='Zombie Break'
                    colSpan={2}
                    // startDate={this.props.gameInfo.startDate.zb}
                    apiKey='zombieBreak'
                    tableHead={['왼쪽', '오른쪽']}
                    showModal={(modalObject) => this.showModal(modalObject)}
                />
                <ResultBox
                    title='RSP'
                    colSpan={2}
                    // startDate={this.props.gameInfo.startDate.rps}
                    apiKey='rps'
                    tableHead={['왼쪽', '오른쪽']}
                    showModal={(modalObject) => this.showModal(modalObject)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        result : state.asyncData
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStartDate: () => dispatch(getStartDate()),
        setMaxRow: (index) => dispatch(setMaxRow(index)),
        setTimmer: (counterObject) => dispatch(setTimmer(counterObject))
    };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);


export default App;