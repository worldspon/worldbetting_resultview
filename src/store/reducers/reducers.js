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

const commonCounter = {
    powerBall: 0,
    worldBall5: 0,
    worldBall3: 0,
    zombieDrop: 0,
    zombieBreak: 0,
    rps: 0
}


// 시간 저장소
function counter(state = commonCounter, action) {
    switch (action.type) {
        case TIMMER:
            return Object.assign({}, state, {
                gameCounter: action.counterObject
            });
        case TICK:
            return Object.assign({}, state, {
                gameCounter: {
                    powerBall: --action.counterObject.powerBall < 0 ? 299 : action.counterObject.powerBall,
                    worldBall5: --action.counterObject.worldBall5 < 0 ? 299 : action.counterObject.worldBall5,
                    worldBall3: --action.counterObject.worldBall3 < 0 ? 179 : action.counterObject.worldBall3,
                    zombieDrop: --action.counterObject.zombieDrop < 0 ? 179 : action.counterObject.zombieDrop,
                    zombieBreak: --action.counterObject.zombieBreak < 0 ? 179 : action.counterObject.zombieBreak,
                    rps: --action.counterObject.rps < 0 ? 119 : action.counterObject.rps
                }
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