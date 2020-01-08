import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import counterApp from './store/reducers/reducers';
import App from './components/app';
import './reset.css';

const middleware = [ thunk ];

const store = createStore(
    counterApp,
    applyMiddleware(...middleware)
)

const appRoot = document.getElementById('root');

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        appRoot
    );
}

store.subscribe(render);
render();