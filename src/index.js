import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import './sass/style.scss';

import App from './components/app';
import reducers from './reducers';


import Login from './components/login';

const createStoreWithMiddleware = applyMiddleware()(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route path="/" component={Login}/>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
