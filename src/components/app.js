import React, { Component } from 'react';
import Login from './login';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import SubjectList from './subject-list';
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>

            <Route path="/subjects" component={SubjectList}/>
            <Route path="/" component={Login}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
