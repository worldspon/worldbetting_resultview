import PromiseModule from '../../config/promise';

export const STARTDATE = 'STARTDATE';
export const POWERBALL = 'powerBall';
export const WORLDBETTING5 = 'worldBall5';
export const WORLDBETTING3 = 'worldBall3';
export const ZOMBIEDROP = 'zombieDrop';
export const ZOMBIEBREAK = 'zombieBreak';
export const RSP = 'rps';
export const SETMAXROW = 'setMaxRow';
export const TIMMER = 'TIMER';
export const TICK = 'TICK';
export const LANG = 'LANG';


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

export function setMaxRow(index) {
    return {type: SETMAXROW, maxIndex: index};
}

export function setTimmer(counterObject) {
    return {type: TIMMER, counterObject: counterObject};
}

export function tick(counterObject) {
    return {type: TICK, counterObject: counterObject};
}

export function changeLang(lang) {
    return {type: LANG, lang: lang};
}