import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import themeReducer from './reducer'  // 函数
const store = createStore(themeReducer);
import App from './App';
//注册service-worker
// import './assets/sw-register.js'
import './common'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
