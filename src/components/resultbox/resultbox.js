import React from 'react';
import createResultJSX from '../commonfunctions/createresultjsx';
import { connect } from 'react-redux';
import { getResultData } from '../../store/actions/actions';
import styles from './resultbox.css';

class ResultBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: {}
        }
    }


    // createResultJSX() {
    //     console.log(this.state.result);
    //     // this.state.result.map((rows, index) => {
    //     //     return (
    //     //     <tr key={index}>
    //     //         <td>{rows.gameCount}</td>
    //     //         <td colSpan={this.props.colSpan - 1}>
    //     //             <div className={styles.tableDataJustifyBetween}>
    //     //                 {rows.result.normal.map((value) => {
    //     //                     return <span className={styles.lotteryDataSpan}>{value}</span>
    //     //                 })}
    //     //             </div>
    //     //         </td>
    //     //         <td>{rows.result.bonus}</td>
    //     //     </tr>);
    //     // })
    // }

    componentDidMount() {
        // this.callApiDummy();
        // this.props.getDate();
        this.props.getResultData(this.props.apiKey);
    }
    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.headLineWrap}>
                    <div className={styles.titleWrap}>
                        <h1 className={styles.gameTitle}>{this.props.title}</h1>
                        <span className={styles.gameTimer}>05:00</span>
                    </div>
                    <div className={styles.listSeachWrap}>
                        <button className={styles.listSearchButton}>기록조회</button>
                    </div>
                </div>
                <table className={styles.resultTable}>
                    <thead>
                        <tr>
                            <th rowSpan='2' className={styles.tableCountHead}>회차</th>
                            <th colSpan={this.props.colSpan} className={styles.tableResultHead}>결과</th>
                        </tr>
                        <tr>
                            <th colSpan={this.props.colSpan - 1} className={styles.tableResultSubHead}>{this.props.tableHead[0]}</th>
                            <th className={styles.tableResultSubHead}>{this.props.tableHead[1]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.result && this.state.result.length ?
                            createResultJSX() : <tr></tr>
                        }
                    </tbody>
                </table>
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
        getResultData: (apiKey) => dispatch(getResultData(apiKey))
    };
}

ResultBox = connect(mapStateToProps, mapDispatchToProps)(ResultBox);

export default ResultBox;