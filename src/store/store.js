import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducers from './reducers/reducers';

const middleware = [thunk];

export default createStore(
    Reducers,
    applyMiddleware(...middleware)
)