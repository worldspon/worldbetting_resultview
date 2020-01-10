import { combineReducers } from 'redux';
import {
    STARTDATE,
    POWERBALL,
    WORLDBETTING5,
    WORLDBETTING3,
    ZOMBIEDROP,
    ZOMBIEBREAK,
    RSP,
    SETMAXROW,
    TIMMER,
    TICK
} from '../actions/actions';

// 비동기 게임 결과 저장소
function asyncData(state = {}, action) {
    switch(action.type) {
        case STARTDATE:
            return Object.assign({}, state, {
                startDate: action.startDate
            });
        case POWERBALL:
            return Object.assign({}, state, {
                powerBall: action.result
            });
        case WORLDBETTING5:
            return Object.assign({}, state, {
                worldBall5: action.result
            });
        case WORLDBETTING3:
            return Object.assign({}, state, {
                worldBall3: action.result
            });
        case ZOMBIEDROP:
            return Object.assign({}, state, {
                zombieDrop: action.result
            });
        case ZOMBIEBREAK:
            return Object.assign({}, state, {
                zombieBreak: action.result
            });
        case RSP:
            return Object.assign({}, state, {
                rps: action.result
            });
        default:
            return state;
    }
}

// 화면 넓이에 따른 최대 ROW INDEX 저장소
function maxRowData(state = {}, action) {
    switch(action.type) {
        case SETMAXROW:
            return Object.assign({}, state, {
                maxIndex: action.maxIndex
            });
        default:
            return state;
    }
}


// 시간 저장소
function counter(state = {}, action) {
    switch (action.type) {
        case TIMMER:
            return Object.assign({}, state, {
                gameCounter: action.counterObject
            });
        default:
            return state;
    }
}

export default combineReducers({
    asyncData,
    maxRowData,
    counter
});