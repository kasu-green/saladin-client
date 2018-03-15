import React, { Component } from 'react';
import Login from './login';
import { BrowserRouter, Route } from 'react-router-dom';
import SubjectList from './subject-list';
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>

          <Route path="/" component={SubjectList}/>
        </div>
      </BrowserRouter>
    );
  }
}
