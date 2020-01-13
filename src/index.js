import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store/store';
import App from './components/app';
import './reset.css';
import './index.css';


const appRoot = document.getElementById('root');

// 화면 배경색
appRoot.style.backgroundColor = '#eff3fa';

const render = () => {
    ReactDOM.render(
        <Provider store={Store}>
            <App />
        </Provider>,
        appRoot
    );
}

Store.subscribe(render);
render();