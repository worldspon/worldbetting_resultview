import React from 'react';
import { connect } from 'react-redux';
import styles from './resultmodal.css';

class ResultModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.modalObject.title,
            apiKey: this.props.modalObject.apiKey,
            colSpan: this.props.modalObject.colSpan,
            tableHead: this.props.modalObject.tableHead
        }
    }

    createResultJSX() {
        if(
            this.state.apiKey === 'powerBall' ||
            this.state.apiKey === 'worldBall5' ||
            this.state.apiKey === 'worldBall3' ||
            this.state.apiKey === 'zombieDrop'
        ) {
            return this.props.result[this.state.apiKey].map((rows, index) => {
                return (
                <tr key={index} className={styles.tableRows}>
                    <td className={styles.rowCount}>{rows.gameCount}</td>
                    <td colSpan={`${this.state.colSpan-1}`}>
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
            return this.props.result[this.state.apiKey].map((rows, index) => {
                return (
                <tr key={index} className={styles.tableRows}>
                    <td className={styles.rowCount}>{rows.gameCount}</td>
                    <td colSpan={this.props.colSpan - 1}>
                    {
                        this.state.apiKey === 'rps' ?
                        this.props.langPack ?
                        this.props.langPack.rsp[rows.result.left-1]: '' : rows.result.left
                    }
                    </td>
                    <td>
                    {
                        this.state.apiKey === 'rps' ?
                        this.props.langPack ?
                        this.props.langPack.rsp[rows.result.right-1]: '' : rows.result.right
                    }
                    </td>
                </tr>);
            })
        }
    }

    changeCounterFormat() {
        if(this.props.counter !== undefined) {
            const remainTime = this.props.counter[this.state.apiKey];
            const min = Math.floor(remainTime / 60);
            const second = remainTime % 60;
            return `0${min}:${second >= 10 ? second : '0'+second}`;
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.innerWrap}>
                    <div className={styles.headLineWrap}>
                        <div className={styles.titleWrap}>
                            <h1 className={styles.gameTitle}>{this.state.title}</h1>
                            <span className={styles.gameTimer}>{this.changeCounterFormat()}</span>
                        </div>
                        <button
                            className={styles.closeButton}
                            onClick={() => this.props.destroyModal()}
                        >X</button>
                    </div>
                    {this.props.result[this.state.apiKey] && this.props.result[this.state.apiKey].length &&
                        <table className={styles.resultTable}>
                            <thead>
                                <tr>
                                    <th rowSpan='2' className={styles.tableCountHead}>{this.props.langPack && this.props.langPack.round}</th>
                                    <th colSpan={`${this.state.colSpan}`} className={styles.tableResultHead}>{this.props.langPack && this.props.langPack.result}</th>
                                </tr>
                                <tr>
                                    <th colSpan={`${this.state.colSpan-1}`} className={styles.tableResultSubHead}>{this.state.tableHead[0]}</th>
                                    <th className={styles.tableResultSubHead}>{this.state.tableHead[1]}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createResultJSX()}
                            </tbody>
                        </table>
                    }
                </div>
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

ResultModal = connect(mapStateToProps, null)(ResultModal);

export default ResultModal;