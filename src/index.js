import "babel-core/register";
import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';

import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';


import App from './components/app';
import reducers from './reducers';

import './sass/style.scss';
import {AUTHENTICATED} from './actions';



const createStoreWithMiddleware = applyMiddleware(ReduxThunk,ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if(token) {
  store.dispatch({ type: AUTHENTICATED });
}


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.querySelector('.container'));
