import PromiseModule from '../../config/promise';

export const STARTDATE = 'STARTDATE';
export const POWERBALL = 'powerBall';
export const WORLDBETTING5 = 'worldBall5';
export const WORLDBETTING3 = 'worldBall3';
export const ZOMBIEDROP = 'zombieDrop';
export const ZOMBIEBREAK = 'zombieBreak';
export const RSP = 'rps';


export function getStartDate(){
    return (dispatch) => {
        PromiseModule.get(`/api/dateRange`)
        .then((response) => {
            dispatch({ type: STARTDATE, startDate : JSON.parse(response) })
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export function getResultData(apiKey, date = new Date().toISOString().slice(0,10)) {
    return (dispatch) => {
        PromiseModule.get(`/api/search/game/${apiKey}?date=${date}`)
        .then((response) => {
            dispatch({ type: apiKey, result : JSON.parse(response).game.rows })
        })
        .catch((err) => {
            console.log(err);
        })
    }
}




// export const INCREMENT = 'INCREMENT';
// export const DECREMENT = 'DECREMENT';
// export const SET_DIFF = 'SET_DIFF';
// export const POWERBALL = 'powerBall';
// export const WORLDBALL5 = 'worldBall5';
// export const WORLDBALL3 = 'worldBall3';
// export const ZOMBIEDROP = 'zombieDrop';
// export const ZOMBIEBREAK = 'zombieBreak';
// export const RSP = 'rps';
// export const STARTDATE = 'STARTDATE';

// export function increment() {
//     return {
//         type: INCREMENT
//     };
// }

// export function decrement() {
//     return {
//         type: DECREMENT
//     };
// }

// export function setDiff(value) {
//     return {
//         type: SET_DIFF,
//         diff: value
//     };
// }

// export function responseGameResult(gameType) {
//     return {
//         type: gameType
//     }
// }

// export function startDate(data) {
//     return {
//         type: STARTDATE,
//         data
//     }
// }

// export function getFirstTime() {
//     return (dispatch) => {
//         return PromiseModule.get(`/api/dateRange`)
//             .then(response => {
//                 console.log(response);
//                 dispatch(startDate(response.data));
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
// }