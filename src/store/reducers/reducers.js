// import { INCREMENT, DECREMENT, SET_DIFF, STARTDATE } from '../actions/actions';
import { combineReducers } from 'redux';
import {
    STARTDATE,
    POWERBALL,
    WORLDBETTING5,
    WORLDBETTING3,
    ZOMBIEDROP,
    ZOMBIEBREAK,
    RSP
} from '../actions/actions';

const gameState = {
    startDate : {},
    powerBallResult: {},
    worldBetting5Result: {}
};

function asyncData(state = gameState, action) {
    switch(action.type) {
        case STARTDATE:
            return Object.assign({}, state, {
                startDate: action.startDate
            });
        case POWERBALL:
            return Object.assign({}, state, {
                powerBallResult: action.result
            });
        case WORLDBETTING5:
            return Object.assign({}, state, {
                worldBetting5Result: action.result
            });
        // case WORLDBETTING3:
        //     return null;
        // case ZOMBIEDROP:
        //     return null;
        // case ZOMBIEBREAK:
        //     return null;
        // case RSP:
        //     return null;
        default:
            return state;
    }
}

export default combineReducers({
    asyncData
});

// const asyncData = (state = gameState, action) => {
//     switch(action.type) {
//         case "STAERDATE":
//             return Object.assign({}, state, {
//                 startDate: action.startDate
//             });
//         default:
//             return state;
//     }
// }


// const counterInitialState = {
//     value: 0,
//     diff: 1
// };


// const counter = (state = counterInitialState, action) => {
//     switch(action.type) {
//         case INCREMENT:
//             return Object.assign({}, state, {
//                 value: state.value + state.diff
//             });
//         case DECREMENT:
//             return Object.assign({}, state, {
//                 value: state.value - state.diff
//             });
//         case SET_DIFF:
//             return Object.assign({}, state, {
//                 diff: action.diff
//             });
//         default:
//             return state;
//     }
// };


// const extra = (state = { value: 'this_is_extra_reducer' }, action) => {
//     switch(action.type) {
//         default:
//             return state;
//     }
// }
