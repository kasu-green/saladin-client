import React, { Component } from 'react';
import Login from './login';
import { BrowserRouter, Route, Switch,browserHistory} from 'react-router-dom';
import SubjectList from './subject-list';
import SubjectForm from './subject-form';
import SurveyList from './survey-list';
export default class App extends Component {
  render() {
    return (
      <BrowserRouter history={browserHistory}>
        <div>
          <Switch>

            <Route path="/subjects/add" component={SubjectForm}/>
            <Route path="/subjects" component={SubjectList}/>
            <Route path="/survey" component={SurveyList}/>
            <Route path="/" component={Login}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
