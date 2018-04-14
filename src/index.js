import "babel-core/register";
import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';

import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';


import App from './components/app';
import reducers from './reducers';

import './sass/style.scss';
import {checkSession} from './actions';



const createStoreWithMiddleware = applyMiddleware(logger,ReduxThunk,ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if(token) {
  store.dispatch(checkSession());
}


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.querySelector('.container'));
