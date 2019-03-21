import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//注册service-worker
import './assets/sw-register.js'
import './common/index'
ReactDOM.render(<App />, document.getElementById('root'));
