import React from 'react';
import { connect } from 'react-redux';
import { getResultData } from '../../store/actions/actions';
import styles from './resultbox.css';

class ResultBox extends React.Component {
    constructor(props) {
        super(props);
    }

    createResultJSX() {
        if(
            this.props.apiKey === 'powerBall' ||
            this.props.apiKey === 'worldBall5' ||
            this.props.apiKey === 'worldBall3' ||
            this.props.apiKey === 'zombieDrop'
        ) {
            return this.props.result[this.props.apiKey].map((rows, index) => {
                return (
                index < this.props.maxIndex && <tr key={index} className={styles.tableRows}>
                    <td className={styles.rowCount}>{rows.gameCount}</td>
                    <td colSpan={this.props.colSpan - 1}>
                        <div className={styles.tableDataJustifyBetween}>
                            {rows.result.normal.map((value, index) => {
                                return <span className={styles.lotteryDataSpan} key={index}>{value}</span>
                            })}
                        </div>
                    </td>
                    <td>{rows.result.bonus}</td>
                </tr>);
            })
        } else {
            return this.props.result[this.props.apiKey].map((rows, index) => {
                return (
                index < this.props.maxIndex && <tr key={index} className={styles.tableRows}>
                    <td className={styles.rowCount}>{rows.gameCount}</td>
                    <td colSpan={this.props.colSpan - 1}>
                    {
                        this.props.apiKey === 'rps' ?
                        this.props.langPack ?
                        this.props.langPack.rsp[rows.result.left-1]: '' : rows.result.left
                    }
                    </td>
                    <td>
                    {
                        this.props.apiKey === 'rps' ?
                        this.props.langPack ?
                        this.props.langPack.rsp[rows.result.right-1]: '' : rows.result.right
                    }
                    </td>
                </tr>);
            })
        }
    }

    createModalObject() {
        return {
            title: this.props.title,
            apiKey: this.props.apiKey,
            colSpan: this.props.colSpan,
            tableHead: this.props.tableHead
        }
    }

    gridClassSelector() {
        switch (this.props.apiKey) {
            case 'powerBall':
                return styles.gridColOneRowOne;
            case 'worldBall5':
                return styles.gridColTwoRowOne;
            case 'worldBall3':
                return styles.gridColThreeRowOne;
            case 'zombieDrop':
                return styles.gridColFourRowOne;
            case 'zombieBreak':
                return styles.gridColFiveRowOne;
            case 'rps':
                return styles.gridColSixRowOne;
            default:
                return null;
        }
    }

    changeCounterFormat() {
        if(this.props.counter !== undefined) {
            const remainTime = this.props.counter[this.props.apiKey];
            if(remainTime === 0) {
                setTimeout(() => {
                    this.props.getResultData(this.props.apiKey);
                },15000)
            }
            const min = Math.floor(remainTime / 60);
            const second = remainTime % 60;
            return `0${min}:${second >= 10 ? second : '0'+second}`;
        } else {
            return null;
        }
    }

    componentDidMount() {
        this.props.getResultData(this.props.apiKey);
    }
    render() {
        return (
            <div className={styles.wrap + ' ' + this.gridClassSelector()}>
                <div className={styles.headLineWrap}>
                    <div className={styles.titleWrap}>
                        <h1 className={styles.gameTitle}>{this.props.title}</h1>
                        <span className={styles.gameTimer}>{this.changeCounterFormat()}</span>
                    </div>
                    <div className={styles.listSeachWrap}>
                        {this.props.maxIndex !== Infinity && <button className={styles.moreListButton} onClick={() => {this.props.showModal(this.createModalObject())}}>{this.props.langPack && this.props.langPack.button[0]}</button>}
                        <button className={styles.listSearchButton} onClick={() => {this.props.showModal(this.createModalObject())}}>{this.props.langPack && this.props.langPack.button[1]}</button>
                    </div>
                </div>
                {this.props.result[this.props.apiKey] && this.props.result[this.props.apiKey].length &&
                    <table className={styles.resultTable}>
                        <thead>
                            <tr>
                                <th rowSpan='2' className={styles.tableCountHead}>{this.props.langPack && this.props.langPack.round}</th>
                                <th colSpan={this.props.colSpan} className={styles.tableResultHead}>{this.props.langPack && this.props.langPack.result}</th>
                            </tr>
                            <tr>
                                <th colSpan={this.props.colSpan - 1} className={styles.tableResultSubHead}>{this.props.tableHead[0]}</th>
                                <th className={styles.tableResultSubHead}>{this.props.tableHead[1]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.createResultJSX()}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        result : state.asyncData,
        maxIndex : state.maxRowData.maxIndex,
        counter: state.counter.gameCounter,
        langPack: state.langStore.langPack
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getResultData: (apiKey) => dispatch(getResultData(apiKey))
    };
}

ResultBox = connect(mapStateToProps, mapDispatchToProps)(ResultBox);

export default ResultBox;