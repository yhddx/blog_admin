// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import {Reducer} from './redux';


// let store = createStore(Reducer);

render(
    // <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    // </Provider>
    ,
    document.getElementById('root')
);



// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
