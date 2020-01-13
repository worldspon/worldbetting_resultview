import React from 'react';
import ResultBox from './resultbox/resultbox';
import ResultModal from './resultmodal/resultmodal';
import calcTimmer from '../config/calctimmer';
import LanguagePack from '../config/languagepack';
import { connect } from 'react-redux';
import { getStartDate, setMaxRow, setTimmer, tick, changeLang } from '../store/actions/actions';
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

    setIntervalTick() {
        setInterval(() => {
            this.props.tick(this.props.counter);
        }, 1000)
    }

    setTimeoutNextTick(milli) {
        setTimeout(() => {
            this.props.tick(this.props.counter);
            this.setIntervalTick();
        }, 1000 + milli)
    }

    setGameCounter(timmerObject) {
        this.setTimeoutNextTick(timmerObject.nextTick);
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

    // 모달 생성
    showModal(modalObject) {
        this.setState({
            showModal: true,
            modalObject: modalObject
        });
    }

    // 모달 해제
    destroyModal() {
        this.setState({
            showModal: false,
            modalObject: null
        });
    }

    changeLang(lang) {
        this.props.changeLang(LanguagePack[lang]);
    }

    showAlert() {
        alert('준비중입니다!');
    }

    componentDidMount() {
        this.props.changeLang(LanguagePack.ko);
        console.log(this.props)
        const timmerObject = calcTimmer();
        this.setGameCounter(timmerObject);
        delete timmerObject.nextTick;
        this.props.setTimmer(timmerObject);

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
                <div className={styles.nationalFlag}>
                    <img
                        src={require('../assets/images/ko_flag.png')}
                        className={styles.flagImage}
                        onClick={()=>this.changeLang('ko')}
                    />
                    <img
                        src={require('../assets/images/uk_flag.png')}
                        className={styles.flagImage}
                        onClick={()=>this.changeLang('uk')}
                    />
                    <img
                        src={require('../assets/images/ch_flag.png')}
                        className={styles.flagImage}
                        onClick={() => this.showAlert()}
                    />
                    <img
                        src={require('../assets/images/jp_flag.png')}
                        className={styles.flagImage}
                        onClick={() => this.showAlert()}
                    />
                </div>
                {this.state.showModal &&
                <ResultModal
                    modalObject={this.state.modalObject}
                    destroyModal={() => this.destroyModal()}
                />}
                <ResultBox
                    title={this.props.langPack && this.props.langPack.title[0]}
                    // 결과 colum의 사이즈 설정을 위한 props
                    colSpan={3}
                    // startDate={this.props.gameInfo.startDate.pb}
                    apiKey='powerBall'
                    tableHead={this.props.langPack && this.props.langPack.resultMenu[0]}
                    showModal={(modalObject) => this.showModal(modalObject)}
                />
                <ResultBox
                    title={this.props.langPack && this.props.langPack.title[1]}
                    colSpan={3}
                    // startDate={this.props.gameInfo.startDate.wb5}
                    apiKey='worldBall5'
                    tableHead={this.props.langPack && this.props.langPack.resultMenu[1]}
                    showModal={(modalObject) => this.showModal(modalObject)}
                />
                <ResultBox
                    title={this.props.langPack && this.props.langPack.title[2]}
                    colSpan={3}
                    // startDate={this.props.gameInfo.startDate.wb3}
                    apiKey='worldBall3'
                    tableHead={this.props.langPack && this.props.langPack.resultMenu[1]}
                    showModal={(modalObject) => this.showModal(modalObject)}
                />
                <ResultBox
                    title={this.props.langPack && this.props.langPack.title[3]}
                    colSpan={3}
                    // startDate={this.props.gameInfo.startDate.zd}
                    apiKey='zombieDrop'
                    tableHead={this.props.langPack && this.props.langPack.resultMenu[1]}
                    showModal={(modalObject) => this.showModal(modalObject)}
                />
                <ResultBox
                    title={this.props.langPack && this.props.langPack.title[4]}
                    colSpan={2}
                    // startDate={this.props.gameInfo.startDate.zb}
                    apiKey='zombieBreak'
                    tableHead={this.props.langPack && this.props.langPack.resultMenu[2]}
                    showModal={(modalObject) => this.showModal(modalObject)}
                />
                <ResultBox
                    title={this.props.langPack && this.props.langPack.title[5]}
                    colSpan={2}
                    // startDate={this.props.gameInfo.startDate.rps}
                    apiKey='rps'
                    tableHead={this.props.langPack && this.props.langPack.resultMenu[2]}
                    showModal={(modalObject) => this.showModal(modalObject)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        result : state.asyncData,
        counter: state.counter.gameCounter,
        langPack: state.langStore.langPack
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStartDate: () => dispatch(getStartDate()),
        setMaxRow: (index) => dispatch(setMaxRow(index)),
        setTimmer: (counterObject) => dispatch(setTimmer(counterObject)),
        tick: (counterObject) => dispatch(tick(counterObject)),
        changeLang: (lang) => dispatch(changeLang(lang))
    };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);


export default App;